import { HardHat, Wrench, Milestone } from "lucide-react";
import Image from "next/image";
import React from "react";
import Header from "./Header";

export default function Hero() {
  return (
    <div
      className="relative min-h-screen bg-amber-400 bg-fixed bg-hero-image bg-no-repeat  bg-left-bottom md:bg-right bg-contain flex flex-col px-2 py-16 md:justify-center md:items-center"
      id="home"
    >
      <div className="flex gap-16 flex-col md:justify-center md:items-center">
        <h1 className="text-5xl md:text-7xl text-white md:text-center md:w-1/2 mt-20">
          Soluções completas para a segurança no trabalho.
        </h1>
        <button className="border-2 hover:bg-amber-500 text-white font-bold py-4 px-8 rounded-2xl duration-300 ease-in-out">
          Proteja-se Agora!
        </button>
      </div>
    </div>
  );
}
