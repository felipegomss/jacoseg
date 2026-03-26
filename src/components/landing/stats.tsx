import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Stats() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <Image src="/hero-safety.jpg" alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <span className="font-heading text-6xl font-bold tracking-tighter sm:text-[8rem] lg:text-[10rem]">
          0
        </span>
        <p className="mt-2 text-xl font-medium text-foreground/80">
          Acidentes é o nosso objetivo
        </p>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Cada capacete entregue, cada luva vendida, cada cinto conferido —
          é uma vida a menos em risco. Esse é o trabalho que nos move.
        </p>

        <Card className="mx-auto mt-16 max-w-2xl">
          <CardHeader className="p-8 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="text-center">
                <CardTitle className="text-4xl sm:text-5xl">1000+</CardTitle>
                <CardDescription className="mt-2">Itens com pronta entrega</CardDescription>
              </div>
              <div className="text-center sm:border-l sm:pl-8">
                <CardTitle className="text-4xl sm:text-5xl">8+</CardTitle>
                <CardDescription className="mt-2">Fabricantes parceiros</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
