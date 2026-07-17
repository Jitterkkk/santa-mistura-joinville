// Gera os placeholders SVG usados enquanto as fotos reais do cliente não chegam.
// Rodar com: node scripts/generate-placeholders.mjs
// Os nomes de arquivo devem bater com src/data/images.ts.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

const PANEL = "#E9E7E2";
const INK = "#141414";

const PLACEHOLDERS = [
  { file: "hero", label: "SANTA MISTURA", ratio: "4:5" },
  { file: "ambiente-1", label: "O AMBIENTE", ratio: "4:3" },
  { file: "ambiente-2", label: "A NOITE", ratio: "4:3" },
  { file: "polvo-risoto", label: "POLVO GRELHADO", ratio: "4:3" },
  { file: "camarao-king-george", label: "CAMARÃO KING GEORGE", ratio: "4:3" },
  { file: "prime-rib", label: "PRIME RIB", ratio: "4:3" },
  { file: "bruschetta-blumenau", label: "BRUSCHETTA BLUMENAU", ratio: "4:3" },
  { file: "atum-selado", label: "ATUM SELADO", ratio: "4:3" },
  { file: "trio-do-santa", label: "TRIO DO SANTA", ratio: "4:3" },
  { file: "galeria-1", label: "SANTA MISTURA", ratio: "4:5" },
  { file: "galeria-2", label: "GASTRONOMIA", ratio: "4:5" },
  { file: "galeria-3", label: "ARTE", ratio: "4:5" },
  { file: "galeria-4", label: "EVENTOS", ratio: "4:5" },
  { file: "galeria-5", label: "SALÃO", ratio: "4:5" },
  { file: "galeria-6", label: "ADEGA", ratio: "4:5" },
];

function dims(ratio) {
  return ratio === "4:5" ? { w: 960, h: 1200 } : { w: 1200, h: 900 };
}

function wrapLabel(label, maxChars) {
  const words = label.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildSvg({ label, ratio }) {
  const { w, h } = dims(ratio);
  const maxChars = ratio === "4:5" ? 9 : 13;
  const lines = wrapLabel(label, maxChars);
  const fontSize = Math.round(w * 0.15);
  const lineHeight = fontSize * 1.05;
  const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2;

  // textLength força o ajuste do glyph para nunca estourar a largura,
  // independente da fonte de fallback disponível no navegador/SO.
  const maxWidthBudget = w * 0.84;
  const longest = Math.max(...lines.map((l) => l.length));

  const textLines = lines
    .map((line, i) => {
      const textLength = Math.round(maxWidthBudget * (line.length / longest));
      return `  <text x="50%" y="${Math.round(startY + i * lineHeight)}" text-anchor="middle" dominant-baseline="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="${fontSize}" textLength="${textLength}" lengthAdjust="spacingAndGlyphs" fill="none" stroke="${INK}" stroke-opacity="0.16" stroke-width="1.4">${line}</text>`;
    })
    .join("\n");

  const badgeW = 176;
  const badgeH = 36;
  const badgeX = w - badgeW - 28;
  const badgeY = h - badgeH - 28;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Foto em breve">
  <rect width="${w}" height="${h}" fill="${PANEL}" />
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="${INK}" stroke-opacity="0.08" />
${textLines}
  <rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="18" fill="${PANEL}" stroke="${INK}" stroke-opacity="0.2" />
  <text x="${badgeX + badgeW / 2}" y="${badgeY + badgeH / 2 + 4}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="600" font-size="11" letter-spacing="1.5" fill="${INK}" fill-opacity="0.55">FOTO EM BREVE</text>
</svg>
`;
}

for (const item of PLACEHOLDERS) {
  writeFileSync(path.join(outDir, `${item.file}.svg`), buildSvg(item), "utf8");
}

console.log(`Gerados ${PLACEHOLDERS.length} placeholders em ${outDir}`);
