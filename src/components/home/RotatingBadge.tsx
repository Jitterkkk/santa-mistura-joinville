import { cn } from "@/lib/cn";

const BADGE_TEXT = "SANTA MISTURA • JOINVILLE • DESDE 2012 • ";

export function RotatingBadge({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-center justify-center rounded-full border border-ink/15 bg-paper",
        className
      )}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none">
        <defs>
          <path id="hero-badge-path" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" fill="none" />
        </defs>
        <text
          fontSize="11.5"
          fill="var(--color-ink)"
          letterSpacing="2"
          className="font-sans font-semibold uppercase"
        >
          <textPath href="#hero-badge-path" startOffset="0%">
            {BADGE_TEXT}
          </textPath>
        </text>
      </svg>
      <span className="font-display text-2xl text-principal">✻</span>
    </div>
  );
}
