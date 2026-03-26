"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

function scrollTo(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const id = e.currentTarget.getAttribute("href")?.replace("#", "");
  if (id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
  }
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-end overflow-hidden">
      <Image src="/hero-wind.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 via-50% to-white/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20">
        <div className="max-w-2xl">
          <a
            href="#contact"
            onClick={scrollTo}
            className="mb-6 inline-flex items-center gap-2 rounded-md border bg-background/80 px-3 py-1.5 shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
          >
            <span className="text-sm font-medium text-foreground/70">Agora também em Irecê</span>
            <Badge variant="secondary">
              Conhecer <ChevronRight size={12} />
            </Badge>
          </a>

          <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-7xl">
            Quem protege sua equipe{" "}
            <span className="text-primary">merece</span>{" "}
            o melhor.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            EPIs, EPCs e ferramentas para quem trabalha em eólica, construção,
            indústria ou campo. Estoque local e atendimento desde 2009.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="https://wa.me/557436219937" target="_blank" rel="noopener noreferrer" />}
            >
              Pedir Orçamento pelo WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href="#services" onClick={scrollTo} />}
            >
              Ver o que oferecemos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
