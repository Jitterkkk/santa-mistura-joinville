"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preference";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DottedRow } from "@/components/ui/DottedRow";
import { images } from "@/data/images";
import { menu } from "@/data/menu";

const DRINK_NAMES = ["Oase do Santa", "Santa Mistérios", "Eden 43", "Oase Negroni"];

const ALL_ITEMS = menu.flatMap((section) => section.items);

const drinks = DRINK_NAMES.map((name) => {
  const item = ALL_ITEMS.find((i) => i.name === name);
  if (!item) throw new Error(`Drink "${name}" não encontrado no cardápio`);
  return item;
});

export function Drinks() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const titleEl = sectionRef.current?.querySelector<HTMLElement>("[data-reveal='title']");
      if (titleEl) {
        const split = new SplitText(titleEl, { type: "lines", linesClass: "overflow-hidden" });
        gsap.from(split.lines, {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: titleEl, start: "top 85%" },
        });
      }

      gsap.from("[data-reveal='drink-row']", {
        x: -20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-reveal='drink-row']", start: "top 88%" },
      });

      if (photoRef.current) {
        gsap.from(photoRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: photoRef.current, start: "top 82%" },
        });

        gsap.to(photoRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="drinks" className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeader index="03" kicker="Drinks autorais" title="Para Alegrar" accent="drink" light />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex flex-col divide-y divide-paper/10 border-t border-paper/10">
            {drinks.map((item) => (
              <div key={item.name} data-reveal="drink-row" className="py-5">
                <DottedRow name={item.name} price={item.price} light hoverAccent="drink" />
                {item.desc ? <p className="mt-1.5 pr-4 text-sm text-paper/55">{item.desc}</p> : null}
              </div>
            ))}
          </div>

          <div>
            <div
              ref={photoRef}
              data-reveal="photo"
              className="relative aspect-4/3 w-full overflow-hidden border border-paper/15 will-change-transform"
            >
              <Image
                src={images.ambiente2}
                alt="Salão do Santa Mistura à noite"
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-xs tracking-wide text-paper/45 uppercase">
              Cozinha até 23h · Terça a sábado até 00h30
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
