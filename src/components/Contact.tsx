import { Mail, MessageCircle, Phone } from "lucide-react";

const contacts = [
  {
    icon: Phone,
    title: "Telefone",
    description: "Assistência imediata.",
    action: "Ligar agora",
    href: "tel:7436219937",
  },
  {
    icon: Mail,
    title: "E-mail",
    description: "Dúvidas ou solicitações.",
    action: "Enviar e-mail",
    href: "mailto:vendas@jacoseg.com.br",
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    title: "Instagram",
    description: "Novidades e conteúdo.",
    action: "Seguir @jacoseg",
    href: "https://www.instagram.com/jacoseg",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Resposta rápida.",
    action: "Enviar mensagem",
    href: "https://wa.me/557436219937",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-white px-6 py-24 md:py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-amber-600">
            Contato
          </span>
          <h2
            id="contact-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Estamos aqui para ajudar
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Escolha o canal mais conveniente para entrar em contato conosco.
          </p>
        </div>

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact) => (
            <a
              key={contact.title}
              href={contact.href}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center rounded-2xl border bg-white p-6 text-center transition-all duration-300 hover:border-amber-200 hover:shadow-lg"
            >
              <div className="mb-4 rounded-xl bg-amber-50 p-3 text-amber-600">
                <contact.icon size={22} aria-hidden="true" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground">
                {contact.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{contact.description}</p>
              <span className="mt-3 text-sm font-medium text-amber-600 transition-colors group-hover:text-amber-700">
                {contact.action} &rarr;
              </span>
            </a>
          ))}
        </div>

        {/* Filiais */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Jacobina */}
          <div className="overflow-hidden rounded-2xl border">
            <div className="bg-muted/40 px-6 py-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">Jacobina — Matriz</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                R. Cel. Hermenegildo, 50, Missão — Jacobina/BA, 44700-000
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <a href="tel:7436219937" className="hover:text-foreground">(74) 3621-9937</a>
                <a href="mailto:vendas@jacoseg.com.br" className="hover:text-foreground">vendas@jacoseg.com.br</a>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.63002838244944!2d-40.51743944755386!3d-11.18167889219926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x76cf3ba8eddff31%3A0x6cbc35a17600fc2c!2sJACOSEG!5e0!3m2!1spt-BR!2sbr!4v1686348350932!5m2!1spt-BR!2sbr"
              className="h-56 w-full"
              loading="lazy"
              title="JacoSeg Jacobina no Google Maps"
            />
          </div>

          {/* Irecê */}
          <div className="overflow-hidden rounded-2xl border">
            <div className="bg-muted/40 px-6 py-4">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg font-semibold text-foreground">Irecê — Filial</h3>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">Nova</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Av. 1&ordm; de Janeiro, 1154, Térreo, Asa Norte — Irecê/BA, 44864-090
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <a href="tel:74998068043" className="hover:text-foreground">(74) 99806-8043</a>
                <a href="mailto:vendas2@jacoseg.com.br" className="hover:text-foreground">vendas2@jacoseg.com.br</a>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.5!2d-41.856!3d-11.304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE4JzE0LjQiUyA0McKwNTEnMjEuNiJX!5e0!3m2!1spt-BR!2sbr"
              className="h-56 w-full"
              loading="lazy"
              title="JacoSeg Irecê no Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
