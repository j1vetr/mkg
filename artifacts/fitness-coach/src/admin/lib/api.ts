async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
    ...init,
    headers: {
      ...(init?.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j?.error) message = j.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export interface AdminMe {
  username: string;
}

export interface StatsTotals {
  totalOrders: number;
  revenue30d: number;
  orders30d: number;
  totalVisits: number;
  visits30d: number;
}

export interface DailyOrder {
  day: string;
  count: number;
  revenue: number;
}
export interface DailyVisit {
  day: string;
  count: number;
}
export interface SourceRow {
  source: string;
  count: number;
}
export interface ReferrerRow {
  referrer: string;
  count: number;
}
export interface PackageRow {
  packageId: string;
  count: number;
  revenue: number;
}
export interface RecentOrder {
  id: number;
  orderCode: string;
  packageId: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  priceTry: number;
  status: string;
  source: string | null;
  hasCondition: boolean;
  conditionNote: string | null;
  createdAt: string;
}

export interface Stats {
  totals: StatsTotals;
  ordersByDay: DailyOrder[];
  visitsByDay: DailyVisit[];
  sources: SourceRow[];
  referrers: ReferrerRow[];
  ordersByPackage: PackageRow[];
  recentOrders: RecentOrder[];
}

export interface AdminPackage {
  id: number;
  slug: string;
  duration: string;
  blurb: string;
  priceTry: number;
  highlight: boolean;
  position: number;
  active: boolean;
  updatedAt: string;
}

export interface MediaItem {
  id: number;
  objectPath: string;
  thumbObjectPath: string | null;
  caption: string | null;
  weeks: string | null;
  position: number;
  width: number | null;
  height: number | null;
  bytes?: number | null;
  createdAt?: string;
}

export const adminApi = {
  me: () => request<AdminMe>("/api/admin/me"),
  login: (username: string, password: string) =>
    request<AdminMe>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<{ ok: true }>("/api/admin/logout", { method: "POST" }),
  stats: () => request<Stats>("/api/admin/stats"),
  packages: () => request<{ packages: AdminPackage[] }>("/api/admin/packages"),
  updatePackage: (slug: string, payload: Partial<AdminPackage>) =>
    request<{ package: AdminPackage }>(`/api/admin/packages/${slug}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  media: () => request<{ items: MediaItem[] }>("/api/admin/before-after"),
  uploadMedia: (file: File, fields: { caption?: string; weeks?: string; position?: number }) => {
    const fd = new FormData();
    fd.append("file", file);
    if (fields.caption) fd.append("caption", fields.caption);
    if (fields.weeks) fd.append("weeks", fields.weeks);
    if (typeof fields.position === "number") fd.append("position", String(fields.position));
    return request<{ item: MediaItem }>("/api/admin/before-after", { method: "POST", body: fd });
  },
  patchMedia: (id: number, payload: Partial<Pick<MediaItem, "caption" | "weeks" | "position">>) =>
    request<{ item: MediaItem }>(`/api/admin/before-after/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteMedia: (id: number) =>
    request<{ ok: true }>(`/api/admin/before-after/${id}`, { method: "DELETE" }),
};

export function objectUrl(objectPath: string | null | undefined): string | null {
  if (!objectPath) return null;
  if (!objectPath.startsWith("/objects/")) return objectPath;
  return `/api/storage${objectPath}`;
}

export function formatTRY(n: number): string {
  return n.toLocaleString("tr-TR");
}
