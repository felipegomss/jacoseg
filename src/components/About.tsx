import { HardHat, Milestone, Wrench } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="bg-black p-10 gap-8 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-10 max-w-7xl">
        <video
          src="/jacoseg.mp4"
          controls
          poster="/thumb.jpg"
          className="aspect-video cursor-pointer"
        ></video>
        <h1 className="font-bold text-2xl text-zinc-50">
          Proteção, Inovação e Excelência: Sua Segurança em Primeiro Lugar!
        </h1>
        <div className="grid md:grid-cols-2 items-center place-items-end gap-8">
          <span>
            <p className="text-zinc-50">
              Desde nossa fundação em julho de 2009, nossa missão tem sido
              atender às necessidades de clientes individuais e empresariais no
              setor de equipamentos de proteção ao trabalhador e ferramentas. Na
              JacoSeg, estamos constantemente atualizados com as últimas
              inovações para oferecer maior segurança, conforto e eficiência aos
              trabalhadores.
            </p>
            <p className="text-zinc-50">
              Com parcerias estratégicas com renomados fabricantes e
              distribuidores em todo o país, oferecemos o melhor em EPIs, EPCs e
              ferramentas de alta qualidade. Nossa dedicação nos permite
              fornecer soluções confiáveis que protegem os trabalhadores e
              atendem a diversas necessidades.
            </p>
            <p className="text-zinc-50">
              Todos os produtos que comercializamos possuem o Certificado de
              Registro de Fabricantes, expedido pelo Ministério do Trabalho, e o
              Certificado de Aprovação Nacional (C.A.), garantindo sua
              conformidade com as rigorosas normas nacionais e internacionais de
              qualidade. Nossa dedicação à excelência nos permite oferecer
              soluções confiáveis e eficazes para proteger os trabalhadores em
              seu ambiente laboral e fornecer ferramentas duráveis e eficientes
              para uma ampla variedade de necessidades.
            </p>
            <p className="text-zinc-50">
              Com um amplo estoque de itens variados, podemos responder
              rapidamente às demandas dos clientes. Quando necessário,
              trabalhamos em conjunto com nossos parceiros para garantir prazos
              de entrega satisfatórios. Nosso compromisso com a ética e a
              eficiência impulsiona nosso crescimento no mercado. Estamos
              orgulhosos de proteger vidas, aumentar a produtividade e
              contribuir para a segurança no local de trabalho. Junte-se a nós
              nessa jornada e descubra por que a JacoSeg é a escolha confiável
              quando se trata de equipamentos de proteção e ferramentas de alta
              qualidade.
            </p>
          </span>
          <Image
            src={"/workman.avif"}
            alt=""
            width={400}
            height={400}
            className=""
          />
        </div>
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
