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
