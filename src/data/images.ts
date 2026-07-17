// Slots ainda sem foto real enviada pelo cliente seguem em placeholder SVG
// (gerado por scripts/generate-placeholders.mjs). Conforme scripts/optimize-images.mjs
// processa novos arquivos de raw-images/, troque a extensão do slot aqui.
const PLACEHOLDER_EXT = ".svg";
const PHOTO_EXT = ".webp";

const placeholder = (name: string) => `/images/${name}${PLACEHOLDER_EXT}`;
const photo = (name: string) => `/images/${name}${PHOTO_EXT}`;

export const images = {
  hero: placeholder("hero"),
  ambiente1: placeholder("ambiente-1"),
  ambiente2: placeholder("ambiente-2"),
  destaques: {
    polvoRisoto: placeholder("polvo-risoto"),
    camaraoKingGeorge: placeholder("camarao-king-george"),
    primeRib: placeholder("prime-rib"),
    bruschettaBlumenau: placeholder("bruschetta-blumenau"),
    atumSelado: placeholder("atum-selado"),
    trioDoSanta: placeholder("trio-do-santa"),
  },
  galeria: [1, 2, 3, 4, 5, 6].map((n) => photo(`galeria-${n}`)),
} as const;
