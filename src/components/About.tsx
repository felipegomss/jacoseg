import { HardHat, Milestone, Wrench } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="bg-black p-10" id="about">
      <div className="flex flex-col gap-10 max-w-7xl m-auto">
        <video
          src="/jacoseg.mp4"
          controls
          poster="/thumb.jpg"
          className="aspect-video cursor-pointer"
        >
          <track
            label="Português"
            kind="subtitles"
            srcLang="pt"
            src="/legenda.vtt"
            default
          />
        </video>
        <div className="grid md:grid-cols-2 items-center place-items-end gap-8">
          <span className="flex flex-col gap-6">
            <h1 className="font-bold text-2xl text-zinc-50">
              Proteção, Inovação e Excelência: Sua Segurança em Primeiro Lugar!
            </h1>
            <span>
              <p className="text-zinc-50">
                Desde nossa fundação em julho de 2009, na JacoSeg, nossa missão
                é atender às necessidades de clientes individuais e empresariais
                no setor de equipamentos de proteção ao trabalhador e
                ferramentas. Com parcerias estratégicas com fabricantes
                renomados em todo o país, oferecemos o melhor em EPIs, EPCs e
                ferramentas de alta qualidade, garantindo conformidade com as
                normas nacionais e internacionais.
              </p>
              <p className="text-zinc-50">
                Nossa dedicação à excelência nos permite fornecer soluções
                confiáveis para proteger os trabalhadores e atender a diversas
                necessidades. Com um amplo estoque de itens variados,
                respondemos rapidamente às demandas dos clientes e garantimos
                prazos de entrega satisfatórios em colaboração com nossos
                parceiros.
              </p>
              <p className="text-zinc-50">
                Estamos orgulhosos de proteger vidas, aumentar a produtividade e
                contribuir para a segurança no local de trabalho. Junte-se a nós
                e descubra por que a JacoSeg é a escolha confiável em
                equipamentos de proteção e ferramentas de alta qualidade.
              </p>
            </span>
          </span>
          <div>
            <Image
              src={"/capacete-guindaste.avif"}
              alt="Capacete branco pendurado em gancho de guindaste"
              width={500}
              height={500}
              className="w-full"
            />
          </div>
        </div>

        <h1 className="font-bold text-2xl text-zinc-50">
          Soluções Completas para a Segurança no Trabalho
        </h1>
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl">
          <div className="text-white flex flex-col gap-4 p-4 rounded-xl border-2 border-amber-400">
            <span className="flex justify-between items-center">
              <h2 className="font-bold">EPIs</h2>
              <HardHat className="mx-4" />
            </span>
            <p>
              Proteja-se com nossa ampla seleção de EPIs, incluindo capacetes,
              luvas, óculos de proteção e muito mais. Garanta sua segurança no
              ambiente de trabalho.
            </p>
          </div>
          <div className="text-white flex flex-col gap-4 p-4 rounded-xl border-2 border-amber-400">
            <span className="flex justify-between items-center">
              <h2 className="font-bold">EPCs</h2>
              <Milestone className="mx-4" />
            </span>

            <p>
              Mantenha seu local de trabalho seguro com nossos EPCs. Temos
              sistemas de sinalização, barreiras de proteção, cones e tudo o que
              você precisa para criar um ambiente seguro para todos.
            </p>
          </div>
          <div className="text-white flex flex-col gap-4 p-4 rounded-xl border-2 border-amber-400">
            <span className="flex justify-between items-center">
              <h2 className="font-bold">Ferramentas</h2>
              <Wrench className="mx-4" />
            </span>

            <p>
              Aumente sua eficiência e produtividade com nossas ferramentas de
              alta qualidade. Encontre ferramentar elétricas, manuais, a bateria
              e uma ampla gama de opções para suas necessidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
