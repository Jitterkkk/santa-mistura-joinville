export type Accent = "entrada" | "principal" | "doce" | "drink";

export type MenuItem = {
  name: string;
  desc?: string;
  price?: number;
  tags?: string[];
};

export type MenuSection = {
  id: string;
  kicker: string;
  title: string;
  note?: string;
  accent: Accent;
  items: MenuItem[];
  extra?: {
    title: string;
    note?: string;
    items: MenuItem[];
  };
};

export const menu: MenuSection[] = [
  {
    id: "para-comecar",
    kicker: "Entradas",
    title: "Para Começar",
    note: "servem 2 pessoas",
    accent: "entrada",
    items: [
      { name: "Antepastos do Santa", desc: "acompanha pão e focaccia", price: 58 },
      {
        name: "Camarões Provençal",
        desc: "camarões salteados com alho, cebola, tomate, vinho e ervas finas",
        price: 89,
      },
      { name: "Polvo ao Alho e Óleo", desc: "polvo salteado com alho e azeite", price: 92 },
      { name: "Bolinhos de Bacalhau", price: 55, tags: ["6 un."] },
      { name: "Ostras Gratinadas com Limão Siciliano", price: 59, tags: ["6 un."] },
      { name: "Queijo Brie Assado", desc: "com amêndoas tostadas e mel silvestre", price: 89 },
      {
        name: "Salada Quente de Bacalhau",
        desc:
          "lascas de bacalhau salteadas, pimentões, tomate, cebola, azeitonas, vinho branco e azeite de oliva",
        price: 89,
      },
      {
        name: "Salada Quente de Polvo e Lula",
        desc:
          "folhas verdes, polvo, lula e champignon salteados, tomate fresco e um toque de pimenta calabresa",
        price: 79,
      },
      {
        name: "Burrata Italiana com Mix de Folhas",
        desc: "com tomate cereja salteado em ervas finas e balsâmico frutado",
        price: 89,
      },
      {
        name: "Bruschettas de Linguiça Blumenau",
        desc: "com brie e geleia de pimenta",
        price: 63,
        tags: ["6 un."],
      },
      {
        name: "Dadinhos de Tapioca",
        desc: "com queijo coalho e geleia de pimenta",
        price: 49,
        tags: ["10 un."],
      },
      { name: "Salada de Pera, Gorgonzola e Nozes", desc: "com molho agridoce de pera", price: 79 },
      {
        name: "Baguette Assada com Burrata",
        desc: "com pesto genovês, tomatinhos e salame espanhol",
        price: 89,
      },
    ],
  },
  {
    id: "para-sentir-se-bem",
    kicker: "Pratos Principais",
    title: "Para Sentir-se Bem",
    accent: "principal",
    items: [
      { name: "Prime Rib 350g", desc: "com molho chimichurri e risoto ao funghi", price: 169 },
      { name: "Steak au Poivre Vert", desc: "com nhoque tostado", price: 130 },
      {
        name: "Filé do Moraes",
        desc: "steak de mignon com alho frito, arroz cremoso, batata rústica e brócolis",
        price: 130,
      },
      {
        name: "Ossobuco",
        desc:
          "assado a baixa temperatura com ervas, tomate e vinho tinto, purê de raízes e crocante defumado",
        price: 110,
      },
      {
        name: "Escalope de Mignon em Crosta de Amêndoas",
        desc: "molho roti e arroz piamontese, palha de raízes e agrião",
        price: 120,
      },
      {
        name: "Bife de Tiras na Chapa",
        desc: "com burrata italiana, tomatinho e batata rústica com páprica defumada",
        price: 169,
      },
      {
        name: "Picanha de Cordeiro",
        desc: "com risoto milanês, tempurá de sálvia e pangrattato de castanhas",
        price: 120,
      },
      {
        name: "Stinco de Cordeiro",
        desc:
          "assado a baixa temperatura, nhoque na manteiga de sálvia e croquetas de cebola caramelizada",
        price: 135,
      },
      { name: "Polvo Grelhado com Risoto de Camarão e Limão Siciliano", price: 179 },
      {
        name: "Polvo Grelhado com Arroz Negro",
        desc: "com abóbora cabotiá caramelizada, crocante defumado e molho pesto",
        price: 179,
      },
      {
        name: "Salmão em Crosta de Castanhas",
        desc: "com nhoque de batata, camarão, nata e parmesão",
        price: 145,
      },
      {
        name: "Peixe em Crosta de Pistache",
        desc: "peixe do dia, risoto caprese com camarões e mussarela de búfala",
        price: 158,
      },
      {
        name: "Peixe Grelhado com Camarões e Alcaparras",
        desc:
          "peixe do dia grelhado, molho de camarões e alcaparras, espaguete de legumes com molho bechamel",
        price: 149,
      },
      {
        name: "Atum Selado",
        desc: "molho de camarões oriental, vagem, crispy de cebola roxa e batatas pérola",
        price: 120,
      },
      {
        name: "Bacalhau à Lagareira",
        desc: "posta de bacalhau em leito de cebolas e azeitonas, batatas sauté, alho crocante e brócolis",
        price: 149,
      },
      {
        name: "Bacalhau à Moda do Adriático",
        desc:
          "postas ao forno com cebolas, batatas, molho de ervas, tomate, azeitona preta e vinho branco",
        price: 159,
      },
    ],
  },
  {
    id: "continue-por-aqui",
    kicker: "Pratos Principais",
    title: "Continue por Aqui",
    accent: "principal",
    items: [
      {
        name: "Camarão à King George",
        desc:
          "camarões flambados com conhaque, molho de nata, molho inglês, arroz com brócolis e palha de raízes",
        price: 172,
      },
      {
        name: "Camarão à Romana",
        desc: "camarões empanados com parmesão, risoto de limão siciliano e cebola caramelizada",
        price: 179,
      },
      {
        name: "Risoto de Frutos do Mar",
        desc: "arroz arbóreo, açafrão, camarões, polvo e lula",
        price: 120,
      },
      {
        name: "Pato ao Vinho do Porto e Frutas Vermelhas",
        desc: "com risoto de rúcula, brie e tomates secos",
        price: 120,
      },
      {
        name: "Talharim com Frutos do Mar e Manjericão",
        desc: "talharim, molho de tomate, açafrão, lula, polvo e camarão",
        price: 120,
      },
      {
        name: "Nhoque com Mignon e Funghi Secchi",
        desc: "nhoque com tiras de mignon, funghi e molho bechamel",
        price: 110,
      },
    ],
  },
  {
    id: "vegetariano",
    kicker: "Pratos Principais",
    title: "Vegetariano",
    accent: "doce",
    items: [
      { name: "Nhoque à Bolonhesa", desc: "com proteína de soja", price: 89 },
      { name: "Risoto de Cogumelos Frescos e Vegetais", price: 89 },
    ],
  },
  {
    id: "kids",
    kicker: "Pratos Principais",
    title: "Kids",
    accent: "entrada",
    items: [
      { name: "Mignon Grelhado", desc: "com arroz e batata sorriso", price: 59 },
      { name: "Mignon à Milanesa", desc: "com talharim na manteiga", price: 59 },
      { name: "Salmão Grelhado", desc: "com arroz e fritas", price: 59 },
    ],
  },
  {
    id: "para-ser-feliz",
    kicker: "Sobremesas",
    title: "Para Ser Feliz",
    accent: "doce",
    items: [
      {
        name: "Sorvete de Manjericão",
        desc: "com crumble de amêndoas e coulis de frutas vermelhas",
        price: 32,
      },
      { name: "Petit Gâteau Duo com Sorvete Bacio di Latte", price: 37 },
      {
        name: "Terrine de Sorvete de Laranja e Chocolate",
        desc: "com praliné de amêndoas e calda de chocolate",
        price: 34,
      },
      {
        name: "Semifreddo de Pistache e Frutas Vermelhas",
        desc: "creme italiano semicongelado",
        price: 32,
      },
      {
        name: "Tortinha Vegana",
        desc:
          "massa de castanhas com damasco, brigadeiro de banana com cacau e geleia de frutas vermelhas adoçada com xilitol",
        price: 34,
        tags: ["vegana"],
      },
      { name: "Cocada Morna", desc: "cocada cremosa morna com sorvete de limão", price: 32 },
      { name: "Creme Brûlée", price: 32 },
      {
        name: "Trio do Santa",
        desc: "cocadinha de coco queimado com geleia de abacaxi, pudim de leite e brigadeiro",
        price: 32,
      },
      {
        name: "Gelato de Frutas",
        desc:
          "sorvete de banana, morango e leite de coco com geleia de frutas vermelhas adoçada com xilitol",
        price: 34,
        tags: ["s/ glúten", "s/ lactose"],
      },
      {
        name: "Tartelete de Chocolate",
        desc: "creme de chocolate belga, sorvete de baunilha e ganache quente de chocolate 70%",
        price: 34,
      },
      { name: "Picolé Bacio di Latte", desc: "consultar sabores e preços" },
    ],
  },
  {
    id: "para-alegrar",
    kicker: "Drinks",
    title: "Para Alegrar",
    accent: "drink",
    items: [
      {
        name: "Oase do Santa",
        desc: "Gin Oase, tangerina, limão siciliano, água com gás e splash de frutas vermelhas",
        price: 39,
      },
      { name: "Eden 43", desc: "Vodka Eden, Licor 43, abacaxi, lima e limão siciliano", price: 39 },
      {
        name: "Santa Mistérios",
        desc: "Gin Oase, Vodka Eden, Drambuie, limão tahiti e amora negra",
        price: 39,
      },
      { name: "Aperol Spritz", desc: "Aperol, espumante brut e água com gás", price: 39 },
      { name: "Gin Tropical", desc: "gin, Red Bull Tropical e frutas", price: 45 },
      { name: "Gin Tônica", price: 39 },
      { name: "Oase Negroni", desc: "Gin Oase, Campari e vermute", price: 39 },
      { name: "Morango Fresh", desc: "Bacardi, água com gás e morango", price: 35 },
      { name: "Mojito", desc: "Bacardi, água com gás, limão e hortelã", price: 35 },
      { name: "Jack Coke", desc: "dose de Jack Daniel's com Coca-Cola", price: 39 },
      { name: "Cuba", desc: "Vodka Eden e Coca-Cola", price: 39 },
      { name: "Taça de Espumante com Frutas", price: 37 },
      { name: "Amarula", price: 35 },
    ],
    extra: {
      title: "Caipirinhas Tradicionais",
      note: "limão, frutas vermelhas ou morango",
      items: [
        { name: "Smirnoff", price: 37 },
        { name: "Bacardi", price: 37 },
        { name: "Absolut", price: 39 },
        { name: "Steinhäger", price: 37 },
        { name: "Saqueirinha", price: 37 },
        { name: "Eden", price: 37 },
      ],
    },
  },
];
