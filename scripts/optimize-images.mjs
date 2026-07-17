// Pipeline de otimização das fotos reais. Lê de /raw-images (gitignored),
// escreve .webp em public/images/ e gera src/data/blur-data.generated.ts.
// Rodar com: npm run images
import sharp from "sharp";
import { mkdirSync, existsSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const RAW_DIR = path.join(ROOT, "raw-images");
const OUT_DIR = path.join(ROOT, "public", "images");
const BLUR_OUT = path.join(ROOT, "src", "data", "blur-data.generated.ts");

mkdirSync(OUT_DIR, { recursive: true });

const WEIGHT_ALERT_BYTES = 250 * 1024;

const SLOTS = [
  { name: "hero", width: 1200, height: 1500 },
  { name: "ambiente-1", width: 1280, height: 960 },
  { name: "ambiente-2", width: 1280, height: 960 },
  { name: "polvo-risoto", width: 1280, height: 960 },
  { name: "camarao-king-george", width: 1280, height: 960 },
  { name: "prime-rib", width: 1280, height: 960 },
  { name: "bruschetta-blumenau", width: 1280, height: 960 },
  { name: "atum-selado", width: 1280, height: 960 },
  { name: "trio-do-santa", width: 1280, height: 960 },
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ name: `galeria-${n}`, width: 1080, height: 1350 })),
];

// Override do position do crop por slot ("attention" é o padrão — smart
// crop que busca rosto/pele/saturação). Se algum corte decapitar um prato,
// ajusta aqui pra "centre", "top", "bottom" etc. sem mexer no resto.
const POSITION_OVERRIDES = {
  // "hero": "centre",
};

async function run() {
  const results = [];
  let processed = 0;

  for (const slot of SLOTS) {
    const inputPath = path.join(RAW_DIR, `${slot.name}.jpg`);
    if (!existsSync(inputPath)) {
      console.log(`- ${slot.name}: sem arquivo em raw-images/, mantendo placeholder`);
      continue;
    }

    const outputPath = path.join(OUT_DIR, `${slot.name}.webp`);
    const position = POSITION_OVERRIDES[slot.name] ?? "attention";

    try {
      await sharp(inputPath)
        .rotate()
        .resize({ width: slot.width, height: slot.height, fit: "cover", position })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      const { size } = statSync(outputPath);
      const kb = (size / 1024).toFixed(1);
      const overWeight = size > WEIGHT_ALERT_BYTES;
      console.log(
        `${overWeight ? "⚠" : "✓"} ${slot.name}.webp — ${slot.width}×${slot.height} — ${kb}KB${
          overWeight ? "  ACIMA DE 250KB" : ""
        }`
      );

      const blurBuffer = await sharp(inputPath)
        .rotate()
        .resize({ width: 16 })
        .webp({ quality: 40 })
        .toBuffer();
      results.push({ name: slot.name, blurDataURL: `data:image/webp;base64,${blurBuffer.toString("base64")}` });
      processed++;
    } catch (err) {
      console.error(`✗ ${slot.name}: falhou —`, err instanceof Error ? err.message : err);
    }
  }

  const entries = results.map((r) => `  "${r.name}": "${r.blurDataURL}",`).join("\n");
  const fileContent = `// Gerado automaticamente por scripts/optimize-images.mjs — não editar à mão.
export const blurData: Record<string, string> = {
${entries}
};
`;
  writeFileSync(BLUR_OUT, fileContent, "utf8");

  console.log(`\n${processed}/${SLOTS.length} imagens processadas. blur-data.generated.ts atualizado.`);

  const logoPath = path.join(ROOT, "public", "logo.svg");
  if (existsSync(logoPath)) {
    const appleIconPath = path.join(ROOT, "src", "app", "apple-icon.png");
    await sharp(logoPath).resize(180, 180).png().toFile(appleIconPath);
    console.log("✓ apple-icon.png — 180×180 gerado a partir de public/logo.svg");
  }
}

run();
