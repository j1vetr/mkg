import { useEffect, useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminApi, objectUrl, type MediaItem } from "./lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [caption, setCaption] = useState("");
  const [weeks, setWeeks] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const reload = async () => {
    try {
      const r = await adminApi.media();
      setItems(r.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "load_failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const uploadOne = async (file: File) => {
    setError(null);
    setUploadProgress(`İşleniyor: ${file.name}`);
    try {
      const r = await adminApi.uploadMedia(file, {
        caption: caption.trim() || undefined,
        weeks: weeks.trim() || undefined,
        position: items.length + 1,
      });
      setItems((prev) => [...prev, r.item]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "upload_failed");
      throw err;
    }
  };

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (list.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      let i = 0;
      for (const f of list) {
        i += 1;
        setUploadProgress(`Yükleniyor (${i}/${list.length}): ${f.name}`);
        await uploadOne(f);
      }
      setCaption("");
      setWeeks("");
    } catch {
      // already set error above
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) void handleFiles(e.dataTransfer.files);
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) void handleFiles(e.target.files);
  };

  const onDelete = async (id: number) => {
    if (!window.confirm("Bu görseli silmek istediğinden emin misin?")) return;
    try {
      await adminApi.deleteMedia(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "delete_failed");
    }
  };

  const onCaptionPatch = async (id: number, value: string) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, caption: value } : x)));
    try {
      await adminApi.patchMedia(id, { caption: value });
    } catch {
      // silent
    }
  };

  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <div
          className="font-display"
          style={{ fontSize: "0.66rem", letterSpacing: "0.24em", color: "#666", marginBottom: "10px" }}
        >
          DÖNÜŞÜM GALERİSİ
        </div>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#FAFAFA" }}
        >
          Before / After Yönetimi
        </h1>
        <p style={{ color: "#777", fontSize: "0.88rem", marginTop: "12px", maxWidth: "640px", lineHeight: 1.55 }}>
          Görseller sunucuda otomatik olarak küçültülür ve WebP formatına dönüştürülür. Bir önce / sonra montajını
          tek dosya halinde yüklemek en iyi sonucu verir.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        style={{
          background: "#0c0c0c",
          border: dragOver ? "1px dashed #FAFAFA" : "1px dashed rgba(255,255,255,0.18)",
          padding: "32px 28px",
          transition: "border-color 0.25s",
        }}
        data-testid="media-dropzone"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <Field label="Açıklama (opsiyonel)">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="ac-input"
              placeholder="Örn. Mehmet, 90 gün"
              data-testid="media-caption"
            />
          </Field>
          <Field label="Süre Etiketi (opsiyonel)">
            <input
              type="text"
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              className="ac-input"
              placeholder="Örn. 12 Hafta"
              data-testid="media-weeks"
            />
          </Field>
          <div className="flex items-end">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="font-display w-full"
              style={{
                background: "#FAFAFA",
                color: "#0a0a0a",
                padding: "14px 22px",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                fontWeight: 600,
                cursor: uploading ? "not-allowed" : "pointer",
                opacity: uploading ? 0.6 : 1,
              }}
              data-testid="media-upload-button"
            >
              {uploading ? "YÜKLENİYOR…" : "DOSYA SEÇ VEYA SÜRÜKLE"}
            </button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onPick}
          style={{ display: "none" }}
          data-testid="media-file-input"
        />
        <div style={{ fontSize: "0.7rem", color: "#666" }}>
          {uploadProgress ?? "Birden fazla dosya seçilebilir. JPG, PNG, WebP desteklenir. Maks. 25 MB."}
        </div>
      </motion.div>

      {error && (
        <div
          data-testid="media-error"
          style={{ padding: "12px 16px", border: "1px solid rgba(255,116,116,0.4)", color: "#ff7676", fontSize: "0.78rem" }}
        >
          {error}
        </div>
      )}

      <div>
        <div
          className="font-display"
          style={{ fontSize: "0.66rem", letterSpacing: "0.24em", color: "#666", marginBottom: "16px" }}
        >
          KAYITLI GÖRSELLER ({items.length})
        </div>

        {loading ? (
          <div style={{ color: "#555", padding: "20px 0" }}>Yükleniyor…</div>
        ) : items.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#555",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            Henüz görsel yok. Yukarıdan ilkini yükle.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="media-grid">
            <AnimatePresence>
              {items.map((m) => {
                const url = objectUrl(m.thumbObjectPath ?? m.objectPath);
                return (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ background: "#0c0c0c" }}
                    data-testid={`media-item-${m.id}`}
                  >
                    <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                      {url ? (
                        <img
                          src={url}
                          alt={m.caption ?? "Dönüşüm"}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        <div
                          className="flex items-center justify-center"
                          style={{ width: "100%", height: "100%", color: "#444" }}
                        >
                          —
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <input
                        type="text"
                        value={m.caption ?? ""}
                        onChange={(e) => onCaptionPatch(m.id, e.target.value)}
                        placeholder="Açıklama"
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: 0,
                          color: "#FAFAFA",
                          fontSize: "0.78rem",
                          padding: "4px 0",
                          outline: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}
                        data-testid={`media-caption-${m.id}`}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <span style={{ fontSize: "0.66rem", color: "#666" }}>{m.weeks ?? ""}</span>
                        <button
                          onClick={() => void onDelete(m.id)}
                          className="font-display"
                          style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.18em",
                            color: "#888",
                            background: "transparent",
                            border: 0,
                            cursor: "pointer",
                          }}
                          data-testid={`media-delete-${m.id}`}
                        >
                          SİL
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <style>{`
        .ac-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 10px 0;
          color: #FAFAFA;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.3s;
          font-family: inherit;
        }
        .ac-input:focus { border-bottom-color: #FAFAFA; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span
        className="block font-display"
        style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "#777", marginBottom: "6px" }}
      >
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}
