/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── KORA Brand System — exact design tokens ──
        alabaster: "#F7F5F0", // Primary 60% — warm stone / honed limestone / linen
        travertine: "#EFEAE0", // deeper stone layer for quiet contrast / banding
        moss: {
          DEFAULT: "#2C3E2B", // Secondary 30% — deep forest moss, structural
          50: "#EDF0EC",
          100: "#D6DDD4",
          700: "#3A5238",
          900: "#1E2B1D",
        },
        sprout: {
          DEFAULT: "#76A035", // Accent 10% — vibrant sprout green (CTAs / brand lines)
          dark: "#5F8429",
          light: "#8FBF4A",
        },
        charcoal: "#1A1A1A", // Neutral text — softer modern off-black

        // ── Tactile material palette (mirrors in-store surfaces) ──
        walnut: { DEFAULT: "#6B4F34", light: "#8A6D3B", soft: "#C9B68A" }, // solid walnut wood
        concrete: "#D9D5CC", // sandblasted concrete
        steel: "#222220", // brushed matte-black steel frames
      },
      fontFamily: {
        // Roboto across every digital touchpoint per brand guide
        sans: ["var(--font-roboto)", "Roboto", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        wide2: "0.18em",
        wide3: "0.32em", // architectural gallery labels
      },
      borderRadius: {
        kora: "1.25rem",
      },
      boxShadow: {
        soft: "0 2px 24px -8px rgba(44, 62, 43, 0.12)",
        lift: "0 18px 50px -20px rgba(44, 62, 43, 0.30)",
        // Recessed halo — the diffuse white LED glow framing boutique chillers
        halo: "0 0 0 1px rgba(44,62,43,0.05), 0 28px 70px -34px rgba(44,62,43,0.32)",
        frame: "inset 0 0 0 1.5px rgba(34,34,32,0.92)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        "halo-breathe": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-sm": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "scan": "scan 2.4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.16,1,0.3,1) infinite",
        "halo-breathe": "halo-breathe 5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-sm": "float-sm 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
