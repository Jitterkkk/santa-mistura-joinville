"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preference";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { blurData } from "@/data/blur-data.generated";

const GALLERY_ALT = [
  "Polvo grelhado com risoto de camarão e limão siciliano no Santa Mistura",
  "Burrata italiana com pão no Santa Mistura",
  "Steak au Poivre Vert servido no pátio do Santa Mistura",
  "Bacalhau com azeitonas e tomate, salão do Santa Mistura ao fundo",
  "Mesa posta com filé, camarão e drinks no Santa Mistura",
  "Tartelete de chocolate com café do Santa Mistura",
];

const COLUMN_OFFSET = ["", "lg:mt-16", "lg:mt-8"];
const PARALLAX_SPEED = [-10, -22, -14, -26, -12, -20];

function InstagramIcon({ className }: { className?: string }) {
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
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Galeria() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

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

      gsap.from("[data-reveal='photo-item']", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: PARALLAX_SPEED[i % PARALLAX_SPEED.length],
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="galeria" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="04"
          kicker="Nosso Instagram"
          title="Para Ser Feliz"
          accent="doce"
          align="center"
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {images.galeria.map((src, i) => {
            const blurDataURL = blurData[`galeria-${i + 1}`];
            return (
              <a
                key={src}
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver post no Instagram: ${GALLERY_ALT[i]}`}
                data-reveal="photo-item"
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cn(
                  "group relative aspect-4/5 overflow-hidden border border-ink/10 will-change-transform",
                  COLUMN_OFFSET[i % COLUMN_OFFSET.length]
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20rem, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                  <InstagramIcon className="h-7 w-7 text-paper" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold tracking-wide text-paper uppercase transition-colors hover:bg-doce"
          >
            <InstagramIcon className="h-4 w-4" />
            Seguir {site.instagram}
          </a>
        </div>
      </Container>
    </section>
  );
}
