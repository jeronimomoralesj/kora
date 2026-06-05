# KORA Photography — asset folder

This folder holds production photography. **The image binaries are git-ignored**
(see the repo `.gitignore`); only this README is committed. The app ships with
deterministic SVG placeholders so it always builds without these files.

> Full, rendered spec with a live key registry: visit **`/image-format`** in the
> running app, or read `app/image-format/page.js`.

## Rules in one screen

- **Component:** every image renders through `<Photo imageKey="…" />`
  (`components/Photo.js`). Never use a bare `<img>` in a page.
- **Naming:** filename **must equal** the `imageKey` declared in `lib/data.js`.
  kebab-case, subject + dominant tone, e.g. `bowl-green`.
- **Format:** WebP primary (AVIF optional, JPEG fallback), sRGB 8-bit.
- **Sizes:**
  - Recipe: `1600×1200` (4:3, also crops 1:1)
  - Hero/lifestyle: `2400×1500` (16:10) or `2000×2500` (4:5)
  - Brand panel: `1920×1200` (16:10)
- **Weight:** ≤ 220 KB @1x, ≤ 480 KB @2x.
- **Art direction:** bright high-stage lighting, warm alabaster (`#F7F5F0`) or
  natural-wood surfaces, single hero subject, 12% safe margin, **no baked-in text**.

## Folders

```
photography/
├─ README.md   (committed)
├─ raw/        (git-ignored — PSD/TIFF masters)
└─ hd/         (git-ignored — web exports: <imageKey>.webp + <imageKey>@2x.webp)
```

## Adding real photography (no app changes needed)

1. Export `hd/<imageKey>.webp` and `hd/<imageKey>@2x.webp`.
2. Swap the SVG body in `components/Photo.js` for the `<img>` snippet shown on
   `/image-format`. The `imageKey` contract stays identical.
