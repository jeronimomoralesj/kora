// Wordmark KORA — el logo es la palabra misma, con el mismo peso tipográfico
// que la firma gigante del footer. Tamaño y color se controlan vía className.
interface LogoProps {
  className?: string;
}

export default function Logo({ className = "text-2xl text-moss" }: LogoProps) {
  return (
    <span className={`select-none font-black leading-none tracking-tightest ${className}`}>
      KORA
    </span>
  );
}
