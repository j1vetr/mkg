import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { promises as fs, createReadStream } from "node:fs";
import path from "node:path";
import { objectStorageClient } from "./objectStorage";

const LOCAL_DIR = process.env.LOCAL_STORAGE_DIR;
const USE_LOCAL = !!LOCAL_DIR;

function parseObjectPath(p: string): { bucketName: string; objectName: string } {
  const norm = p.startsWith("/") ? p : `/${p}`;
  const parts = norm.split("/");
  if (parts.length < 3) {
    throw new Error("Invalid object path");
  }
  return { bucketName: parts[1], objectName: parts.slice(2).join("/") };
}

function getPrivateDir(): string {
  const dir = process.env.PRIVATE_OBJECT_DIR;
  if (!dir) throw new Error("PRIVATE_OBJECT_DIR not set");
  return dir.replace(/\/$/, "");
}

function localFullPath(key: string): string {
  if (!LOCAL_DIR) throw new Error("LOCAL_STORAGE_DIR not set");
  const normalized = path.posix.normalize(key);
  if (
    normalized.startsWith("..") ||
    normalized.includes("/../") ||
    path.isAbsolute(normalized)
  ) {
    throw new Error("invalid_key");
  }
  return path.join(LOCAL_DIR, normalized);
}

function contentTypeFor(p: string): string {
  const ext = path.extname(p).toLowerCase();
  switch (ext) {
    case ".webp":
      return "image/webp";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".avif":
      return "image/avif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

async function saveLocal(key: string, buf: Buffer): Promise<void> {
  const full = localFullPath(key);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, buf);
}

async function saveGcs(
  key: string,
  buf: Buffer,
  contentType: string,
): Promise<void> {
  const privateDir = getPrivateDir();
  const fullPath = `${privateDir}/${key}`;
  const { bucketName, objectName } = parseObjectPath(fullPath);
  await objectStorageClient.bucket(bucketName).file(objectName).save(buf, {
    contentType,
    resumable: false,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
}

export interface OptimizedUploadResult {
  objectPath: string;
  thumbObjectPath: string;
  width: number;
  height: number;
  bytes: number;
}

export async function optimizeAndUpload(
  buffer: Buffer,
  prefix = "before-after",
): Promise<OptimizedUploadResult> {
  const id = randomUUID();

  const main = await sharp(buffer)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toBuffer({ resolveWithObject: true });

  const thumb = await sharp(buffer)
    .rotate()
    .resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 70, effort: 4 })
    .toBuffer();

  const mainKey = `${prefix}/${id}.webp`;
  const thumbKey = `${prefix}/${id}_thumb.webp`;

  if (USE_LOCAL) {
    await saveLocal(mainKey, main.data);
    await saveLocal(thumbKey, thumb);
  } else {
    await saveGcs(mainKey, main.data, "image/webp");
    await saveGcs(thumbKey, thumb, "image/webp");
  }

  return {
    objectPath: `/objects/${mainKey}`,
    thumbObjectPath: `/objects/${thumbKey}`,
    width: main.info.width,
    height: main.info.height,
    bytes: main.info.size,
  };
}

export async function deleteObject(objectPath: string): Promise<void> {
  if (!objectPath.startsWith("/objects/")) return;
  const key = objectPath.slice("/objects/".length);

  if (USE_LOCAL) {
    try {
      await fs.unlink(localFullPath(key));
    } catch {
      // ignore missing
    }
    return;
  }

  const privateDir = getPrivateDir();
  const full = `${privateDir}/${key}`;
  const { bucketName, objectName } = parseObjectPath(full);
  try {
    await objectStorageClient
      .bucket(bucketName)
      .file(objectName)
      .delete({ ignoreNotFound: true });
  } catch {
    // swallow
  }
}

export interface StreamResult {
  stream: NodeJS.ReadableStream;
  contentType: string;
  size?: number;
}

export async function streamObject(
  objectPath: string,
): Promise<StreamResult | null> {
  if (!objectPath.startsWith("/objects/")) {
    throw new Error("invalid_path");
  }
  const key = objectPath.slice("/objects/".length);

  if (USE_LOCAL) {
    const full = localFullPath(key);
    try {
      const stat = await fs.stat(full);
      if (!stat.isFile()) return null;
      return {
        stream: createReadStream(full),
        contentType: contentTypeFor(full),
        size: stat.size,
      };
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw err;
    }
  }

  const privateDir = getPrivateDir();
  const full = `${privateDir}/${key}`;
  const { bucketName, objectName } = parseObjectPath(full);
  const file = objectStorageClient.bucket(bucketName).file(objectName);
  const [exists] = await file.exists();
  if (!exists) return null;
  const [meta] = await file.getMetadata();
  return {
    stream: file.createReadStream(),
    contentType: (meta.contentType as string) || "application/octet-stream",
    size: meta.size ? Number(meta.size) : undefined,
  };
}
