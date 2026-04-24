import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PackageId, PackageInfo } from "@/checkout/data";
import { PACKAGES, getPackage } from "@/checkout/data";

export interface PublicPackage {
  slug: string;
  duration: string;
  blurb: string;
  priceTry: number;
  highlight: boolean;
  position: number;
  active: boolean;
}

export interface PublicMedia {
  id: number;
  objectPath: string;
  thumbObjectPath: string | null;
  caption: string | null;
  weeks: string | null;
  position: number;
  width: number | null;
  height: number | null;
}

export function objectUrl(p: string | null | undefined): string | null {
  if (!p) return null;
  if (!p.startsWith("/objects/")) return p;
  return `/api/storage${p}`;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export function usePackages() {
  return useQuery({
    queryKey: ["public-packages"],
    queryFn: () => fetchJSON<{ packages: PublicPackage[] }>("/api/packages"),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}

export function useBeforeAfter() {
  return useQuery({
    queryKey: ["public-before-after"],
    queryFn: () => fetchJSON<{ items: PublicMedia[] }>("/api/before-after"),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}

export function useResolvedPackages(): PackageInfo[] {
  const { data } = usePackages();
  return useMemo(() => {
    const map = new Map<string, PublicPackage>();
    (data?.packages ?? []).forEach((p) => map.set(p.slug, p));
    return PACKAGES.map((stat) => {
      const live = map.get(stat.id);
      if (!live) return stat;
      const monthly = stat.isConsult
        ? null
        : computeMonthly(live.priceTry, stat.id);
      return {
        ...stat,
        duration: live.duration || stat.duration,
        price: live.priceTry,
        monthly,
        blurb: live.blurb || stat.blurb,
      };
    });
  }, [data]);
}

function computeMonthly(price: number, id: PackageId): string | null {
  const months = id === "3-ay" ? 3 : id === "6-ay" ? 6 : id === "12-ay" ? 12 : 0;
  if (!months) return null;
  return Math.round(price / months).toLocaleString("tr-TR");
}

export function useResolvedPackage(id: PackageId | null): PackageInfo | null {
  const list = useResolvedPackages();
  return useMemo(() => {
    if (!id) return null;
    return list.find((p) => p.id === id) ?? getPackage(id);
  }, [list, id]);
}
