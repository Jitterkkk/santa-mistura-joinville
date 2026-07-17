import { cn } from "@/lib/cn";
import { ACCENT_TEXT_DEEP, accentAt } from "@/lib/accent";

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const track = (
    <div className="flex w-max shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={cn(
              "whitespace-nowrap font-display text-[clamp(1.75rem,5.5vw,3.5rem)] leading-none tracking-tight uppercase",
              "text-transparent [-webkit-text-stroke:1.3px_var(--color-ink)]"
            )}
          >
            {item}
          </span>
          <span className={cn("mx-6 text-2xl sm:text-3xl", ACCENT_TEXT_DEEP[accentAt(i)])} aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("group overflow-hidden", className)} aria-hidden="true">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track}
        {track}
      </div>
    </div>
  );
}
