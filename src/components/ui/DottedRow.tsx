import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { ACCENT_GROUP_HOVER_TEXT } from "@/lib/accent";
import type { Accent } from "@/data/menu";
import { Chip } from "./Chip";

export function DottedRow({
  name,
  price,
  tags,
  light,
  hoverAccent,
  className,
  nameClassName,
}: {
  name: string;
  price?: number;
  tags?: string[];
  light?: boolean;
  hoverAccent?: Accent;
  className?: string;
  nameClassName?: string;
}) {
  return (
    <div className={cn("group flex items-baseline gap-2.5", className)}>
      <span
        className={cn(
          "shrink-0 font-sans text-[0.92em] font-semibold tracking-wide uppercase",
          light ? "text-paper" : "text-ink",
          nameClassName
        )}
      >
        {name}
      </span>
      {tags?.length ? (
        <span className="flex shrink-0 gap-1">
          {tags.map((tag) => (
            <Chip key={tag} light={light}>
              {tag}
            </Chip>
          ))}
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          "-translate-y-[0.25em] min-w-[1.25rem] flex-1 border-b border-dotted",
          light ? "border-paper/30" : "border-ink/25"
        )}
      />
      <span
        className={cn(
          "shrink-0 font-sans text-[0.92em] tabular-nums transition-colors duration-200",
          light ? "text-paper" : "text-ink",
          hoverAccent && ACCENT_GROUP_HOVER_TEXT[hoverAccent]
        )}
      >
        {price != null ? formatPrice(price) : "consultar"}
      </span>
    </div>
  );
}
