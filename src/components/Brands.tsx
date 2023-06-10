import Image from "next/image";
import React from "react";

export default function Brands() {
  return (
    <div
      className="grid md:grid-cols-8 grid-cols-2 place-items-center grayscale"
      id="brands"
    >
      <Image
        src={"/3M.webp"}
        alt="Logo da empresa 3M"
        width={150}
        height={100}
      />
      <Image
        src={"/bracol.png"}
        alt="Logo da empresa Bracol"
        width={150}
        height={100}
      />
      <Image
        src={"/kalipso.png"}
        alt="Logo da empresa Kalipso"
        width={150}
        height={100}
      />
      <Image
        src={"/estival.png"}
        alt="Logo da empresa Estival"
        width={150}
        height={100}
      />
      <Image
        src={"/marluvas.png"}
        alt="Logo da empresa Marluvas"
        width={150}
        height={100}
      />
      <Image
        src={"/bralimpia.png"}
        alt="Logo da empresa Bralimpia"
        width={150}
        height={100}
      />
      <Image
        src={"/vonder.png"}
        alt="Logo da empresa Vonder"
        width={150}
        height={100}
      />
      <Image
        src={"/volk.jpeg"}
        alt="Logo da empresa Volk"
        width={150}
        height={100}
      />
    </div>
  );
}
