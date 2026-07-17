import type { Accent } from "@/data/menu";

export const ACCENT_ORDER: Accent[] = ["entrada", "principal", "doce", "drink"];

export const ACCENT_LABEL: Record<Accent, string> = {
  entrada: "Entradas",
  principal: "Principais",
  doce: "Doces",
  drink: "Drinks",
};

export const ACCENT_TEXT: Record<Accent, string> = {
  entrada: "text-entrada",
  principal: "text-principal",
  doce: "text-doce",
  drink: "text-drink",
};

// Mesmas cores, escurecidas o suficiente pra texto pequeno (kickers,
// marquee) fechar 4.5:1 contra o paper — o accent puro (ACCENT_TEXT)
// só fecha contraste em cima do painel ink (ver globals.css). Toda
// label sobre paper deve usar esta variante; sobre ink, usar a vivid.
export const ACCENT_TEXT_DEEP: Record<Accent, string> = {
  entrada: "text-entrada-deep",
  principal: "text-principal-deep",
  doce: "text-doce-deep",
  drink: "text-drink-deep",
};

export const ACCENT_BG: Record<Accent, string> = {
  entrada: "bg-entrada",
  principal: "bg-principal",
  doce: "bg-doce",
  drink: "bg-drink",
};

export const ACCENT_BORDER: Record<Accent, string> = {
  entrada: "border-entrada",
  principal: "border-principal",
  doce: "border-doce",
  drink: "border-drink",
};

export const ACCENT_GROUP_HOVER_TEXT: Record<Accent, string> = {
  entrada: "group-hover:text-entrada",
  principal: "group-hover:text-principal",
  doce: "group-hover:text-doce",
  drink: "group-hover:text-drink",
};

export function accentAt(index: number): Accent {
  return ACCENT_ORDER[index % ACCENT_ORDER.length];
}
