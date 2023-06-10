import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Brands() {
  return (
    <div
      className="grid md:grid-cols-8 grid-cols-2 place-items-center"
      id="brands"
    >
      <Link
        target="_blank"
        href={"https://www.3m.com.br/3M/pt_BR/3m-do-brasil/"}
      >
        <Image
          src={"/3M.webp"}
          alt="Logo da empresa 3M"
          width={150}
          height={100}
          className="grayscale hover:grayscale-0 duration-500 ease-in-out"
        />
      </Link>
      <Link target="_blank" href={"https://bracol.pro/"}>
        <Image
          src={"/bracol.png"}
          alt="Logo da empresa Bracol"
          width={150}
          height={100}
          className="grayscale hover:grayscale-0 duration-500 ease-in-out"
        />
      </Link>
      <Link target="_blank" href={"https://kalipso.com.br/"}>
        <Image
          src={"/kalipso.png"}
          alt="Logo da empresa Kalipso"
          width={150}
          height={100}
          className="grayscale hover:grayscale-0 duration-500 ease-in-out"
        />
      </Link>
      <Link target="_blank" href={"https://www.estivalshoes.com/"}>
        <Image
          src={"/estival.png"}
          alt="Logo da empresa Estival"
          width={150}
          height={100}
          className="grayscale hover:grayscale-0 duration-500 ease-in-out"
        />
      </Link>
      <Link target="_blank" href={"https://www.marluvas.com.br/"}>
        <Image
          src={"/marluvas.png"}
          alt="Logo da empresa Marluvas"
          width={150}
          height={100}
          className="grayscale hover:grayscale-0 duration-500 ease-in-out"
        />
      </Link>
      <Link target="_blank" href={"https://www.bralimpia.com.br/"}>
        <Image
          src={"/bralimpia.png"}
          alt="Logo da empresa Bralimpia"
          width={150}
          height={100}
          className="grayscale hover:grayscale-0 duration-500 ease-in-out"
        />
      </Link>
      <Link target="_blank" href={"https://www.vonder.com.br/"}>
        <Image
          src={"/vonder.png"}
          alt="Logo da empresa Vonder"
          width={150}
          height={100}
          className="grayscale hover:grayscale-0 duration-500 ease-in-out"
        />
      </Link>
      <Link target="_blank" href={"https://volkdobrasil.com.br/"}>
        <Image
          src={"/volk.jpeg"}
          alt="Logo da empresa Volk"
          width={150}
          height={100}
          className="grayscale hover:grayscale-0 duration-500 ease-in-out"
        />
      </Link>
    </div>
  );
}
