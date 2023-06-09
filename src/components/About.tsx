import { HardHat, Milestone, Wrench } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="bg-black p-10 gap-8 flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl text-zinc-50">
        Proteção, Inovação e Excelência: Sua Segurança em Primeiro Lugar!
      </h1>
      <div className="flex flex-col gap-10 max-w-7xl">
        <video
          src="/jacoseg.mp4"
          controls
          poster="/thumb.jpg"
          className="aspect-video cursor-pointer"
        ></video>
        <p className="text-zinc-50">
          Desde 2009, a Jacoseg tem sido a escolha confiável para clientes que
          buscam equipamentos de proteção de qualidade. Estamos sempre à frente
          das inovações, garantindo segurança e conforto aos trabalhadores.
          Nossos produtos possuem Certificado de Registro de Fabricantes do
          Ministério do Trabalho e o Certificado de Aprovação Nacional - C.A.,
          assegurando conformidade com as normas nacionais e internacionais.
          Conte com nossa equipe de profissionais treinados, prontos para
          oferecer um atendimento personalizado e eficiente. Sua satisfação é
          nossa prioridade! Confie na Jacoseg para proteger você e sua equipe.
          Juntos, promovemos um ambiente de trabalho seguro e confiável.
        </p>
      </div>
      <div className="gap-8 flex flex-col justify-center ">
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
