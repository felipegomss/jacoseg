import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const contacts = [
  {
    icon: "/icons/phone.png",
    title: "Telefone",
    description: "Ligou, atendeu. Simples assim.",
    action: "Ligar agora",
    href: "tel:+557436219937",
  },
  {
    icon: "/icons/email.png",
    title: "E-mail",
    description: "Para orçamentos e pedidos formais.",
    action: "Enviar e-mail",
    href: "mailto:vendas@jacoseg.com.br",
  },
  {
    icon: "/icons/instagram.png",
    title: "Instagram",
    description: "Bastidores, produtos novos e dicas.",
    action: "Seguir @jacoseg",
    href: "https://www.instagram.com/jacoseg",
    external: true,
  },
  {
    icon: "/icons/chat.png",
    title: "WhatsApp",
    description: "O jeito mais rápido de falar com a gente.",
    action: "Enviar mensagem",
    href: "https://wa.me/557436219937",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">Contato</Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Fale com quem
            <br />
            entende do assunto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Dúvida sobre NR? Precisa de orçamento para um projeto? A gente resolve.
          </p>
        </div>

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group"
            >
              <Card className="h-full text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <CardHeader className="items-center">
                  <Image
                    src={c.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="mb-2 h-12 w-12 object-contain drop-shadow transition-transform duration-300 group-hover:scale-110"
                  />
                  <CardTitle className="text-base">{c.title}</CardTitle>
                  <CardDescription>{c.description}</CardDescription>
                  <span className="mt-2 text-sm font-medium text-primary">{c.action} &rarr;</span>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>

        {/* Filiais */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle>Jacobina — Sede</CardTitle>
              <CardDescription>Rua Senador Pedro Lago, Centro — Jacobina/BA</CardDescription>
              <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                <a href="tel:+557436219937" className="hover:text-foreground">(74) 3621-9937</a>
                <a href="mailto:vendas@jacoseg.com.br" className="hover:text-foreground">vendas@jacoseg.com.br</a>
              </div>
            </CardHeader>
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.63002838244944!2d-40.51743944755386!3d-11.18167889219926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x76cf3ba8eddff31%3A0x6cbc35a17600fc2c!2sJACOSEG!5e0!3m2!1spt-BR!2sbr!4v1686348350932!5m2!1spt-BR!2sbr"
                className="h-48 w-full" loading="lazy" title="JacoSeg Jacobina"
              />
            </div>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2">
                <CardTitle>Irecê — Filial</CardTitle>
                <Badge>Nova</Badge>
              </div>
              <CardDescription>Av. 1&ordm; de Janeiro, 1154, Asa Norte — Irecê/BA, 44864-090</CardDescription>
              <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                <a href="tel:+5574998068043" className="hover:text-foreground">(74) 99806-8043</a>
                <a href="mailto:vendas2@jacoseg.com.br" className="hover:text-foreground">vendas2@jacoseg.com.br</a>
              </div>
            </CardHeader>
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.5!2d-41.856!3d-11.304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE4JzE0LjQiUyA0McKwNTEnMjEuNiJX!5e0!3m2!1spt-BR!2sbr"
                className="h-48 w-full" loading="lazy" title="JacoSeg Irecê"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
