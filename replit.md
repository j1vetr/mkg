# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### artifacts/fitness-coach (web)
Turkish fitness coaching sales funnel. Coach: **Murat Kaan Günaydın**. Pure black/white aesthetic, mobile-first.

- **Stack**: React + Vite + wouter + framer-motion + Tailwind. EASE `[0.16, 1, 0.3, 1]` everywhere.
- **Single-page funnel**: Hero (centered, no header nav) → Marquee → WhyMe → Packages → BeforeAfter → FAQ → Footer.
- **Hero order**: section label → 3-line H1 ("Hazır Program. Hazır Sonuç. Bu İllüzyon Bitti.") → YouTube `u0JdGzqdmIg` video → description → CTA. Play button responsive `clamp(56px, 9vw, 104px)`.
- **Packages**: 3 Ay 6.400 / 6 Ay 9.600 / 12 Ay 16.000 / 30dk 7.000 TL. Mobile-friendly auto height.
- **Checkout**: 3 steps (Önce Sen Kimsin? → Sana Nasıl Ulaşırım? → Son Bir Bakış.) using sessionStorage. Submits to `/api/checkout/session` then shows success screen.
- **Payment**: PayTR (NOT iyzico).
- **WhatsApp**: Only on success screen via `WA_LINK_BASE = "https://wa.me/905XXXXXXXXX"` — replace placeholder before deploy.
- **Title Case** convention applied to all section headings + CTA buttons.
- **Legal pages** (PayTR-required): `/hakkimizda`, `/iletisim`, `/mesafeli-satis-sozlesmesi`, `/iptal-iade`, `/kvkk`, `/gizlilik`, `/cerez-politikasi` — all rendered by `src/pages/Legal.tsx` from `src/pages/legalContent.ts`.
- **Pre-publish placeholders to replace**: WhatsApp number (`WA_LINK_BASE`), `SUPPORT_PHONE`, `CONTACT_EMAIL` in `legalContent.ts`.

#### Control Center (admin) at `/admin`
- **Login**: `/admin/giris`. Hardcoded user `toov-mhk` / `Toov1453@@mhk` (bcrypt-hashed in `admin_users` table; bootstrap auto-creates/syncs on server start).
- **Auth**: HMAC-signed cookie `kc_admin_sid` (30-day) backed by `admin_sessions` table; uses `SESSION_SECRET`.
- **Pages**: Dashboard (orders/visits/UTM/referrer/package charts via Recharts) · Packages (live editing of duration/price/blurb/highlight/active) · Media (drag-drop Before/After uploader).
- **Image pipeline**: Server-side sharp → 1600px WebP q82 + 480px thumb q70 → Replit Object Storage (`PRIVATE_OBJECT_DIR/before-after/<uuid>.webp`) → DB row in `before_after_media`. Public reads via `/api/storage/objects/before-after/...`.
- **Visit tracking**: `Home.tsx` calls `trackVisit("/")` once per session → `POST /api/track/visit` capturing UTM params + `document.referrer`.
- **Public site dynamic data**: `usePackages()` and `useBeforeAfter()` hooks (TanStack Query) overlay live API data on top of static fallbacks in `Packages.tsx` and `BeforeAfter.tsx`. Checkout posts captured `source` to `/api/checkout/session`.
- **DB tables** (in `lib/db/src/schema/`): `admin_users`, `admin_sessions`, `orders`, `visits`, `packages`, `before_after_media`. Migrate with `pnpm --filter @workspace/db run push`.
- **Admin route conventions**: `/admin` (dashboard) · `/admin/paketler` · `/admin/medya` · `/admin/giris` (login).
