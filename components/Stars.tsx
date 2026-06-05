// Estrellas de calificación — prueba social, minimalista.
interface StarsProps {
  value?: number;
  size?: number;
  className?: string;
}

export default function Stars({ value = 5, size = 14, className = "" }: StarsProps) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className={`relative inline-flex ${className}`} aria-label={`${value} de 5`} title={`${value} / 5`}>
      <Row size={size} color="rgba(44,62,43,0.18)" />
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <Row size={size} color="#76A035" />
      </span>
    </span>
  );
}

interface RowProps {
  size: number;
  color: string;
}

function Row({ size, color }: RowProps) {
  return (
    <span className="flex flex-none gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5Z" />
        </svg>
      ))}
    </span>
  );
}
