import type { Metadata } from "next";
import { CardapioHeader } from "@/components/cardapio/CardapioHeader";
import { CardapioBrowser } from "@/components/cardapio/CardapioBrowser";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Cardápio",
  description: `Cardápio completo do Santa Mistura: entradas, pratos principais, sobremesas e drinks autorais. ${site.endereco}.`,
};

export default function CardapioPage() {
  return (
    <>
      <CardapioHeader />
      <main>
        <Container className="py-10 sm:py-14">
          <h1 className="font-display text-[clamp(3rem,10vw,6rem)] leading-none text-ink uppercase">
            Cardápio
          </h1>
          <p className="mt-2 text-sm text-muted">valores expressos em reais</p>
        </Container>

        <CardapioBrowser />
      </main>

      <footer className="border-t border-ink/10 py-10">
        <Container className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Alterações nos pratos podem acarretar mudança no valor.</p>
          <p>
            {site.endereco} · {site.telefone}
          </p>
        </Container>
      </footer>
    </>
  );
}
