import { cn } from "@/lib/cn";
import { ACCENT_TEXT } from "@/lib/accent";
import type { Accent } from "@/data/menu";

export function SectionHeader({
  index,
  kicker,
  title,
  accent,
  note,
  light,
  align = "left",
  className,
  titleClassName,
}: {
  index: string;
  kicker: string;
  title: string;
  accent: Accent;
  note?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 sm:gap-6",
        align === "center" && "justify-center text-center",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "select-none font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-none",
          light ? "text-paper/10" : "text-ink/10"
        )}
      >
        {index}
      </span>
      <div className="pt-1.5 sm:pt-2.5">
        <p
          className={cn(
            "text-[11px] font-semibold tracking-[0.2em] uppercase sm:text-xs",
            ACCENT_TEXT[accent]
          )}
        >
          {kicker}
        </p>
        <h2
          data-reveal="title"
          className={cn(
            "mt-2 font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] tracking-tight uppercase",
            light ? "text-paper" : "text-ink",
            titleClassName
          )}
        >
          {title}
        </h2>
        {note ? (
          <p className={cn("mt-3 text-sm", light ? "text-paper/60" : "text-muted")}>{note}</p>
        ) : null}
      </div>
    </div>
  );
}
