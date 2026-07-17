"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { menu, type MenuSection as MenuSectionType } from "@/data/menu";
import { matchesQuery } from "@/lib/search";
import { SectionNav } from "./SectionNav";
import { MenuSection } from "./MenuSection";

function filterSection(section: MenuSectionType, query: string): MenuSectionType {
  const matchItem = (item: MenuSectionType["items"][number]) =>
    matchesQuery(`${item.name} ${item.desc ?? ""}`, query);

  return {
    ...section,
    items: section.items.filter(matchItem),
    extra: section.extra
      ? { ...section.extra, items: section.extra.items.filter(matchItem) }
      : undefined,
  };
}

function sectionHasResults(section: MenuSectionType): boolean {
  return section.items.length > 0 || (section.extra?.items.length ?? 0) > 0;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function CardapioBrowser() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(menu[0].id);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length > 0;

  const visibleSections = useMemo(() => {
    if (!isSearching) return menu;
    return menu.map((section) => filterSection(section, trimmedQuery)).filter(sectionHasResults);
  }, [isSearching, trimmedQuery]);

  useGSAP(
    () => {
      if (isSearching) return;
      const triggers = menu
        .map((section) => {
          const el = sectionRefs.current[section.id];
          if (!el) return null;
          return ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) setActiveId(section.id);
            },
          });
        })
        .filter(Boolean);

      return () => {
        triggers.forEach((trigger) => trigger?.kill());
      };
    },
    { scope: wrapRef, dependencies: [isSearching] }
  );

  return (
    <div ref={wrapRef}>
      <div className="sticky top-0 z-30 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
        <SectionNav
          sections={menu.map((section) => ({
            id: section.id,
            title: section.title,
            accent: section.accent,
          }))}
          activeId={activeId}
        />

        <Container className="py-3">
          <div className="relative max-w-sm">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar no cardápio..."
              aria-label="Buscar prato ou bebida no cardápio"
              className="w-full rounded-full border border-ink/15 bg-paper py-2.5 pr-4 pl-11 text-sm text-ink placeholder:text-muted focus:border-ink/40"
            />
          </div>
        </Container>
      </div>

      <Container>
        {visibleSections.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-24 text-center">
            <p className="font-display text-2xl text-ink uppercase">Nada por aqui...</p>
            <p className="text-sm text-muted">que tal um Polvo Grelhado?</p>
          </div>
        ) : (
          visibleSections.map((section, i) => (
            <MenuSection
              key={section.id}
              section={section}
              index={String(i + 1).padStart(2, "0")}
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
            />
          ))
        )}
      </Container>

      <a
        href={site.waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold tracking-wide text-paper uppercase shadow-lg shadow-ink/20 transition-colors hover:bg-principal lg:hidden"
      >
        Reservar
      </a>
    </div>
  );
}
