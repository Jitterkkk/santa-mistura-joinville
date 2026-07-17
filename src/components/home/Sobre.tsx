"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { images } from "@/data/images";
import { site } from "@/data/site";

export function Sobre() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

      gsap.from("[data-reveal='copy']", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-reveal='copy']", start: "top 88%" },
      });

      gsap.from("[data-reveal='chips']", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='chips']", start: "top 92%" },
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
    <section ref={sectionRef} id="sobre" className="py-24 sm:py-32">
      <Container>
        <SectionHeader index="01" kicker="Sobre" title="Para Começar" accent="entrada" />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-lg lg:pt-4">
            <p data-reveal="copy" className="text-lg leading-relaxed text-ink sm:text-xl">
              Desde {site.desde}, o Santa Mistura serve cozinha internacional num salão que
              também é galeria: quadros, livros e uma adega dividem espaço com as mesas, num
              ambiente pensado para durar a noite inteira.
            </p>
            <p data-reveal="copy" className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              É por isso que existimos no plural — do almoço executivo de terça a sábado ao
              jantar com música ao vivo, dos encontros em família aos fechamentos de negócio.
              Gastronomia, arte e eventos, misturados como manda o nome da casa.
            </p>

            <div data-reveal="chips" className="mt-8 flex flex-wrap gap-2">
              <Chip>Desde {site.desde}</Chip>
              <Chip>
                {site.rating.nota}★ no {site.rating.fonte}
              </Chip>
              <Chip>Cozinha internacional</Chip>
            </div>
          </div>

          <div
            ref={photoRef}
            className="relative aspect-4/3 w-full overflow-hidden border border-ink/10"
          >
            <Image
              src={images.ambiente1}
              alt="Ambiente interno do restaurante Santa Mistura, com arte e adega no salão"
              fill
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
