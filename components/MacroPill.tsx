"use client";

import { useState } from "react";
import type { Macros } from "@/lib/types";

// Interactive Macro-Nutrient Summary — minimal, distinct pills.
// Compact by default; tap/click to expand a proportional macro breakdown.
interface MacroPillProps {
  macros: Macros;
  expandable?: boolean;
  defaultOpen?: boolean;
}

interface MacroSegment {
  key: string;
  val: number;
  pct: number;
  color: string;
}

export default function MacroPill({ macros, expandable = true, defaultOpen = false }: MacroPillProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { calories, protein, carbs, fats } = macros;

  // Caloric contribution: protein 4, carbs 4, fats 9 kcal/g — for the ratio bar.
  const pCal = protein * 4;
  const cCal = carbs * 4;
  const fCal = fats * 9;
  const totalCal = pCal + cCal + fCal || 1;
  const seg: MacroSegment[] = [
    { key: "Proteína", val: protein, pct: (pCal / totalCal) * 100, color: "#76A035" },
    { key: "Carbos", val: carbs, pct: (cCal / totalCal) * 100, color: "#2C3E2B" },
    { key: "Grasas", val: fats, pct: (fCal / totalCal) * 100, color: "#C9B68A" },
  ];

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => expandable && setOpen((v) => !v)}
        className={`flex w-full flex-wrap items-center gap-1.5 ${expandable ? "cursor-pointer" : "cursor-default"}`}
        aria-expanded={open}
        aria-label="Resumen de macronutrientes"
      >
        <Pill value={calories} label="Kcal" accent />
        <Pill value={`${protein}g`} label="Proteína" />
        <Pill value={`${carbs}g`} label="Carbos" />
        <Pill value={`${fats}g`} label="Grasas" />
      </button>

      <div className={`grid transition-all duration-300 ${open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="flex h-2 w-full overflow-hidden rounded-full ring-1 ring-moss/5">
            {seg.map((s) => (
              <div key={s.key} style={{ width: `${s.pct}%`, background: s.color }} title={`${s.key} ${Math.round(s.pct)}%`} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-medium text-moss/70">
            {seg.map((s) => (
              <span key={s.key}>
                {s.key} · {Math.round(s.pct)}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// One distinct, minimal pill.
interface PillProps {
  value: string | number;
  label: string;
  accent?: boolean;
}

function Pill({ value, label, accent }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
        accent ? "bg-moss text-alabaster" : "bg-alabaster text-moss ring-1 ring-moss/10"
      }`}
    >
      <span className="text-sm font-bold leading-none tabular-nums">{value}</span>
      <span className={`text-[10px] font-medium uppercase tracking-wide2 ${accent ? "text-alabaster/60" : "text-moss/45"}`}>
        {label}
      </span>
    </span>
  );
}
