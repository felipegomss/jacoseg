import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Footer() {
  const openingHours = [
    "segunda-feira: 08:00 – 18:00",
    "terça-feira:   08:00 – 18:00",
    "quarta-feira:  08:00 – 18:00",
    "quinta-feira:  08:00 – 18:00",
    "sexta-feira:   08:00 – 18:00",
    "sábado:        08:00 – 12:30",
    "domingo:       Fechado",
  ];

  const capitalize = (str: string) => {
    return str
      .toLowerCase()
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <footer className="bg-zinc-950">
      <div className="container mx-auto py-10 pt-32">
        <div className="flex flex-col md:flex-row justify-between items-center pb-20">
          <div className="mb-4 md:mb-0">
            <Image
              src={"/logo-jacoseg.png"}
              alt=""
              width={200}
              height={100}
              className="mb-2"
            />
            <p className="text-gray-300">Contatos</p>
            <p className="text-gray-300">
              Telefone:{" "}
              <a
                href="tel:7436219937"
                className="text-gray-300 hover:text-white"
              >
                (74) 3621-9937
              </a>
            </p>
            <p className="text-gray-300">
              WhatsApp:{" "}
              <a
                href="tel:7436214572"
                className="text-gray-300 hover:text-white"
              >
                (74) 3621-4572
              </a>
            </p>
            <p className="text-gray-300">
              E-mail:{" "}
              <a
                href="mailto:jacoseg.epi@gmail.com"
                className="text-gray-300 hover:text-white"
              >
                jacoseg.epi@gmail.com
              </a>
            </p>
            <p className="text-gray-300">
              Instagram:{" "}
              <a
                href="https://instagram.com/jacoseg"
                className="text-gray-300 hover:text-white"
              >
                @jacoseg
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-white mb-2">
              Horário de funcionamento
            </h3>
            <p className="text-gray-300">Segunda a Sexta: 08:00 - 18:00</p>
            <p className="text-gray-300">Sábado: 08:00 - 12:30</p>
            <p className="text-gray-300">Domingo: Fechado</p>
          </div>
        </div>
        <div className="text-gray-300 text-sm mt-4 w-full text-center">
          <p>10.989.158/0001-90</p>
          <p>
            © {new Date().getFullYear()} GOMES E NASCIMENTO EQUIPAMENTOS DE
            SEGURANCA LTDA
          </p>
        </div>
      </div>
      <div className="py-4 bg-amber-400">
        <p className="text-sm text-center">
          Ideias transformadas em código por {""}
          <a href="https://felipegomes.me">Felipe Gomes</a>
        </p>
      </div>
    </footer>
  );
}
