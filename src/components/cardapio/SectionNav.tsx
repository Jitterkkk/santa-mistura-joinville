"use client";

import { useLenis } from "@/components/motion/SmoothScrollProvider";
import { ACCENT_BG } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/data/menu";

const NAV_OFFSET = -132;

export function SectionNav({
  sections,
  activeId,
}: {
  sections: { id: string; title: string; accent: Accent }[];
  activeId: string;
}) {
  const lenisRef = useLenis();

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: NAV_OFFSET });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <nav aria-label="Seções do cardápio" className="border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
      <div className="scrollbar-none mx-auto flex max-w-340 gap-2 overflow-x-auto px-6 py-3 sm:px-8 lg:px-12">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap uppercase transition-colors",
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/70 hover:border-ink/40"
              )}
            >
              <span
                aria-hidden="true"
                className={cn("h-1.5 w-1.5 rounded-full", ACCENT_BG[section.accent])}
              />
              {section.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
