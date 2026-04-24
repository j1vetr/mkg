import sharp from "sharp";
import { randomUUID } from "crypto";
import { objectStorageClient } from "./objectStorage";

function parseObjectPath(path: string): { bucketName: string; objectName: string } {
  const p = path.startsWith("/") ? path : `/${path}`;
  const parts = p.split("/");
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
  const privateDir = getPrivateDir();

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

  const fullMain = `${privateDir}/${mainKey}`;
  const fullThumb = `${privateDir}/${thumbKey}`;

  const m = parseObjectPath(fullMain);
  const t = parseObjectPath(fullThumb);

  const bucket = objectStorageClient.bucket(m.bucketName);

  await bucket.file(m.objectName).save(main.data, {
    contentType: "image/webp",
    resumable: false,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
  await bucket.file(t.objectName).save(thumb, {
    contentType: "image/webp",
    resumable: false,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });

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
  const privateDir = getPrivateDir();
  const full = `${privateDir}/${key}`;
  const { bucketName, objectName } = parseObjectPath(full);
  try {
    await objectStorageClient.bucket(bucketName).file(objectName).delete({ ignoreNotFound: true });
  } catch {
    // swallow
  }
}

export async function streamObject(objectPath: string) {
  if (!objectPath.startsWith("/objects/")) {
    throw new Error("invalid_path");
  }
  const key = objectPath.slice("/objects/".length);
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
