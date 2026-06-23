# CLAUDE.md

## Overview

Al Wosabe Landing — a bilingual (Arabic/English) landing page for Al Wosabe, built with Next.js 16, React 19, Tailwind 4, and Framer Motion. Arabic is the primary language and the site is RTL.

## Commands

```bash
npm run dev      # Next.js dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # eslint
```

## Architecture

- **Framework:** Next.js 16 App Router with `[locale]` dynamic route for i18n.
- **Styling:** Tailwind CSS 4 via PostCSS.
- **Animations:** Framer Motion (parallax, reveal, counters, marquee, page transitions).
- **Icons:** Lucide React.
- **Deployment:** Docker (`standalone` output mode).

### Directory layout (`src/`)

```
app/                  — pages, layout, globals.css, robots, sitemap
  [locale]/           — locale-specific layout + page
components/
  layout/             — Header, Footer, Preloader, PageTransition
  sections/           — LandingPage, QuoteForm
  ui/                 — reusable UI atoms (Button, Container, Reveal, etc.)
data/site.ts          — site-wide constants / content
lib/                  — utils, locale helpers
```

## Conventions

- Arabic is primary; all user-facing strings must support both `ar` and `en`.
- RTL layout — use logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end`) over physical ones (`left`/`right`).
- Components go in `components/ui/` (atoms) or `components/sections/` (page sections).
