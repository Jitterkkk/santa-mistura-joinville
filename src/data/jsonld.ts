import { site, SITE_URL } from "./site";

// Schema.org não tem um valor de "fechado" dentro de openingHoursSpecification —
// dias sem serviço (segunda-feira) simplesmente não entram na lista.
// Feriados ("Domingos e feriados") são representados como o horário de domingo.
export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  telephone: site.telLink.replace("tel:", ""),
  email: site.email,
  servesCuisine: "Cozinha internacional",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Otto Boehm, 722",
    addressLocality: "Joinville",
    addressRegion: "SC",
    postalCode: site.cep,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:30",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "18:30",
      closes: "00:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "11:30",
      closes: "15:00",
    },
  ],
  sameAs: [site.instagramUrl],
} as const;
