import Image from "next/image";
import Link from "next/link";
import { Arrow, ButtonLink, Container, Eyebrow, SectionTitle } from "@/components/site/primitives";
import StoresMap from "@/components/site/stores-map";
import QuoteForm from "@/components/site/quote-form";
import { BRANDS, CATALOG, CATEGORIES, COMPANY, SECTORS, STORES, catalogHref, whatsappLink } from "@/lib/site-data";
import { GUIAS } from "@/lib/guias";

const FACTS = [
  { value: "2 lojas", label: "Matriz em Jacobina e filial em Irecê" },
  { value: "CA válido", label: "Todo item com Certificado de Aprovação do Ministério do Trabalho" },
  { value: "Por norma", label: "Produtos organizados pela NR que a sua equipe precisa cumprir" },
  { value: `+${CATALOG.totalRounded} itens`, label: `De mais de ${CATALOG.brandsRounded} marcas, para buscar no catálogo` },
];

const STEPS = [
  { title: "Envie a lista da equipe", text: "Mande funções, quantidades e tamanhos pelo WhatsApp, por e-mail ou em planilha." },
  { title: "Receba o orçamento com CA de cada item", text: "Número do certificado e validade conferidos antes do envio." },
  { title: "Faturamento para CNPJ", text: "Nota fiscal e condições para compras recorrentes." },
  { title: "Reposição programada", text: "Combinamos a frequência para que nada falte na frente de trabalho." },
];

const KIT = [
  "Cinturão paraquedista com 4 pontos",
  "Talabarte duplo com absorvedor",
  "Trava-quedas para linha rígida",
  "Capacete de escalada com jugular",
  "Vestimenta antichama",
  "Luva isolante + cobertura de vaqueta",
];

const KIT_MSG = `Olá, JacoSeg! Quero orçar o kit de técnico de aerogerador:\n\n${KIT.map((i) => `• ${i}`).join("\n")}\n\nQuantidade de técnicos: `;

export default function Home() {
  const matriz = STORES[0];
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black text-bone">
        <Image
          src="/hero/capacete-desktop.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-right md:block"
        />
        <Image
          src="/hero/capacete-mobile.jpg"
          alt=""
          width={1200}
          height={1500}
          priority
          sizes="100vw"
          className="absolute right-0 bottom-0 left-0 h-auto w-full md:hidden"
        />
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/70 to-transparent md:block" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <Container className="relative flex min-h-[calc(100svh-77px)] flex-col pt-14 pb-[88vw] md:min-h-[680px] md:justify-center md:py-28 lg:min-h-[760px]">
          <div className="max-w-[640px]">
            <Eyebrow tone="dark" className="mb-6 sm:mb-7">
              EPI certificado · Jacobina e Irecê · desde 2009
            </Eyebrow>
            <h1 className="font-display mb-6 text-[40px] leading-[1.05] font-semibold tracking-[-0.02em] text-balance sm:mb-7 sm:text-[64px] sm:leading-[1.02] lg:text-[72px]">
              Proteção certificada para quem trabalha em altura, em campo e no subsolo.
            </h1>
            <p className="mb-10 max-w-[520px] text-lg leading-relaxed text-mist sm:text-[19px]">
              EPI, ferramentas e material de obra para parques eólicos, mineração, construção, indústria e campo. São
              mais de {CATALOG.totalRounded} itens de {CATALOG.brandsRounded} marcas, em duas lojas no Centro-Norte baiano.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={whatsappLink(matriz.whatsapp, "Olá, JacoSeg! Gostaria de um orçamento.")}>
                Pedir orçamento pelo WhatsApp <Arrow />
              </ButtonLink>
              <ButtonLink href="/catalogo" variant="outline-dark" className="bg-black/30 backdrop-blur-sm">
                Explorar o catálogo
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Diferenciais" className="bg-ink text-bone">
        <div className="border-t border-ink-line">
          <Container className="grid grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f, i) => (
              <div
                key={f.value}
                className={[
                  "py-6 pr-4 sm:py-8",
                  i % 2 === 1 ? "border-l border-ink-line pl-4 sm:pl-6" : "",
                  i >= 2 ? "border-t border-ink-line lg:border-t-0" : "",
                  i === 2 ? "lg:border-l lg:pl-6" : "",
                ].join(" ")}
              >
                <p className="font-display mb-1.5 text-xl font-semibold sm:text-[28px]">{f.value}</p>
                <p className="text-[13px] leading-snug text-fog sm:text-sm">{f.label}</p>
              </div>
            ))}
          </Container>
        </div>
      </section>

      {/* Marcas */}
      <section aria-label="Marcas com que trabalhamos" className="border-b border-line bg-paper">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-10 lg:flex-nowrap lg:justify-between lg:gap-x-6">
          {BRANDS.map((b) => (
            <Image
              key={b.alt}
              src={b.src}
              alt={b.alt}
              width={b.w}
              height={b.h}
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          ))}
        </Container>
      </section>

      {/* Setores */}
      <section id="setores" className="scroll-mt-24">
        <Container className="py-20 sm:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
            <div className="max-w-[640px]">
              <Eyebrow className="mb-4">01 · Setores</Eyebrow>
              <SectionTitle>Equipamento certo para cada tipo de risco da região.</SectionTitle>
            </div>
            <p className="max-w-[400px] text-graphite">
              Da torre do aerogerador à galeria da mina, cada operação tem suas exigências. Estes são os setores que mais
              atendemos, mas equipamos comércio, serviços, logística, saúde e qualquer atividade que exija proteção.
            </p>
          </div>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((s) => (
              <Link
                key={s.slug}
                href={`/setores/${s.slug}`}
                className="group flex min-h-[300px] flex-col gap-4 bg-white p-8 transition-colors hover:bg-paper sm:min-h-[340px]"
              >
                <span className="font-tech text-xs tracking-[0.06em] text-graphite">{s.norms}</span>
                <span className="font-display text-[26px] leading-tight font-semibold">{s.title}</span>
                <span className="flex-grow text-[15px] text-graphite">{s.short}</span>
                <span className="text-[15px] font-semibold">
                  Ver linha completa <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Produtos */}
      <section id="produtos" className="scroll-mt-24 bg-stone">
        <Container className="py-20 sm:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[640px]">
              <Eyebrow className="mb-4">02 · Linhas de produto</Eyebrow>
              <SectionTitle>Da proteção individual à ferramenta da obra.</SectionTitle>
            </div>
            <p className="max-w-[400px] text-graphite">
              São {CATEGORIES.length} linhas no catálogo. Escolha uma, monte sua lista e a loja responde com preço e
              disponibilidade.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((c, i) => (
              <Link
                key={c.id}
                href={catalogHref(c.id)}
                className="group flex min-h-[168px] flex-col gap-2.5 border border-line bg-paper p-6 transition-colors hover:border-ink"
              >
                <span className="font-tech flex justify-between gap-3 text-xs text-graphite">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{(CATALOG.byCategory[c.id] ?? 0).toLocaleString("pt-BR")} itens</span>
                </span>
                <span className="font-display text-xl leading-tight font-semibold">{c.title}</span>
                <span className="flex-grow text-sm text-graphite">{c.items}</span>
                <span className="text-sm font-semibold">
                  Ver no catálogo <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
            <Link
              href="/catalogo"
              className="group flex min-h-[168px] flex-col gap-2.5 border border-ink bg-ink p-6 text-bone transition-colors hover:bg-[#2a2924]"
            >
              <span className="font-tech text-xs text-fog">
                {CATALOG.total.toLocaleString("pt-BR")} ITENS · {CATALOG.brands} MARCAS
              </span>
              <span className="font-display text-xl font-semibold">Catálogo completo</span>
              <span className="flex-grow text-sm text-mist">Busque por nome, marca, código ou CA. Não achou? A loja encomenda.</span>
              <span className="text-sm font-semibold text-safety">
                Abrir o catálogo <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Empresas */}
      <section id="empresas" className="scroll-mt-24">
        <Container className="flex flex-wrap gap-16 py-20 sm:py-28">
          <div className="min-w-0 flex-[1_1_480px]">
            <Eyebrow className="mb-4">03 · Para empresas</Eyebrow>
            <SectionTitle className="mb-6">Sua equipe equipada, sem retrabalho na compra.</SectionTitle>
            <p className="mb-12 max-w-[520px] text-graphite">
              De pequenas empreiteiras a departamentos de SST de grandes operações, montamos o orçamento por função e
              programamos a reposição.
            </p>
            <ol className="flex flex-col">
              {STEPS.map((s, i) => (
                <li key={s.title} className={`flex gap-6 border-t border-line py-6 ${i === STEPS.length - 1 ? "border-b" : ""}`}>
                  <span className="font-tech pt-1 text-[13px] text-graphite">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <strong className="font-display mb-1 block text-[19px] font-semibold">{s.title}</strong>
                    <span className="text-[15px] text-graphite">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="min-w-0 flex-[1_1_400px] self-start bg-ink p-8 text-bone sm:p-10">
            <Eyebrow tone="dark" className="mb-3">
              Exemplo de kit
            </Eyebrow>
            <h3 className="font-display mb-2 text-[28px] leading-tight font-semibold">Técnico de aerogerador</h3>
            <p className="mb-7 text-sm text-fog">
              Composição de referência para NR-35 e NR-10. Ajustamos conforme o PGR da sua empresa.
            </p>
            <ul className="mb-8 text-[15px]">
              {KIT.map((item, i) => (
                <li
                  key={item}
                  className={`flex justify-between gap-4 border-t border-ink-line py-3 ${i === KIT.length - 1 ? "border-b" : ""}`}
                >
                  <span>{item}</span>
                  <span className="font-tech shrink-0 text-xs text-fog">CA ·····</span>
                </li>
              ))}
            </ul>
            <ButtonLink href={whatsappLink(matriz.whatsapp, KIT_MSG)} className="min-h-12 px-5">
              Orçar este kit <Arrow />
            </ButtonLink>
          </aside>
        </Container>
      </section>

      {/* Região */}
      <section className="bg-stone">
        <Container className="flex flex-wrap items-center gap-16 py-20 sm:py-28">
          <div className="min-w-0 flex-[1_1_420px]">
            <Eyebrow className="mb-4">04 · Região</Eyebrow>
            <SectionTitle className="mb-6">Duas lojas, uma em cada ponta da Chapada.</SectionTitle>
            <p className="mb-8 max-w-[480px] text-graphite">
              De Jacobina e de Irecê, atendemos toda a Chapada e o Centro-Norte baiano: minas, parques eólicos, obras,
              fábricas e propriedades rurais. Quando falta um item em campo, a reposição sai da loja mais perto de você.
            </p>
            <div className="flex max-w-[480px] flex-col items-start gap-4 border-t border-[#cfcac0] pt-5 text-[15px]">
              <p>
                Clique em uma loja no mapa para ver de perto. Está em outra cidade? Fale com a gente e confirmamos o prazo
                de entrega.
              </p>
              <ButtonLink
                href={whatsappLink(matriz.whatsapp, "Olá, JacoSeg! Vocês entregam na minha cidade? Cidade: ")}
                variant="text"
              >
                Consultar entrega na minha cidade →
              </ButtonLink>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_480px]">
            <StoresMap />
          </div>
        </Container>
      </section>

      {/* Sobre */}
      <section id="sobre" className="scroll-mt-24">
        <Container className="flex flex-wrap items-stretch gap-16 py-20 sm:py-28">
          <div className="w-full min-w-0 flex-[1_1_520px] self-center">
            <video
              src="/jacoseg.mp4"
              controls
              poster="/thumb.jpg"
              preload="none"
              className="aspect-video w-full max-w-full bg-ink object-cover"
            >
              <track label="Português" kind="subtitles" srcLang="pt" src="/legenda.vtt" default />
            </video>
          </div>
          <div className="flex min-w-0 flex-[1_1_440px] flex-col justify-center">
            <Eyebrow className="mb-4">05 · Sobre</Eyebrow>
            <SectionTitle className="mb-6">Lojas da região, com padrão de fornecedor industrial.</SectionTitle>
            <p className="mb-4 text-graphite">
              A JacoSeg nasceu em julho de 2009 para atender pessoas e empresas que precisam de equipamento de proteção
              confiável. Desde então acompanhamos a chegada dos parques eólicos e o crescimento da mineração na região, e
              abrimos a filial de Irecê para atender o oeste da Chapada.
            </p>
            <p className="text-graphite">
              Só vendemos produtos de fabricantes registrados e com Certificado de Aprovação válido. Nossa equipe conhece
              as NRs, ajuda na escolha e entrega a documentação pronta para auditorias e fiscalização.
            </p>
            <p className="mt-4 text-graphite">
              Desde 2011, somos premiados todos os anos no Destaque Empresarial. O vídeo é da cerimônia de 2023.
            </p>
          </div>
        </Container>
      </section>

      {/* Guias */}
      <section className="border-t border-line">
        <Container className="pt-20 pb-24 sm:pt-24 sm:pb-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-4">06 · Guias técnicos</Eyebrow>
              <SectionTitle className="sm:text-[36px]">Normas explicadas sem rodeio.</SectionTitle>
            </div>
            <ButtonLink href="/guias" variant="text">
              Todos os guias
            </ButtonLink>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {GUIAS.map((g) => (
              <Link key={g.slug} href={`/guias/${g.slug}`} className="group flex flex-col gap-3 border-t-2 border-ink pt-6">
                <span className="font-tech text-xs text-graphite">
                  {g.norma} · {g.minutos} MIN
                </span>
                <span className="font-display text-[22px] leading-[1.3] font-semibold">{g.titulo}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Contato */}
      <section id="contato" className="scroll-mt-24 bg-ink text-bone">
        <Container className="flex flex-wrap gap-16 py-20 sm:py-28">
          <div className="min-w-0 flex-[1_1_420px]">
            <Eyebrow tone="dark" className="mb-4">
              07 · Contato
            </Eyebrow>
            <SectionTitle className="mb-6">Peça seu orçamento.</SectionTitle>
            <p className="mb-10 max-w-[440px] text-mist">
              Respondemos pelo WhatsApp de segunda a sexta, das 8h às 18h, e aos sábados até 12h30.
            </p>
            <ButtonLink href={whatsappLink(matriz.whatsapp, "Olá, JacoSeg! Gostaria de um orçamento.")} className="mb-12">
              Conversar no WhatsApp <Arrow />
            </ButtonLink>
            <dl className="grid gap-8 text-[15px] sm:grid-cols-2">
              {STORES.map((s) => (
                <div key={s.id}>
                  <dt className="font-tech mb-2 text-xs tracking-[0.06em] text-fog uppercase">
                    {s.label} · {s.city}
                  </dt>
                  <dd className="leading-relaxed">
                    {s.street}, {s.district}
                    <br />
                    {s.city}, BA · CEP {s.cep}
                    <br />
                    <a href={s.phoneHref} className="text-bone underline-offset-4 hover:text-safety hover:underline">
                      {s.phoneDisplay}
                    </a>
                    <br />
                    <a href={`mailto:${s.email}`} className="text-mist hover:text-bone">
                      {s.email}
                    </a>
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-tech mb-2 text-xs tracking-[0.06em] text-fog uppercase">Redes</dt>
                <dd>
                  <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-safety">
                    Instagram
                  </a>{" "}
                  ·{" "}
                  <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-safety">
                    Facebook
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="min-w-0 flex-[1_1_480px]">
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
