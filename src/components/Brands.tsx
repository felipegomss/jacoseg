import Image from "next/image";
import React from "react";

export default function Brands() {
  return (
    <div className="grid md:grid-cols-8 grid-cols-2 place-items-center grayscale">
      <Image src={"/3M.webp"} alt="" width={100} height={100} />
      <Image src={"/bracol.png"} alt="" width={100} height={100} />
      <Image src={"/kalipso.png"} alt="" width={100} height={100} />
      <Image src={"/estival.png"} alt="" width={100} height={100} />
      <Image src={"/marluvas.png"} alt="" width={100} height={100} />
      <Image src={"/bralimpia.png"} alt="" width={100} height={100} />
      <Image src={"/vonder.png"} alt="" width={100} height={100} />
      <Image src={"/volk.jpeg"} alt="" width={100} height={100} />
    </div>
  );
}
