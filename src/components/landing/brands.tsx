import Image from "next/image";

const brands = [
  { src: "/brands/3m.png", alt: "3M", w: 150, h: 100 },
  { src: "/brands/bracol.png", alt: "Bracol", w: 150, h: 50 },
  { src: "/brands/kalipso.png", alt: "Kalipso", w: 150, h: 50 },
  { src: "/brands/estival.png", alt: "Estival", w: 150, h: 78 },
  { src: "/brands/marluvas.png", alt: "Marluvas", w: 120, h: 90 },
  { src: "/brands/bralimpia.png", alt: "Bralimpia", w: 140, h: 38 },
  { src: "/brands/vonder.png", alt: "Vonder", w: 140, h: 40 },
  { src: "/brands/volk.png", alt: "Volk", w: 130, h: 110 },
];

function BrandStrip() {
  return (
    <>
      {brands.map((brand) => (
        <div
          key={brand.alt}
          className="relative mx-8 shrink-0"
          style={{ width: brand.w, height: brand.h }}
        >
          <Image
            src={brand.src}
            alt={brand.alt}
            fill
            sizes={`${brand.w}px`}
            className="object-contain opacity-40 grayscale"
          />
        </div>
      ))}
    </>
  );
}

export default function Brands() {
  return (
    <section className="overflow-hidden border-y bg-muted/30 py-8">
      <div className="flex w-max items-center marquee">
        <BrandStrip />
        <BrandStrip />
        <BrandStrip />
        <BrandStrip />
      </div>
    </section>
  );
}
