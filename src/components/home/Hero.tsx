"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preference";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { RotatingWord } from "./RotatingWord";
import { RotatingBadge } from "./RotatingBadge";
import { site } from "@/data/site";
import { images } from "@/data/images";

const MARQUEE_ITEMS = [
  "POLVO GRELHADO",
  "PRIME RIB",
  "CAMARÃO À KING GEORGE",
  "OSTRAS GRATINADAS",
  "TRIO DO SANTA",
  "BACALHAU À LAGAREIRA",
  "APEROL SPRITZ",
];

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Sob reduced-motion, não criamos tweens: o conteúdo já nasce no
      // estado final (opacity/transform/clip-path padrão), sem precisar
      // de nenhuma animação chegar ao fim pra ficar visível.
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-reveal='para']", { yPercent: 100, opacity: 0, duration: 0.9 }, 0.1)
        .from("[data-reveal='word']", { yPercent: 100, opacity: 0, duration: 0.9 }, 0.2)
        .from("[data-reveal='lockup']", { y: 24, opacity: 0, duration: 0.7 }, 0.5)
        .from("[data-reveal='ctas'] > *", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.6)
        .from("[data-reveal='photo']", { clipPath: "inset(100% 0% 0% 0%)", duration: 1 }, 0.35)
        .from("[data-reveal='badge']", { opacity: 0, scale: 0.85, duration: 0.6 }, 0.9)
        .from("[data-reveal='marquee']", { opacity: 0, duration: 0.8 }, 0.9);

      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="topo"
      className="relative flex min-h-svh flex-col overflow-hidden pt-20 sm:pt-24"
    >
      <Container className="flex flex-1 flex-col justify-center gap-10 py-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="max-w-2xl">
          <h1 className="flex flex-col gap-1">
            <span data-reveal="para" className="block overflow-hidden">
              <span className="block font-display text-[clamp(3rem,12vw,8rem)] leading-[0.9] text-ink uppercase">
                Para
              </span>
            </span>
            <span
              data-reveal="word"
              className="block h-[clamp(3.2rem,12vw,8.2rem)] overflow-hidden"
            >
              <RotatingWord />
            </span>
          </h1>

          <p
            data-reveal="lockup"
            className="mt-6 max-w-md font-sans text-sm font-medium tracking-[0.14em] text-muted uppercase sm:text-base"
          >
            Santa Mistura — Gastronomia • Arte • Eventos — Joinville, desde {site.desde}
          </p>

          <div data-reveal="ctas" className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={site.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold tracking-wide text-paper uppercase transition-colors hover:bg-principal"
            >
              Reservar mesa
            </a>
            <Link
              href="/cardapio"
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-ink uppercase"
            >
              Ver cardápio
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-4/5 w-full max-w-sm shrink-0 lg:block">
          <div
            data-reveal="photo"
            ref={photoRef}
            className="absolute inset-0 overflow-hidden border border-ink/10 will-change-transform"
          >
            <Image
              src={images.hero}
              alt="Salão do restaurante Santa Mistura, em Joinville"
              fill
              sizes="(min-width: 1024px) 24rem, 0px"
              className="object-cover"
              preload
              fetchPriority="high"
            />
          </div>
          <div data-reveal="badge" className="absolute -bottom-8 -left-8">
            <RotatingBadge className="h-32 w-32" />
          </div>
        </div>
      </Container>

      <div data-reveal="marquee" className="border-t border-ink/10 py-5">
        <Marquee items={MARQUEE_ITEMS} />
      </div>
    </section>
  );
}
