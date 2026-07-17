"use client";

import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DottedRow } from "@/components/ui/DottedRow";
import type { MenuSection as MenuSectionType } from "@/data/menu";

export const MenuSection = forwardRef<HTMLElement, { section: MenuSectionType; index: string }>(
  function MenuSection({ section, index }, forwardedRef) {
    const localRef = useRef<HTMLElement | null>(null);

    useGSAP(
      () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal='item']", localRef.current);
        ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 14, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.05 }
            ),
        });
      },
      { scope: localRef, dependencies: [section.id] }
    );

    return (
      <section
        ref={(el) => {
          localRef.current = el;
          if (typeof forwardedRef === "function") forwardedRef(el);
          else if (forwardedRef) forwardedRef.current = el;
        }}
        id={section.id}
        className="scroll-mt-36 border-t border-ink/10 py-16"
      >
        <SectionHeader
          index={index}
          kicker={section.kicker}
          title={section.title}
          accent={section.accent}
          note={section.note}
        />

        <div className="mt-10 flex flex-col divide-y divide-ink/10">
          {section.items.map((item) => (
            <div key={item.name} data-reveal="item" className="py-4">
              <DottedRow name={item.name} price={item.price} tags={item.tags} />
              {item.desc ? (
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{item.desc}</p>
              ) : null}
            </div>
          ))}
        </div>

        {section.extra ? (
          <div className="mt-10 border-t border-ink/10 pt-8">
            <p className="text-sm font-semibold tracking-wide text-ink uppercase">
              {section.extra.title}
            </p>
            {section.extra.note ? (
              <p className="mt-1 text-sm text-muted">{section.extra.note}</p>
            ) : null}
            <div className="mt-4 grid gap-x-10 gap-y-1 sm:grid-cols-2">
              {section.extra.items.map((item) => (
                <div key={item.name} data-reveal="item" className="py-1.5">
                  <DottedRow name={item.name} price={item.price} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    );
  }
);
