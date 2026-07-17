import Link from "next/link";
import { AnchorLink } from "@/components/motion/AnchorLink";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { NAV_LINKS } from "@/lib/nav-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-paper pt-16 pb-8">
      <Container>
        <Link
          href="/"
          className="block font-display text-[clamp(3rem,15vw,11rem)] leading-[0.85] text-ink uppercase"
        >
          Santa Mistura
        </Link>

        <div className="mt-10 flex flex-col gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Links do rodapé">
            {NAV_LINKS.map((link) => (
              <AnchorLink
                key={link.href}
                href={link.href}
                className="text-sm font-semibold tracking-wide text-ink/70 uppercase transition-colors hover:text-principal"
              >
                {link.label}
              </AnchorLink>
            ))}
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold tracking-wide text-ink/70 uppercase transition-colors hover:text-principal"
            >
              Instagram
            </a>
          </nav>

          <p className="text-sm text-muted">{site.endereco}</p>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-ink/10 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p className="italic">valores expressos em reais</p>
        </div>
      </Container>
    </footer>
  );
}
