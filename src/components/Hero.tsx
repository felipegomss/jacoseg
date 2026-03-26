import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-16"
    >
      {/* Decorative shapes */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Desde 2009 protegendo vidas
            </span>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Soluções completas para a{" "}
              <span className="text-amber-600">segurança</span> no trabalho.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              EPIs, EPCs e ferramentas de alta qualidade com as melhores marcas do
              mercado. Sua proteção é nossa prioridade.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/557436219937"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-7 py-3 text-base font-semibold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 active:scale-[0.96]"
              >
                Solicitar Orçamento
              </a>
              <a
                href="#services"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-border px-7 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.96]"
              >
                Nossos Serviços
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 to-orange-50 p-8">
              <Image
                src="/hero-safety.jpg"
                alt="Equipe JacoSeg"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="text-lg">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Certificação</p>
                  <p className="text-xs text-muted-foreground">Normas NR vigentes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
