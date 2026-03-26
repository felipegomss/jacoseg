export default function CtaBanner() {
  return (
    <section className="px-6 py-16" aria-label="Chamada para ação">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center md:px-16">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-background md:text-4xl">
          Proteja sua equipe agora
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-background/60">
          Entre em contato e receba um orçamento personalizado para as
          necessidades da sua empresa.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/557436219937"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-amber-600 active:scale-[0.96]"
          >
            Falar no WhatsApp
          </a>
          <a
            href="tel:7436219937"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-background/20 px-8 py-3 text-base font-semibold text-background transition-colors hover:bg-background/10 active:scale-[0.96]"
          >
            Ligar: 74 3621-9937
          </a>
        </div>
      </div>
    </section>
  );
}
