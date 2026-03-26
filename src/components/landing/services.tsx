import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
  {
    icon: "/icons/helmet.png",
    title: "EPIs",
    subtitle: "Proteção Individual",
    description:
      "Capacetes, cintos paraquedista, luvas, óculos, calçados — cada item com CA válido. Da torre eólica ao chão de fábrica.",
    gradient: "from-amber-500/10 to-orange-500/5",
  },
  {
    icon: "/icons/cone.png",
    title: "EPCs",
    subtitle: "Proteção Coletiva",
    description:
      "Cones, fitas, extintores, placas — tudo que a NR exige para canteiros, plantas industriais e áreas de montagem.",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: "/icons/wrench.png",
    title: "Ferramentas",
    subtitle: "Para quem trabalha de verdade",
    description:
      "Furadeiras, serras, esmerilhadeiras, chaves. Marcas que aguentam o ritmo de quem não para.",
    gradient: "from-emerald-500/10 to-teal-500/5",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            Nossos Serviços
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            O que sua operação
            <br />
            precisa, a gente tem
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            De parques eólicos a canteiros de obra. Marcas que você conhece,
            estoque local e entrega rápida.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="group overflow-hidden transition-shadow hover:shadow-md">
              <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${service.gradient}`}>
                <Image
                  src={service.icon}
                  alt=""
                  width={80}
                  height={80}
                  className="h-20 w-20 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <p className="text-sm font-medium text-primary">{service.subtitle}</p>
                <CardDescription className="mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
