// Enquanto as fotos reais não chegam do cliente, os arquivos em /public/images
// são placeholders SVG gerados por scripts/generate-placeholders.mjs.
// Para trocar por fotos reais: derrube os arquivos em /public/images com o
// mesmo nome-base (ex.: hero.webp) e mude só a linha abaixo.
const EXT = ".svg"; // TODO: trocar para ".webp" quando as fotos reais forem enviadas

const path = (name: string) => `/images/${name}${EXT}`;

export const images = {
  hero: path("hero"),
  ambiente1: path("ambiente-1"),
  ambiente2: path("ambiente-2"),
  destaques: {
    polvoRisoto: path("polvo-risoto"),
    camaraoKingGeorge: path("camarao-king-george"),
    primeRib: path("prime-rib"),
    bruschettaBlumenau: path("bruschetta-blumenau"),
    atumSelado: path("atum-selado"),
    trioDoSanta: path("trio-do-santa"),
  },
  galeria: [1, 2, 3, 4, 5, 6].map((n) => path(`galeria-${n}`)),
} as const;
