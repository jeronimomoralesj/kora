# KORA — Customer Web App

Responsive, mobile-first web app for **KORA · Foods & Provisions** — an urban,
tech-driven convenience-nutrition mini-market in Bogotá. Built with Next.js (App
Router) + Tailwind CSS. All data is dummy/placeholder.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

Node 18.18+ recommended.

## Brand system (design tokens)

| Token | Hex | Use |
| --- | --- | --- |
| Alabaster (Primary 60%) | `#F7F5F0` | Backgrounds, surfaces |
| Deep Forest Moss (Secondary 30%) | `#2C3E2B` | Headings, structure |
| Sprout Green (Accent 10%) | `#76A035` | CTAs, active states, PULSE & KORA Origen |
| Charcoal (Neutral) | `#1A1A1A` | Body copy |

Typeface: **Roboto** (via `next/font`). Tokens live in `tailwind.config.js`.

## Features

1. **Zero-friction auth (KORA Pass)** — `/account`. QR + 10-digit phone
   identifier that links in-store POS sales to the online profile; merged
   real-time history.
2. **Functional recipe engine** — `/` and `/recipes/[id]`. Macro-calculated
   recipe cards, interactive macro-nutrient pill, and the **One-Click Ingredient
   Bundle** up-sell that separates proprietary lines (PULSE, KORA Origen) from
   standard items, applies a bundled discount, and lets users uncheck what they
   already own.
3. **Smart fulfillment selector** — `/checkout`. Dual-tab Pickup (Click &
   Collect, node + time slots) vs Fast Local Delivery (address + windows).

## Image system

All photography renders through `<Photo imageKey="…" />`. The app ships with
committed SVG placeholders; real HD photography is git-ignored. **Full spec:**
visit `/image-format` or read `app/image-format/page.js` and
`public/photography/README.md`.

## Structure

```
app/                 routes (App Router)
  page.js            home — hero + recipe engine
  recipes/[id]/      recipe detail + ingredient bundle
  account/           KORA Pass dashboard
  checkout/          cart + fulfillment selector
  image-format/      image asset contract (docs)
components/          Photo, MacroPill, RecipeCard, IngredientBundle,
                     FulfillmentSelector, KoraPass, Nav, Footer, CartProvider …
lib/data.js          all dummy data + helpers
```
# kora
