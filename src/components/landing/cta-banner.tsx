import { Button } from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-foreground p-12 text-center sm:p-20">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-background sm:text-5xl">
          Sua próxima compra de EPI
          <br />
          começa aqui
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-background/60">
          Manda a lista no WhatsApp que a gente responde rápido.
          Orçamento sem compromisso para qualquer porte de operação.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href="https://wa.me/557436219937" target="_blank" rel="noopener noreferrer" />}
          >
            Mandar lista no WhatsApp
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-background/20 text-background hover:bg-background/10 hover:text-background"
            nativeButton={false}
            render={<a href="tel:+557436219937" />}
          >
            Ligar: 74 3621-9937
          </Button>
        </div>
      </div>
    </section>
  );
}
