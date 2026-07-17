"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { AnchorLink } from "@/components/motion/AnchorLink";
import { useLenis } from "@/components/motion/SmoothScrollProvider";
import { Container } from "@/components/ui/Container";
import { useScrolled } from "@/hooks/useScrolled";
import { site } from "@/data/site";
import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/cn";

export function Nav() {
  const scrolled = useScrolled(12);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenis();

  useGSAP(
    () => {
      gsap.from(headerRef.current, { yPercent: -100, duration: 0.8, ease: "power4.out" });
    },
    { scope: headerRef }
  );

  useEffect(() => {
    if (open) {
      lenisRef?.current?.stop();
    } else {
      lenisRef?.current?.start();
    }
  }, [open, lenisRef]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      if (!open) return;
      const links = gsap.utils.toArray<HTMLElement>("[data-mobile-link]");
      gsap.fromTo(
        links,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: "power4.out", stagger: 0.06, delay: 0.1 }
      );
      (links[0] as HTMLElement | undefined)?.focus({ preventScroll: true });
    },
    { scope: panelRef, dependencies: [open] }
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between sm:h-24">
        <Link
          href="/"
          className="font-display text-xl tracking-tight uppercase sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          Santa Mistura
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <AnchorLink
              key={link.href}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-ink/80 uppercase transition-colors hover:text-principal"
            >
              {link.label}
            </AnchorLink>
          ))}
          <a
            href={site.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold tracking-wide text-paper uppercase transition-colors hover:bg-principal"
          >
            Reservar
          </a>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 h-[1.5px] w-full transition-transform duration-300",
                open ? "top-1/2 rotate-45 bg-paper" : "bg-ink"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-[1.5px] w-full transition-opacity duration-200",
                open ? "opacity-0" : "bg-ink opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[1.5px] w-full transition-transform duration-300",
                open ? "bottom-1/2 -rotate-45 bg-paper" : "bg-ink"
              )}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-0 top-0 flex flex-col justify-center gap-1 bg-ink px-8 pb-16 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="overflow-hidden">
              <AnchorLink
                href={link.href}
                data-mobile-link
                onNavigate={() => setOpen(false)}
                className="block py-1.5 font-display text-5xl text-paper uppercase sm:text-6xl"
              >
                {link.label}
              </AnchorLink>
            </div>
          ))}
          <a
            href={site.waLink}
            target="_blank"
            rel="noopener noreferrer"
            data-mobile-link
            className="mt-6 inline-flex w-fit rounded-full bg-principal px-6 py-3 font-sans text-sm font-semibold tracking-wide text-ink uppercase"
          >
            Reservar mesa
          </a>
        </div>
      ) : null}
    </header>
  );
}
