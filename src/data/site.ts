// TODO: confirmar o número real do WhatsApp do Santa Mistura antes de publicar em produção.
export const WHATSAPP_NUMBER = "5547XXXXXXXXX";

// TODO: confirmar o domínio de produção antes de publicar (usado em metadataBase,
// sitemap.xml, robots.txt e no JSON-LD).
export const SITE_URL = "https://santamisturajoinville.com.br";

const WHATSAPP_MESSAGE = "Olá! Gostaria de reservar uma mesa no Santa Mistura.";

export const site = {
  name: "Santa Mistura",
  tagline: "Gastronomia • Arte • Eventos",
  desde: 2012,
  endereco: "R. Otto Boehm, 722 – América, Joinville/SC",
  cep: "89201-700",
  telefone: "(47) 3025-6569",
  telLink: "tel:+554730256569",
  whatsapp: WHATSAPP_NUMBER,
  waLink: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  email: "adm@stamistura.com",
  instagram: "@santamisturajoinville",
  instagramUrl: "https://www.instagram.com/santamisturajoinville",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=R.+Otto+Boehm%2C+722+-+Am%C3%A9rica%2C+Joinville+-+SC%2C+89201-700",
  geo: { lat: -26.3028, lng: -48.8578 },
  horarios: [
    {
      dias: "Terça a sábado",
      horas: "11h30–15h · 18h30–00h30",
      nota: "cozinha até 23h",
    },
    { dias: "Domingos e feriados", horas: "11h30–15h" },
    { dias: "Segunda", horas: "Fechado" },
  ],
  rating: { nota: "4,7", fonte: "Google", qtd: "1.200+ avaliações" },
} as const;

export type Horario = (typeof site.horarios)[number];
