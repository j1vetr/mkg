import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { adminApi, formatTRY, type Stats } from "./lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AdminDashboard() {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const s = await adminApi.stats();
        if (alive) setData(s);
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : "load_failed");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return <SkeletonBlock label="Yükleniyor…" />;
  }
  if (error || !data) {
    return <SkeletonBlock label="Veriler getirilemedi." />;
  }

  const t = data.totals;
  const totalSourceCount = data.sources.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <PageTitle eyebrow="Genel Bakış" title="Anlık Performans" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mt-8">
          <Stat label="Toplam Sipariş" value={t.totalOrders.toString()} testid="stat-total-orders" />
          <Stat label="Son 30 Gün Sipariş" value={t.orders30d.toString()} testid="stat-30d-orders" />
          <Stat label="Son 30 Gün Gelir" value={`${formatTRY(t.revenue30d)} TL`} testid="stat-30d-revenue" />
          <Stat label="Son 30 Gün Ziyaret" value={t.visits30d.toString()} testid="stat-30d-visits" />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <ChartCard title="Sipariş Akışı (30 Gün)" subtitle="Günlük sipariş adedi">
          {data.ordersByDay.length === 0 ? (
            <EmptyMessage>Henüz sipariş yok.</EmptyMessage>
          ) : (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <AreaChart data={data.ordersByDay} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FAFAFA" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#FAFAFA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="day" stroke="#666" fontSize={10} tickFormatter={(v) => v.slice(5)} />
                  <YAxis stroke="#666" fontSize={10} allowDecimals={false} width={28} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: "#aaa" }}
                    formatter={(value) => [value, "Sipariş"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#FAFAFA"
                    strokeWidth={1.5}
                    fill="url(#ordersGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>

        <ChartCard title="Ziyaretçi Akışı (30 Gün)" subtitle="Günlük ziyaret adedi">
          {data.visitsByDay.length === 0 ? (
            <EmptyMessage>Henüz ziyaret yok.</EmptyMessage>
          ) : (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <AreaChart data={data.visitsByDay} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#888" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#888" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="day" stroke="#666" fontSize={10} tickFormatter={(v) => v.slice(5)} />
                  <YAxis stroke="#666" fontSize={10} allowDecimals={false} width={28} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: "#aaa" }}
                    formatter={(value) => [value, "Ziyaret"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#888"
                    strokeWidth={1.5}
                    fill="url(#visitsGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <ChartCard title="UTM Kaynakları" subtitle="Son 30 gün ziyaretçi dağılımı">
          {data.sources.length === 0 ? (
            <EmptyMessage>Henüz kaynak verisi yok.</EmptyMessage>
          ) : (
            <div className="flex flex-col gap-3 mt-2" data-testid="sources-list">
              {data.sources.map((s) => {
                const pct = totalSourceCount > 0 ? Math.round((s.count / totalSourceCount) * 100) : 0;
                return (
                  <div key={s.source} className="flex items-center gap-4">
                    <span style={{ fontSize: "0.78rem", color: "#aaa", minWidth: "100px" }}>
                      {s.source}
                    </span>
                    <div className="flex-1" style={{ background: "rgba(255,255,255,0.06)", height: "6px" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.9, ease: EASE }}
                        style={{ background: "#FAFAFA", height: "100%" }}
                      />
                    </div>
                    <span
                      className="font-display"
                      style={{ fontSize: "0.72rem", color: "#FAFAFA", minWidth: "40px", textAlign: "right" }}
                    >
                      {s.count}
                    </span>
                    <span style={{ fontSize: "0.66rem", color: "#666", minWidth: "32px" }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </ChartCard>

        <ChartCard title="Yönlendirenler" subtitle="Geldiği site (referrer)">
          {data.referrers.length === 0 ? (
            <EmptyMessage>Henüz yönlendirme yok.</EmptyMessage>
          ) : (
            <div className="flex flex-col gap-2 mt-2" data-testid="referrers-list">
              {data.referrers.slice(0, 8).map((r) => (
                <div
                  key={r.referrer}
                  className="flex items-center justify-between gap-3 py-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span
                    style={{ fontSize: "0.78rem", color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}
                  >
                    {r.referrer}
                  </span>
                  <span className="font-display" style={{ fontSize: "0.78rem", color: "#FAFAFA" }}>
                    {r.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ChartCard>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
      >
        <ChartCard title="Pakete Göre Sipariş" subtitle="30 günlük dağılım">
          {data.ordersByPackage.length === 0 ? (
            <EmptyMessage>Sipariş verisi yok.</EmptyMessage>
          ) : (
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={data.ordersByPackage} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="packageId" stroke="#666" fontSize={10} />
                  <YAxis stroke="#666" fontSize={10} allowDecimals={false} width={28} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: "#aaa" }}
                    formatter={(value, name) => [value, name === "count" ? "Adet" : "TL"]}
                  />
                  <Bar dataKey="count" fill="#FAFAFA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
      >
        <PageTitle eyebrow="Son Hareketler" title="Son Siparişler" />
        {data.recentOrders.length === 0 ? (
          <EmptyMessage>Henüz sipariş yok.</EmptyMessage>
        ) : (
          <div className="overflow-x-auto mt-6" data-testid="recent-orders">
            <table className="w-full text-left" style={{ borderCollapse: "collapse", minWidth: "640px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <Th>Kod</Th>
                  <Th>Paket</Th>
                  <Th>Müşteri</Th>
                  <Th>İletişim</Th>
                  <Th align="right">Tutar</Th>
                  <Th>Tarih</Th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <Td>
                      <span className="font-display" style={{ color: "#FAFAFA", fontSize: "0.78rem" }}>
                        {o.orderCode}
                      </span>
                    </Td>
                    <Td>
                      <span style={{ fontSize: "0.78rem", color: "#aaa" }}>{o.packageId}</span>
                    </Td>
                    <Td>
                      <span style={{ fontSize: "0.78rem", color: "#ddd" }}>
                        {o.name} {o.surname}
                      </span>
                    </Td>
                    <Td>
                      <span style={{ fontSize: "0.72rem", color: "#888" }}>{o.email}</span>
                      <br />
                      <span style={{ fontSize: "0.7rem", color: "#666" }}>{o.phone}</span>
                    </Td>
                    <Td align="right">
                      <span className="font-display" style={{ fontSize: "0.82rem", color: "#FAFAFA" }}>
                        {formatTRY(o.priceTry)} TL
                      </span>
                    </Td>
                    <Td>
                      <span style={{ fontSize: "0.72rem", color: "#888" }}>
                        {new Date(o.createdAt).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" })}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>
    </div>
  );
}

const tooltipStyle = {
  background: "rgba(15,15,15,0.95)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 0,
  fontSize: "0.78rem",
};

function PageTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div
        className="font-display"
        style={{ fontSize: "0.66rem", letterSpacing: "0.24em", color: "#666", marginBottom: "10px" }}
      >
        {eyebrow.toUpperCase()}
      </div>
      <h1
        className="font-display"
        style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#FAFAFA" }}
      >
        {title}
      </h1>
    </div>
  );
}

function Stat({ label, value, testid }: { label: string; value: string; testid: string }) {
  return (
    <div style={{ background: "#0c0c0c", padding: "22px 20px" }} data-testid={testid}>
      <div
        className="font-display"
        style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "#666", marginBottom: "12px" }}
      >
        {label.toUpperCase()}
      </div>
      <div
        className="font-display"
        style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", color: "#FAFAFA", fontWeight: 700, letterSpacing: "-0.03em" }}
      >
        {value}
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#0c0c0c", padding: "26px 24px" }}>
      <div className="mb-4">
        <div
          className="font-display"
          style={{ fontSize: "0.92rem", color: "#FAFAFA", fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          {title}
        </div>
        <div style={{ fontSize: "0.72rem", color: "#666", marginTop: "4px" }}>{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function EmptyMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "180px", color: "#555", fontSize: "0.85rem" }}
    >
      {children}
    </div>
  );
}

function SkeletonBlock({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "60vh", color: "#555", fontSize: "0.85rem", letterSpacing: "0.06em" }}
    >
      {label}
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className="font-display"
      style={{
        textAlign: align ?? "left",
        fontSize: "0.62rem",
        letterSpacing: "0.18em",
        color: "#666",
        padding: "12px 14px",
        fontWeight: 500,
      }}
    >
      {typeof children === "string" ? children.toUpperCase() : children}
    </th>
  );
}

function Td({ children, align }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <td style={{ padding: "12px 14px", textAlign: align ?? "left", verticalAlign: "top" }}>{children}</td>
  );
}
