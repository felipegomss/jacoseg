import catalogoResumo from "./catalogo-resumo.json";
// Dados institucionais do site público. Fonte única para lojas, setores e linhas.

export type Store = {
  id: "jacobina" | "irece";
  label: string;
  city: string;
  street: string;
  district: string;
  cep: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsapp: string; // apenas dígitos, com DDI
  email: string;
  mapsUrl: string;
  coords: [number, number]; // [lng, lat]
};

export const STORES: Store[] = [
  {
    id: "jacobina",
    label: "Matriz",
    city: "Jacobina",
    street: "R. Cel. Hermenegildo, 50",
    district: "Missão",
    cep: "44700-000",
    phoneDisplay: "(74) 3621-9937",
    phoneHref: "tel:+557436219937",
    whatsapp: "557436219937",
    email: "vendas@jacoseg.com.br",
    mapsUrl: "https://maps.google.com/?q=JACOSEG+R.+Cel.+Hermenegildo+50+Jacobina+BA",
    coords: [-40.51744, -11.18168],
  },
  {
    id: "irece",
    label: "Filial",
    city: "Irecê",
    street: "Av. 1º de Janeiro, 1154",
    district: "Asa Norte",
    cep: "44864-090",
    phoneDisplay: "(74) 99806-8043",
    phoneHref: "tel:+5574998068043",
    whatsapp: "5574998068043",
    email: "vendas2@jacoseg.com.br",
    mapsUrl: "https://maps.google.com/?q=Av.+1+de+Janeiro+1154+Irec%C3%AA+BA",
    coords: [-41.856, -11.304], // aproximado: confirmar o ponto exato da loja
  },
];

export const HOURS = [
  { days: "Segunda a sexta", time: "8h às 18h" },
  { days: "Sábado", time: "8h às 12h30" },
  { days: "Domingo", time: "Fechado" },
];

export const COMPANY = {
  name: "JacoSeg",
  legalName: "Gomes e Nascimento Equipamentos de Segurança Ltda",
  cnpj: "10.989.158/0001-90",
  founded: 2009,
  instagram: "https://www.instagram.com/jacoseg",
  facebook: "https://www.facebook.com/Jacoseg-1412240005661084",
};

export function whatsappLink(number: string, text?: string) {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export const BRANDS = [
  // Logos recortados e monocromáticos; tamanhos calculados por área óptica equivalente
  { src: "/brands/mono/3m.png", alt: "3M", w: 130, h: 23 },
  { src: "/brands/mono/marluvas.png", alt: "Marluvas", w: 130, h: 23 },
  { src: "/brands/mono/bracol.png", alt: "Bracol", w: 88, h: 46 },
  { src: "/brands/mono/vonder.png", alt: "Vonder", w: 104, h: 29 },
  { src: "/brands/mono/kalipso.png", alt: "Kalipso", w: 87, h: 34 },
  { src: "/brands/mono/estival.png", alt: "Estival", w: 160, h: 22 },
  { src: "/brands/mono/bralimpia.png", alt: "Bralimpia", w: 107, h: 28 },
  { src: "/brands/mono/volk.png", alt: "Volk do Brasil", w: 109, h: 28 },
];

/** Linhas do catálogo. Os ids batem com scripts/importar-catalogo.py. */
export const CATEGORIES = [
  { id: "altura", title: "Trabalho em altura", items: "Cinturões, talabartes, trava-quedas e mosquetões" },
  { id: "cabeca", title: "Cabeça, olhos e face", items: "Capacetes, óculos, protetores faciais e máscaras de solda" },
  { id: "auditiva", title: "Proteção auditiva", items: "Plugs de inserção e abafadores tipo concha" },
  { id: "respiratoria", title: "Proteção respiratória", items: "PFF2, respiradores semifaciais e filtros" },
  { id: "maos", title: "Luvas e mangotes", items: "Vaqueta, nitrílica, anticorte, látex e descartáveis" },
  { id: "pes", title: "Calçados", items: "Botinas de couro e nobuck, botas de PVC e perneiras" },
  { id: "vestimentas", title: "Vestimentas e uniformes", items: "Fardamento, antichama, capas de chuva e conjuntos para aplicação" },
  { id: "sinalizacao", title: "Sinalização, bloqueio e incêndio", items: "Placas, cones, coletes refletivos, cadeados e extintores" },
  { id: "ferramentas", title: "Ferramentas manuais", items: "Chaves, alicates, martelos, trenas e jogos de bits" },
  { id: "eletricas", title: "Ferramentas elétricas", items: "Furadeiras, esmerilhadeiras, discos, brocas e lixas" },
  { id: "construcao", title: "Construção, elétrica e hidráulica", items: "Material elétrico, conexões, parafusos, fitas e lonas" },
  { id: "amarracao", title: "Amarração, elevação e escadas", items: "Cintas e catracas de carga, cordas e escadas" },
  { id: "limpeza", title: "Higiene e limpeza", items: "Lixeiras, vassouras, rodos, papel e dispensers" },
  { id: "utilidades", title: "Campo, camping e utilidades", items: "Garrafas e caixas térmicas, lanternas, jardinagem e pulverizadores" },
] as const;

export const CATALOG = {
  total: catalogoResumo.total,
  brands: catalogoResumo.marcas,
  byCategory: catalogoResumo.porCategoria as Record<string, number>,
  /** "7 mil", arredondado para baixo, para textos corridos. */
  totalRounded: `${Math.floor(catalogoResumo.total / 1000)} mil`,
  /** "180", arredondado para baixo à dezena. */
  brandsRounded: Math.floor(catalogoResumo.marcas / 10) * 10,
};

export function catalogHref(categoryId?: string) {
  return categoryId ? `/catalogo?categoria=${categoryId}` : "/catalogo";
}

export type Sector = {
  slug: string;
  norms: string;
  title: string;
  short: string;
  heading: string;
  intro: string;
  context: string[];
  normsDetail: { code: string; name: string; text: string }[];
  products: { norm: string; name: string; note: string }[];
  kits: { role: string; items: string }[];
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
};

export const SECTORS: Sector[] = [
  {
    slug: "eolica",
    norms: "NR-35 · NR-10",
    title: "Energia eólica e transmissão",
    short:
      "Cinturões paraquedista, talabartes com absorvedor, trava-quedas, capacetes com jugular, vestimentas antichama e luvas isolantes para montagem e O&M.",
    heading: "EPI para energia eólica e transmissão.",
    intro:
      "Equipamentos para montagem, operação e manutenção de aerogeradores, subestações e linhas de transmissão no Centro-Norte baiano.",
    context: [
      "Há complexos em operação em vários municípios e novos parques a caminho, inclusive em Jacobina, que também voltou a ter fábrica de torres. São equipes trabalhando em altura e perto de energia todos os dias.",
      "Mantemos em estoque os itens que mais giram nessas operações e montamos kits por função para empreiteiras e prestadoras de O&M.",
    ],
    normsDetail: [
      { code: "NR-35", name: "Trabalho em altura", text: "Subida em torre, acesso à nacele, trabalho em pás e em estruturas de linha." },
      { code: "NR-10", name: "Eletricidade", text: "Painéis do aerogerador, subestações e manobras com risco de arco elétrico." },
      { code: "NR-33", name: "Espaço confinado", text: "Interior de pás, hub e fundações, com monitoramento de atmosfera." },
      { code: "NR-6", name: "EPI e CA", text: "Todo item com Certificado de Aprovação válido e ficha de entrega." },
    ],
    products: [
      { norm: "NR-35", name: "Cinturão paraquedista com 4 pontos de ancoragem", note: "Fivelas de engate rápido e almofada lombar." },
      { norm: "NR-35", name: "Talabarte duplo em Y com absorvedor de energia", note: "Conectores de grande abertura para estruturas." },
      { norm: "NR-35", name: "Trava-quedas para linha de vida rígida", note: "Compatível com escadas de torre." },
      { norm: "NR-10", name: "Vestimenta antichama", note: "Informe o ATPV exigido na análise de risco." },
      { norm: "NR-10", name: "Luva isolante de borracha com cobertura", note: "Por classe de tensão." },
      { norm: "NR-35", name: "Capacete de escalada com jugular", note: "Aba curta para trabalho em espaço reduzido." },
    ],
    kits: [
      { role: "Técnico de aerogerador", items: "Cinturão, talabarte duplo, trava-quedas, capacete com jugular, vestimenta antichama, luvas e botina." },
      { role: "Eletricista de subestação", items: "Vestimenta antichama, protetor facial, luvas isolantes por classe, calçado dielétrico." },
      { role: "Montador de torre", items: "Proteção contra quedas, luvas anticorte, óculos, protetor auditivo e alta visibilidade." },
    ],
    image: "/setores/eolica.jpg",
    imageAlt: "Aerogerador no alto de um morro de vegetação seca",
    imagePosition: "50% 40%",
  },
  {
    slug: "mineracao",
    norms: "NR-22",
    title: "Mineração",
    short:
      "Respiradores PFF2 e PFF3, semifaciais, protetores auditivos, botinas com biqueira e vestimentas de alta visibilidade para subsolo e superfície.",
    heading: "EPI para mineração, no subsolo e na superfície.",
    intro:
      "Proteção respiratória, auditiva e de alta visibilidade para as frentes de lavra, beneficiamento e manutenção da região de Jacobina.",
    context: [
      "Jacobina convive com a mineração há décadas, com operações subterrâneas ativas e investimentos em infraestrutura. A NR-22 foi atualizada e passou a exigir atenção maior à exposição a poeira mineral.",
      "Trabalhamos com respiradores, filtros e protetores certificados e ajudamos a montar a lista por função e por área de risco.",
    ],
    normsDetail: [
      { code: "NR-22", name: "Mineração", text: "Segurança e saúde ocupacional em lavra subterrânea e a céu aberto." },
      { code: "NR-15", name: "Insalubridade", text: "Ruído, poeira e agentes químicos com limites de exposição." },
      { code: "NR-35", name: "Trabalho em altura", text: "Manutenção de correias, silos e estruturas de beneficiamento." },
      { code: "NR-6", name: "EPI e CA", text: "Todo item com Certificado de Aprovação válido e ficha de entrega." },
    ],
    products: [
      { norm: "NR-22", name: "Respirador PFF2 com válvula", note: "Para poeiras e névoas." },
      { norm: "NR-22", name: "Semifacial com filtros", note: "Filtros mecânicos e químicos conforme o risco." },
      { norm: "NR-15", name: "Protetor auditivo tipo concha", note: "Acoplável ao capacete." },
      { norm: "NR-22", name: "Botina com biqueira", note: "Solado resistente a óleo e abrasão." },
      { norm: "NR-22", name: "Colete e vestimenta de alta visibilidade", note: "Faixas refletivas para áreas com tráfego." },
      { norm: "NR-6", name: "Óculos de proteção ampla visão", note: "Antiembaçante para ambientes úmidos." },
    ],
    kits: [
      { role: "Operador de mina", items: "Capacete, protetor auditivo, respirador PFF2, óculos, luvas, botina e alta visibilidade." },
      { role: "Mecânico de manutenção", items: "Luvas anticorte, óculos, protetor facial, auditivo e proteção contra quedas." },
      { role: "Operador de beneficiamento", items: "Semifacial com filtros, protetor auditivo, luvas nitrílicas e botina." },
    ],
    image: "/setores/mineracao.jpg",
    imageAlt: "Operador com uniforme de alta visibilidade e capacete com lanterna caminhando ao lado de uma carregadeira em galeria subterrânea",
    imagePosition: "40% 50%",
  },
  {
    slug: "construcao",
    norms: "NR-18",
    title: "Construção e indústria",
    short:
      "Capacetes, óculos, luvas de vaqueta e anticorte, proteção para solda, EPC para canteiro e ferramentas para obras e fábricas.",
    heading: "EPI, EPC e ferramentas para obras e indústrias.",
    intro:
      "Tudo o que o canteiro e a planta industrial precisam: proteção individual, sinalização coletiva e ferramentas de marcas que aguentam o ritmo.",
    context: [
      "Atendemos construtoras, empreiteiras e indústrias da região com estoque próprio, sem depender de transferência.",
      "Da integração do novo colaborador à reposição mensal, montamos o pedido por função e entregamos com a documentação para auditoria.",
    ],
    normsDetail: [
      { code: "NR-18", name: "Construção", text: "Condições de segurança em canteiros, demolição e reformas." },
      { code: "NR-12", name: "Máquinas", text: "Proteção em operação de máquinas e ferramentas." },
      { code: "NR-35", name: "Trabalho em altura", text: "Andaimes, telhados e estruturas metálicas." },
      { code: "NR-6", name: "EPI e CA", text: "Todo item com Certificado de Aprovação válido e ficha de entrega." },
    ],
    products: [
      { norm: "NR-18", name: "Capacete com carneira e jugular", note: "Várias cores para identificação de função." },
      { norm: "NR-6", name: "Luva de vaqueta", note: "Para manuseio de materiais." },
      { norm: "NR-12", name: "Luva anticorte", note: "Para chapas, vidros e lâminas." },
      { norm: "NR-6", name: "Máscara de solda", note: "Escurecimento automático ou fixo." },
      { norm: "NR-18", name: "Cones, fitas e placas", note: "Sinalização e isolamento de área." },
      { norm: "Ferramentas", name: "Ferramentas elétricas e manuais", note: "Furadeiras, esmerilhadeiras, serras e chaves." },
    ],
    kits: [
      { role: "Pedreiro / servente", items: "Capacete, óculos, luva de vaqueta, protetor auditivo, botina e fardamento." },
      { role: "Soldador", items: "Máscara de solda, avental e mangote de raspa, luvas de cano longo, botina." },
      { role: "Armador / montador", items: "Proteção contra quedas, luvas anticorte, óculos e capacete com jugular." },
    ],
    image: "/setores/construcao.jpg",
    imageAlt: "Trabalhador com capacete, capa refletiva e luvas fixando peça em cobertura metálica",
    imagePosition: "50% 30%",
  },
  {
    slug: "agro",
    norms: "NR-31",
    title: "Agro",
    short:
      "Vestimentas para aplicação de defensivos, luvas nitrílicas, respiradores com filtro químico e proteção solar para o trabalho no campo.",
    heading: "EPI para o trabalho no campo.",
    intro:
      "Proteção para aplicação de defensivos, manejo e operação de máquinas agrícolas, pensada para o sol e o calor do sertão.",
    context: [
      "Produtores rurais de toda a região encontram nas nossas lojas os itens exigidos pela NR-31, com orientação sobre o uso correto.",
      "Para fazendas e cooperativas, montamos kits por atividade e combinamos a reposição ao longo da safra.",
    ],
    normsDetail: [
      { code: "NR-31", name: "Trabalho rural", text: "Segurança na agricultura, pecuária e exploração florestal." },
      { code: "NR-6", name: "EPI e CA", text: "Todo item com Certificado de Aprovação válido e ficha de entrega." },
      { code: "NR-15", name: "Agentes químicos", text: "Exposição a defensivos e limites de tolerância." },
      { code: "NR-12", name: "Máquinas", text: "Operação de tratores, roçadeiras e implementos." },
    ],
    products: [
      { norm: "NR-31", name: "Vestimenta para aplicação de defensivos", note: "Calça, jaleco, boné árabe e avental." },
      { norm: "NR-31", name: "Luva nitrílica", note: "Resistente a produtos químicos." },
      { norm: "NR-31", name: "Respirador com filtro químico", note: "Para vapores orgânicos." },
      { norm: "NR-31", name: "Bota de PVC", note: "Cano longo, impermeável." },
      { norm: "NR-12", name: "Protetor facial e auditivo", note: "Para roçadeiras e motosserras." },
      { norm: "NR-31", name: "Proteção solar", note: "Chapéus, mangas e vestimentas com proteção UV." },
    ],
    kits: [
      { role: "Aplicador de defensivos", items: "Vestimenta completa, respirador com filtro, luvas nitrílicas, viseira e bota de PVC." },
      { role: "Operador de roçadeira", items: "Protetor facial, auditivo, perneira, luvas e botina." },
      { role: "Trabalhador de campo", items: "Chapéu com proteção, mangas UV, luvas, óculos e botina." },
    ],
    image: "/setores/agro.jpg",
    imageAlt: "Trabalhador de macacão com faixas refletivas e luvas cuidando de canteiro de hortaliças",
    imagePosition: "42% 50%",
  },
];

export function getSector(slug: string) {
  return SECTORS.find((s) => s.slug === slug);
}

export const REGIONS = {
  jacobina: ["Jacobina", "Várzea Nova", "Ourolândia · Umburanas", "Miguel Calmon · Capim Grosso", "Campo Formoso"],
  irece: ["Irecê", "Morro do Chapéu", "Ibipeba · Uibaí", "Brotas de Macaúbas", "Lapão · Central"],
};
