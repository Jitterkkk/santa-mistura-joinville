"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

function PinIcon({ className }: { className?: string }) {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Reserva() {
  const sectionRef = useRef<HTMLElement>(null);

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

      gsap.from("[data-reveal='info']", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='info']", start: "top 85%" },
      });

      gsap.from("[data-reveal='cta-panel']", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-reveal='cta-panel']", start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="contato" className="py-24 sm:py-32">
      <Container>
        <SectionHeader index="05" kicker="Reservas" title="Para Voltar Sempre" accent="principal" />

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div data-reveal="info" className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Endereço</p>
              <p className="mt-2 text-lg text-ink">{site.endereco}</p>
              <p className="text-sm text-muted">CEP {site.cep}</p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Horários</p>
              <dl className="mt-2 flex flex-col">
                {site.horarios.map((h) => (
                  <div
                    key={h.dias}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-ink/10 py-2.5"
                  >
                    <dt className="text-sm font-semibold text-ink">{h.dias}</dt>
                    <dd className="text-right text-sm text-muted">
                      {h.horas}
                      {"nota" in h && h.nota ? ` · ${h.nota}` : ""}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <a href={site.telLink} className="w-fit text-ink transition-colors hover:text-principal">
                {site.telefone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="w-fit text-muted transition-colors hover:text-principal"
              >
                {site.email}
              </a>
            </div>

            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border border-ink/10 p-4 transition-colors hover:border-principal"
            >
              <PinIcon className="h-6 w-6 shrink-0 text-principal" />
              <span className="flex-1 text-sm text-ink">{site.endereco}</span>
              <span className="shrink-0 text-sm font-semibold text-principal">
                Abrir no Google Maps →
              </span>
            </a>
          </div>

          <div
            data-reveal="cta-panel"
            className="flex flex-col justify-center gap-5 border border-ink/10 bg-panel p-8 sm:p-10"
          >
            <p className="font-display text-3xl leading-[0.95] text-ink uppercase sm:text-4xl">
              Vamos reservar sua mesa?
            </p>
            <a
              href={site.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-center text-sm font-semibold tracking-wide text-paper uppercase transition-colors hover:bg-principal"
            >
              Reservar pelo WhatsApp
            </a>
            <a
              href={site.telLink}
              className="inline-flex items-center justify-center text-sm font-semibold tracking-wide text-ink uppercase underline decoration-ink/30 underline-offset-4 transition-colors hover:text-principal"
            >
              Ligar {site.telefone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
