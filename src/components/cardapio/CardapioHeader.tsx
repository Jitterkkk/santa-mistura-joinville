import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";

export function CardapioHeader() {
  return (
    <header className="border-b border-ink/10">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-ink/70 uppercase transition-colors hover:text-principal"
        >
          <span aria-hidden="true">←</span> Início
        </Link>
        <Link href="/" aria-label="Santa Mistura — início">
          <Logo className="h-10 w-10" />
        </Link>
        <a
          href={site.waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold tracking-wide text-paper uppercase transition-colors hover:bg-principal"
        >
          Reservar
        </a>
      </Container>
    </header>
  );
}
