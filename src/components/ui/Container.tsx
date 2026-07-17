import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return (
    <As className={cn("mx-auto w-full max-w-340 px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </As>
  );
}
