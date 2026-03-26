import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-24 md:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-amber-600">
            Quem Somos
          </span>
          <h2
            id="about-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Proteção, Inovação e Excelência
          </h2>
        </div>

        {/* Video */}
        <div className="mb-16 overflow-hidden rounded-2xl border shadow-sm">
          <video
            src="/jacoseg.mp4"
            controls
            poster="/thumb.jpg"
            className="aspect-video w-full cursor-pointer bg-black"
            preload="metadata"
          >
            <track label="Português" kind="subtitles" srcLang="pt" src="/legenda.vtt" default />
            Seu navegador não suporta vídeos.
          </video>
        </div>

        {/* Content grid */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed text-foreground/80">
              Desde nossa fundação em julho de 2009, na JacoSeg, nossa missão é
              atender às necessidades de clientes individuais e empresariais no
              setor de equipamentos de proteção ao trabalhador e ferramentas.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Com parcerias estratégicas com fabricantes renomados em todo o
              país, oferecemos o melhor em EPIs, EPCs e ferramentas de alta
              qualidade, garantindo conformidade com as normas nacionais e
              internacionais.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Nossa dedicação à excelência nos permite fornecer soluções
              confiáveis para proteger os trabalhadores e atender a diversas
              necessidades. Com um amplo estoque de itens variados, respondemos
              rapidamente às demandas dos clientes.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/capacete-guindaste.avif"
              alt="Capacete branco de segurança pendurado em gancho de guindaste, representando proteção no trabalho"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
