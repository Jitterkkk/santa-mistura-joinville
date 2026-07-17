import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Chip({
  children,
  className,
  light,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
        light ? "border-paper/25 text-paper/70" : "border-ink/15 text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
