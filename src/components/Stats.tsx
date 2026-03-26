import { Award, ShieldCheck, Users, Wrench } from "lucide-react";

const stats = [
  { icon: ShieldCheck, value: "15+", label: "Anos de experiência" },
  { icon: Award, value: "8+", label: "Marcas parceiras" },
  { icon: Wrench, value: "1000+", label: "Produtos disponíveis" },
  { icon: Users, value: "500+", label: "Clientes atendidos" },
];

export default function Stats() {
  return (
    <section className="border-y bg-white px-6 py-12" aria-label="Números de impacto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <stat.icon size={24} className="mb-2 text-amber-500" aria-hidden="true" />
              <span className="font-heading text-3xl font-bold tabular-nums text-foreground">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
