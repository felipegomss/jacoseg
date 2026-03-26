import Image from "next/image";
import Link from "next/link";

const brands = [
  { src: "/3M.webp", alt: "Logo 3M", href: "https://www.3m.com.br/3M/pt_BR/3m-do-brasil/" },
  { src: "/bracol.png", alt: "Logo Bracol", href: "https://bracol.pro/" },
  { src: "/kalipso.png", alt: "Logo Kalipso", href: "https://kalipso.com.br/" },
  { src: "/estival.png", alt: "Logo Estival", href: "https://www.estivalshoes.com/" },
  { src: "/marluvas.png", alt: "Logo Marluvas", href: "https://www.marluvas.com.br/" },
  { src: "/bralimpia.png", alt: "Logo Bralimpia", href: "https://www.bralimpia.com.br/" },
  { src: "/vonder.png", alt: "Logo Vonder", href: "https://www.vonder.com.br/" },
  { src: "/volk.jpeg", alt: "Logo Volk do Brasil", href: "https://volkdobrasil.com.br/" },
];

export default function Brands() {
  return (
    <section className="border-y bg-muted/30 px-6 py-20" aria-labelledby="brands-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-amber-600">
            Parceiros
          </span>
          <h2
            id="brands-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Marcas que confiamos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Trabalhamos com os melhores fabricantes do mercado para garantir
            qualidade e conformidade em todos os produtos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.src}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center rounded-xl border bg-white p-6 transition-all duration-300 hover:border-amber-200 hover:shadow-md active:scale-[0.96] md:p-8"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={130}
                height={65}
                className="h-auto max-h-14 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
