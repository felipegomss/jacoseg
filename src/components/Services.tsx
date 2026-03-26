import { HardHat, Milestone, Wrench } from "lucide-react";

const services = [
  {
    icon: HardHat,
    title: "EPIs",
    subtitle: "Equipamentos de Proteção Individual",
    description:
      "Capacetes, luvas, óculos de proteção, calçados e muito mais. Produtos certificados das melhores marcas para garantir sua segurança.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Milestone,
    title: "EPCs",
    subtitle: "Equipamentos de Proteção Coletiva",
    description:
      "Sinalização, barreiras de proteção, cones e tudo o que você precisa para criar um ambiente de trabalho seguro para toda a equipe.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Wrench,
    title: "Ferramentas",
    subtitle: "Ferramentas Profissionais",
    description:
      "Ferramentas elétricas, manuais e a bateria de alta qualidade. Aumente sua eficiência com equipamentos profissionais.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-muted/40 px-6 py-24 md:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-amber-600">
            Nossos Serviços
          </span>
          <h2
            id="services-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Tudo para a segurança no trabalho
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Oferecemos uma linha completa de equipamentos de proteção e
            ferramentas profissionais com as melhores marcas do mercado.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border bg-white p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <div className={`mb-6 inline-flex rounded-xl p-3 ${service.color}`}>
                <service.icon size={26} aria-hidden="true" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-amber-600">
                {service.subtitle}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
