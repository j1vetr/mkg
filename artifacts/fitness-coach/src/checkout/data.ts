export type PackageId = "3-ay" | "6-ay" | "12-ay" | "gorusme";

export interface PackageInfo {
  id: PackageId;
  num: string;
  duration: string;
  price: number;
  monthly: string | null;
  isConsult: boolean;
  blurb: string;
}

export const PACKAGES: PackageInfo[] = [
  {
    id: "3-ay",
    num: "01",
    duration: "3 Ay",
    price: 6400,
    monthly: "2.133",
    isConsult: false,
    blurb: "İlk somut dönüşüm için yeterli süre.",
  },
  {
    id: "6-ay",
    num: "02",
    duration: "6 Ay",
    price: 9600,
    monthly: "1.600",
    isConsult: false,
    blurb: "Kalıcı sonuç için altın denge.",
  },
  {
    id: "12-ay",
    num: "03",
    duration: "12 Ay",
    price: 16000,
    monthly: "1.333",
    isConsult: false,
    blurb: "Hayat tarzı dönüşümü için tam süre.",
  },
  {
    id: "gorusme",
    num: "04",
    duration: "30dk Görüşme",
    price: 7000,
    monthly: null,
    isConsult: true,
    blurb: "Başlamadan önce sürecin sana uyup uymadığını anlamak için birebir video görüşme.",
  },
];

export function getPackage(id: PackageId | null): PackageInfo | null {
  if (!id) return null;
  return PACKAGES.find((p) => p.id === id) ?? null;
}
