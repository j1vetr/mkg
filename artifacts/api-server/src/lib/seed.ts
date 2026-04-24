import { db, packagesTable } from "@workspace/db";
import { logger } from "./logger";

const DEFAULT_PACKAGES = [
  {
    slug: "3-ay",
    duration: "3 Ay",
    blurb: "Sıfırdan başlayanlar için temel disiplini kuran giriş paketi.",
    priceTry: 6400,
    highlight: false,
    position: 1,
    active: true,
  },
  {
    slug: "6-ay",
    duration: "6 Ay",
    blurb: "Görsel dönüşümün ortaya çıktığı, en sık tercih edilen periyot.",
    priceTry: 9600,
    highlight: true,
    position: 2,
    active: true,
  },
  {
    slug: "12-ay",
    duration: "12 Ay",
    blurb: "Sürdürülebilir, kalıcı kimlik değişimi için tam yıllık sistem.",
    priceTry: 16000,
    highlight: false,
    position: 3,
    active: true,
  },
  {
    slug: "gorusme",
    duration: "30dk Görüşme",
    blurb: "Programa girmeden önce yol haritası ve uygunluk değerlendirmesi.",
    priceTry: 7000,
    highlight: false,
    position: 4,
    active: true,
  },
];

let seedPromise: Promise<void> | null = null;

export function seedPackages(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const existing = await db.select().from(packagesTable);
      if (existing.length > 0) return;
      await db.insert(packagesTable).values(DEFAULT_PACKAGES);
      logger.info({ count: DEFAULT_PACKAGES.length }, "default packages seeded");
    })().catch((err) => {
      logger.error({ err }, "seed packages failed");
    });
  }
  return seedPromise;
}
