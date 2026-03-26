import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="bg-muted/30 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="overflow-hidden rounded-lg border shadow-sm">
            <video
              src="/jacoseg.mp4"
              controls
              poster="/thumb.jpg"
              className="aspect-[4/3] w-full cursor-pointer bg-black object-cover"
              preload="metadata"
            >
              <track label="Português" kind="subtitles" srcLang="pt" src="/legenda.vtt" default />
            </video>
          </div>

          <div>
            <Badge variant="outline" className="mb-3">Quem Somos</Badge>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Quem está por trás
              <br />da sua segurança
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A JacoSeg nasceu em 2009 em Jacobina com uma missão direta:
              ninguém deveria perder tempo procurando EPI. Hoje atendemos
              eólicas, construtoras, indústrias e produtores rurais.
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {[
                "Estoque próprio — sem depender de transferência",
                "Marcas como 3M, Marluvas, Vonder e Bracol",
                "Equipe que conhece as NRs e ajuda na escolha",
                "Documentação para auditorias e fiscalização",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Button size="sm" nativeButton={false} render={<a href="https://wa.me/557436219937" target="_blank" rel="noopener noreferrer" />}>
                Falar com a gente
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Badge variant="outline" className="mb-4">Duas filiais</Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Perto de quem
              <br />precisa da gente
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Jacobina é a base. Irecê é a expansão. Duas lojas com estoque
              próprio para você não ficar esperando.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "+15", label: "anos no mercado" },
                { value: "2", label: "filiais na Bahia" },
                { value: "+1.000", label: "itens em estoque" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-2xl">{stat.value}</CardTitle>
                    <CardDescription>{stat.label}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="order-1 overflow-hidden rounded-lg lg:order-2">
            <Image
              src="/capacete-guindaste.avif"
              alt="Capacete de segurança pendurado em guindaste"
              width={600}
              height={450}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
