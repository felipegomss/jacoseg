import Image from "next/image";
import Link from "next/link";
import { Arrow, ButtonLink, Container, Eyebrow, SectionTitle } from "@/components/site/primitives";
import { RegionMap, WindRidge } from "@/components/site/illustrations";
import QuoteForm from "@/components/site/quote-form";
import { BRANDS, CATEGORIES, HOURS, REGIONS, SECTORS, STORES, whatsappLink } from "@/lib/site-data";

const FACTS = [
  { value: "2 lojas", label: "Jacobina e Irecê, nas duas pontas da Chapada" },
  { value: "CA válido", label: "Cada item com Certificado de Aprovação do MTE" },
  { value: "NR 10 · 22 · 35", label: "Linhas organizadas pela norma que você precisa cumprir" },
  { value: "+1.000 itens", label: "Em estoque próprio, com pronta entrega" },
];

const STEPS = [
  { title: "Envie a lista da equipe", text: "Funções, quantidades e tamanhos — por WhatsApp, e-mail ou planilha." },
  { title: "Receba o orçamento com CA de cada item", text: "Número do certificado e validade conferidos antes do envio." },
  { title: "Faturamento para CNPJ", text: "Nota fiscal e documentação pronta para auditorias e fiscalização." },
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
      <section className="bg-ink text-bone">
        <Container className="flex flex-wrap items-end gap-12 pt-16 sm:pt-24">
          <div className="min-w-0 flex-[1_1_560px] pb-4 sm:pb-[72px]">
            <Eyebrow tone="dark" className="mb-6 sm:mb-7">
              EPI certificado · Jacobina e Irecê · desde 2009
            </Eyebrow>
            <h1 className="font-display mb-6 max-w-[720px] text-[40px] leading-[1.05] font-semibold tracking-[-0.02em] text-balance sm:mb-7 sm:text-[64px] sm:leading-[1.04]">
              Proteção certificada para quem trabalha em altura, em campo e no subsolo.
            </h1>
            <p className="mb-10 max-w-[560px] text-lg leading-relaxed text-mist sm:text-[19px]">
              EPI, EPC e ferramentas para parques eólicos, mineração, construção e agro no Centro-Norte baiano — com
              duas lojas e estoque perto da sua operação.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={whatsappLink(matriz.whatsapp, "Olá, JacoSeg! Gostaria de um orçamento.")}>
                Pedir orçamento pelo WhatsApp <Arrow />
              </ButtonLink>
              <ButtonLink href="/#produtos" variant="outline-dark">
                Ver linhas de produto
              </ButtonLink>
            </div>
          </div>
          <figure className="m-0 min-w-0 flex-[1_1_440px]">
            <WindRidge className="block h-auto w-full" />
            <figcaption className="font-tech pt-3 text-xs tracking-[0.04em] text-[#8c897e]">
              CHAPADA DIAMANTINA · 11°10′S 40°31′O
            </figcaption>
          </figure>
        </Container>
        <div className="mt-10 border-t border-ink-line sm:mt-0">
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
        <Container className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-10 lg:justify-between">
          {BRANDS.map((b) => (
            <Image
              key={b.alt}
              src={b.src}
              alt={b.alt}
              width={b.w}
              height={b.h}
              className="h-auto max-h-12 w-auto opacity-60 mix-blend-multiply grayscale transition-opacity hover:opacity-100"
            />
          ))}
        </Container>
      </section>

      {/* Setores */}
      <section id="setores" className="scroll-mt-24">
        <Container className="py-20 sm:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
            <div className="max-w-[640px]">
              <Eyebrow className="mb-4">01 — Setores</Eyebrow>
              <SectionTitle>Equipamento certo para cada tipo de risco da região.</SectionTitle>
            </div>
            <p className="max-w-[400px] text-graphite">
              Da torre do aerogerador à galeria da mina, cada operação tem exigências próprias. Organizamos nosso
              estoque a partir delas.
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
              <Eyebrow className="mb-4">02 — Linhas de produto</Eyebrow>
              <SectionTitle>EPI, EPC e ferramentas, da cabeça aos pés.</SectionTitle>
            </div>
            <p className="max-w-[400px] text-graphite">
              Escolha uma linha para consultar disponibilidade e preço direto com a loja.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c, i) => (
              <a
                key={c.title}
                href={whatsappLink(matriz.whatsapp, `Olá, JacoSeg! Quero consultar produtos de ${c.title.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[168px] flex-col gap-2.5 border border-line bg-paper p-6 transition-colors hover:border-ink"
              >
                <span className="font-tech text-xs text-graphite">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-semibold">{c.title}</span>
                <span className="flex-grow text-sm text-graphite">{c.items}</span>
                <span className="text-sm font-semibold">
                  Consultar <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Empresas */}
      <section id="empresas" className="scroll-mt-24">
        <Container className="flex flex-wrap gap-16 py-20 sm:py-28">
          <div className="min-w-0 flex-[1_1_480px]">
            <Eyebrow className="mb-4">03 — Para empresas</Eyebrow>
            <SectionTitle className="mb-6">Sua equipe equipada, sem retrabalho na compra.</SectionTitle>
            <p className="mb-12 max-w-[520px] text-graphite">
              Atendemos empreiteiras, prestadoras de O&amp;M, construtoras e departamentos de SST com orçamento por
              função, conferência de CA e reposição programada.
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
                  <span className="font-tech shrink-0 text-xs text-fog">CA válido</span>
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
            <Eyebrow className="mb-4">04 — Região</Eyebrow>
            <SectionTitle className="mb-6">Duas lojas, uma em cada ponta da Chapada.</SectionTitle>
            <p className="mb-8 max-w-[480px] text-graphite">
              Jacobina fica perto da mina e dos complexos de Várzea Nova e Ourolândia. Irecê atende o oeste, onde estão
              os parques de Ibipeba, Uibaí e Brotas de Macaúbas. Quando falta um item em campo, a reposição sai da loja
              mais próxima.
            </p>
            <div className="grid gap-6 text-[15px] sm:grid-cols-2">
              {STORES.map((s) => (
                <div key={s.id}>
                  <p className="font-tech mb-2 text-xs tracking-[0.06em] uppercase">
                    {s.label} · {s.city}
                  </p>
                  <ul>
                    {REGIONS[s.id].map((r) => (
                      <li key={r} className="border-t border-[#cfcac0] py-2">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <figure className="m-0 min-w-0 flex-[1_1_480px] border border-line bg-paper p-6">
            <RegionMap className="block h-auto w-full" />
            <figcaption className="font-tech pt-3 text-xs text-graphite">ESQUEMÁTICO · FORA DE ESCALA</figcaption>
          </figure>
        </Container>
      </section>

      {/* Sobre */}
      <section id="sobre" className="scroll-mt-24">
        <Container className="flex flex-wrap items-stretch gap-16 py-20 sm:py-28">
          <div className="min-w-0 flex-[1_1_520px] self-center">
            <video
              src="/jacoseg.mp4"
              controls
              poster="/thumb.jpg"
              preload="none"
              className="aspect-video w-full bg-ink object-cover"
            >
              <track label="Português" kind="subtitles" srcLang="pt" src="/legenda.vtt" default />
            </video>
          </div>
          <div className="flex min-w-0 flex-[1_1_440px] flex-col justify-center">
            <Eyebrow className="mb-4">05 — Sobre</Eyebrow>
            <SectionTitle className="mb-6">Lojas da região, com padrão de fornecedor industrial.</SectionTitle>
            <p className="mb-4 text-graphite">
              A JacoSeg nasceu em 2009, em Jacobina, com uma missão direta: ninguém deveria perder tempo procurando EPI.
              Acompanhamos a chegada dos parques eólicos e o crescimento da mineração na região, e abrimos a filial de
              Irecê para atender o oeste da Chapada.
            </p>
            <p className="mb-8 text-graphite">
              Trabalhamos com produtos de fabricantes registrados e com Certificado de Aprovação válido. Nossa equipe
              conhece as NRs, ajuda na escolha e entrega a documentação pronta para auditorias e fiscalização.
            </p>
            <div className="flex items-start gap-4 border-t border-line pt-6">
              <span aria-hidden="true" className="mt-1.5 inline-block size-3 shrink-0 bg-safety" />
              <p className="text-[15px]">
                <strong className="font-semibold">Destaque Empresarial 2023.</strong>{" "}
                <span className="text-graphite">Reconhecimento ao trabalho da JacoSeg no comércio regional.</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contato */}
      <section id="contato" className="scroll-mt-24 bg-ink text-bone">
        <Container className="flex flex-wrap gap-16 py-20 sm:py-28">
          <div className="min-w-0 flex-[1_1_420px]">
            <Eyebrow tone="dark" className="mb-4">
              06 — Contato
            </Eyebrow>
            <SectionTitle className="mb-6">Peça seu orçamento.</SectionTitle>
            <p className="mb-10 max-w-[440px] text-mist">
              Respondemos pelo WhatsApp de segunda a sexta, das 8h às 18h, e aos sábados até 12h30. Para equipes,
              envie funções, quantidades e tamanhos.
            </p>
            <dl className="grid gap-8 text-[15px] sm:grid-cols-2">
              {STORES.map((s) => (
                <div key={s.id}>
                  <dt className="font-tech mb-2 text-xs tracking-[0.06em] text-fog uppercase">
                    {s.label} · {s.city}
                  </dt>
                  <dd className="leading-relaxed">
                    {s.street}, {s.district}
                    <br />
                    {s.city} — BA, {s.cep}
                    <br />
                    <a href={s.phoneHref} className="text-bone underline-offset-4 hover:text-safety hover:underline">
                      {s.phoneDisplay}
                    </a>
                    <br />
                    <a href={`mailto:${s.email}`} className="text-mist hover:text-bone">
                      {s.email}
                    </a>
                    <br />
                    <a
                      href={s.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-tech mt-2 inline-block text-xs tracking-[0.04em] text-safety"
                    >
                      VER NO MAPA →
                    </a>
                  </dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="font-tech mb-2 text-xs tracking-[0.06em] text-fog uppercase">Horário</dt>
                <dd className="flex flex-wrap gap-x-8 gap-y-1">
                  {HOURS.map((h) => (
                    <span key={h.days}>
                      {h.days}: <span className="text-mist">{h.time}</span>
                    </span>
                  ))}
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
