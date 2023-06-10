"use client";

import React from "react";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div
      className="flex flex-col gap-8 justify-center items-center"
      id="contact"
    >
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <span className="text-center mb-6">
          <h3 className="font-bold text-zinc-500">Entre em contato</h3>
          <h2 className="text-3xl font-bold text-black">
            Estamos aqui para ajudar
          </h2>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl m-auto">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Phone size={24} className="text-amber-400" />
            <h3 className="text-xl font-medium mt-4">Telefone</h3>
            <p className="text-black text-sm mt-2">
              Entre em contato pelo telefone para obter assistência imediata.
            </p>
            <a
              href="tel:7436219937"
              className="text-amber-400 hover:underline mt-4"
            >
              Ligar agora
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Mail size={24} className="text-amber-400" />
            <h3 className="text-xl font-medium mt-4">E-mail</h3>
            <p className="text-black text-sm mt-2">
              Envie-nos um e-mail para qualquer dúvida ou solicitação.
            </p>
            <a
              href="mailto:jacoseg.epi@gmail.com"
              className="text-amber-400 hover:underline mt-4"
            >
              Enviar e-mail
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Instagram size={24} className="text-amber-400" />
            <h3 className="text-xl font-medium mt-4">Instagram</h3>
            <p className="text-black text-sm mt-2">
              Siga-nos no Instagram para atualizações e conteúdo exclusivo.
            </p>
            <a
              href="https://www.instagram.com/jacoseg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline mt-4"
            >
              Siga-nos
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <MessageCircle size={24} className="text-amber-400" />
            <h3 className="text-xl font-medium mt-4">WhatsApp</h3>
            <p className="text-black text-sm mt-2">
              Entre em contato pelo WhatsApp para uma resposta rápida e
              conveniente.
            </p>
            <a
              href="https://wa.me/557436219937"
              className="text-amber-400 hover:underline mt-4"
              target="_blank"
            >
              Enviar mensagem
            </a>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.63002838244944!2d-40.51743944755386!3d-11.18167889219926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x76cf3ba8eddff31%3A0x6cbc35a17600fc2c!2sJACOSEG!5e0!3m2!1spt-BR!2sbr!4v1686348350932!5m2!1spt-BR!2sbr"
        className="w-full h-96"
      ></iframe>
    </div>
  );
}
