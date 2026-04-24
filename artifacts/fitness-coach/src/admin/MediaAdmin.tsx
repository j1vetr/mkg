import { useEffect, useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminApi, objectUrl, type MediaItem } from "./lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MAX_CONCURRENT = 3;

export default function MediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number; failed: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const positionBaseRef = useRef(0);

  const reload = async () => {
    try {
      const r = await adminApi.media();
      setItems(r.items);
      const maxPos = r.items.reduce((m, x) => Math.max(m, x.position ?? 0), 0);
      positionBaseRef.current = maxPos;
    } catch (err) {
      setError(err instanceof Error ? err.message : "load_failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) return;

    setUploading(true);
    setError(null);
    let done = 0;
    let failed = 0;
    setProgress({ done: 0, total: list.length, failed: 0 });

    const startPos = positionBaseRef.current;
    let cursor = 0;

    const next = async (): Promise<void> => {
      const idx = cursor++;
      if (idx >= list.length) return;
      const file = list[idx];
      try {
        const r = await adminApi.uploadMedia(file, {
          position: startPos + idx + 1,
        });
        setItems((prev) => [...prev, r.item]);
      } catch {
        failed += 1;
      } finally {
        done += 1;
        setProgress({ done, total: list.length, failed });
      }
      return next();
    };

    const workers = Array.from({ length: Math.min(MAX_CONCURRENT, list.length) }, () => next());
    await Promise.all(workers);

    positionBaseRef.current = startPos + list.length;

    if (failed > 0) {
      setError(`${failed} dosya yüklenemedi.`);
    }

    setUploading(false);
    setTimeout(() => setProgress(null), 1500);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  const progressText = (() => {
    if (!progress) return "Birden fazla dosya seçilebilir veya sürüklenebilir. JPG, PNG, WebP · maks. 25 MB / dosya.";
    if (progress.done < progress.total) {
      return `Yükleniyor… ${progress.done} / ${progress.total}${progress.failed ? ` · ${progress.failed} hatalı` : ""}`;
    }
    return progress.failed
      ? `Tamamlandı: ${progress.done - progress.failed} başarılı, ${progress.failed} hatalı.`
      : `Tamamlandı: ${progress.done} dosya yüklendi.`;
  })();

  const progressPct = progress ? Math.round((progress.done / progress.total) * 100) : 0;

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
          Görseller sunucuda otomatik olarak küçültülür ve WebP'ye dönüştürülür. Birden fazla dosyayı bir
          seferde seçebilir veya sürükleyip bırakabilirsin.
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
        onClick={() => !uploading && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        style={{
          background: dragOver ? "#101010" : "#0c0c0c",
          border: dragOver ? "1px dashed #FAFAFA" : "1px dashed rgba(255,255,255,0.18)",
          padding: "44px 28px",
          transition: "border-color 0.25s, background 0.25s",
          cursor: uploading ? "not-allowed" : "pointer",
          textAlign: "center",
        }}
        data-testid="media-dropzone"
      >
        <div
          className="font-display"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.32em",
            color: "#666",
            marginBottom: "16px",
          }}
        >
          TOPLU YÜKLEME
        </div>
        <div
          className="font-display"
          style={{
            fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#FAFAFA",
            marginBottom: "8px",
          }}
        >
          {uploading ? "Yükleniyor…" : "Dosyaları Seç veya Buraya Sürükle"}
        </div>
        <div style={{ fontSize: "0.78rem", color: "#888", marginBottom: "18px" }}>
          {progressText}
        </div>

        {progress && (
          <div
            style={{
              maxWidth: "420px",
              margin: "0 auto",
              height: "3px",
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPct}%`,
                height: "100%",
                background: "#FAFAFA",
                transition: "width 0.3s ease-out",
              }}
            />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onPick}
          style={{ display: "none" }}
          data-testid="media-file-input"
        />
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
                    style={{ background: "#0c0c0c", position: "relative" }}
                    data-testid={`media-item-${m.id}`}
                  >
                    <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                      {url ? (
                        <img
                          src={url}
                          alt="Dönüşüm"
                          loading="lazy"
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
                      <span
                        className="font-display"
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "rgba(0,0,0,0.6)",
                          backdropFilter: "blur(6px)",
                          color: "#FAFAFA",
                          fontSize: "0.6rem",
                          letterSpacing: "0.18em",
                          padding: "4px 8px",
                        }}
                      >
                        #{m.position}
                      </span>
                    </div>
                    <div className="flex items-center justify-between" style={{ padding: "10px 14px" }}>
                      <span style={{ fontSize: "0.66rem", color: "#666" }}>
                        {m.width && m.height ? `${m.width}×${m.height}` : ""}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          void onDelete(m.id);
                        }}
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
