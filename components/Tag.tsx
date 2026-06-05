// Fitness-focused tag chip.
type TagTone = "moss" | "sprout" | "earth";

interface TagProps {
  children: React.ReactNode;
  tone?: TagTone;
}

export function Tag({ children, tone = "moss" }: TagProps) {
  const tones: Record<TagTone, string> = {
    moss: "bg-moss/8 text-moss",
    sprout: "bg-sprout/12 text-sprout-dark",
    earth: "bg-[#C9B68A]/20 text-[#8A6D3B]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

// Proprietary-brand badge (PULSE / KORA Origen) — always sprout-accented.
interface BrandBadgeProps {
  label: string;
}

export function BrandBadge({ label }: BrandBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-sprout/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide2 text-sprout-dark">
      {label}
    </span>
  );
}
