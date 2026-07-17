"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DottedRow } from "@/components/ui/DottedRow";
import { cn } from "@/lib/cn";
import { images } from "@/data/images";
import { menu } from "@/data/menu";

const DESTAQUE_NAMES = [
  { name: "Polvo Grelhado com Risoto de Camarão e Limão Siciliano", image: images.destaques.polvoRisoto },
  { name: "Camarão à King George", image: images.destaques.camaraoKingGeorge },
  { name: "Prime Rib 350g", image: images.destaques.primeRib },
  { name: "Bruschettas de Linguiça Blumenau", image: images.destaques.bruschettaBlumenau },
  { name: "Atum Selado", image: images.destaques.atumSelado },
  { name: "Trio do Santa", image: images.destaques.trioDoSanta },
] as const;

const ALL_ITEMS = menu.flatMap((section) => section.items);

const destaques = DESTAQUE_NAMES.map(({ name, image }) => {
  const item = ALL_ITEMS.find((i) => i.name === name);
  if (!item) throw new Error(`Destaque "${name}" não encontrado no cardápio`);
  return { ...item, image };
});

export function Destaques() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.from("[data-reveal='row']", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from("[data-reveal='card']", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        ScrollTrigger.create({
          trigger: row,
          start: "center center",
          end: "center center",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="destaques" className="py-24 sm:py-32">
      <Container>
        <SectionHeader index="02" kicker="Destaques do cardápio" title="Para Sentir-se Bem" accent="principal" />

        {/* Desktop: lista + painel sticky */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-[1fr_26rem] lg:gap-16">
          <div className="flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {destaques.map((item, i) => (
              <button
                key={item.name}
                type="button"
                data-reveal="row"
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "flex w-full flex-col gap-1 border-l-2 py-6 pl-6 text-left transition-colors duration-300",
                  i === active ? "border-principal bg-panel/50" : "border-transparent hover:bg-panel/30"
                )}
              >
                <DottedRow name={item.name} price={item.price} tags={item.tags} />
                <p
                  className={cn(
                    "min-h-[1.5rem] pr-4 text-sm leading-snug text-muted transition-opacity duration-300",
                    i === active ? "opacity-100" : "opacity-0"
                  )}
                >
                  {item.desc ?? ""}
                </p>
              </button>
            ))}
          </div>

          <div className="sticky top-32 self-start">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-ink/10">
              {destaques.map((item, i) => (
                <Image
                  key={item.name}
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="26rem"
                  className={cn(
                    "object-cover transition-all duration-700 ease-out",
                    i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: cards empilhados */}
        <div className="mt-12 flex flex-col gap-10 lg:hidden">
          {destaques.map((item) => (
            <div key={item.name} data-reveal="card" className="flex flex-col gap-4">
              <div className="relative aspect-4/3 w-full overflow-hidden border border-ink/10">
                <Image src={item.image} alt={item.name} fill sizes="100vw" className="object-cover" />
              </div>
              <div>
                <DottedRow name={item.name} price={item.price} tags={item.tags} />
                {item.desc ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center lg:mt-16 lg:justify-start">
          <Link
            href="/cardapio"
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-ink uppercase"
          >
            Ver cardápio completo
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
