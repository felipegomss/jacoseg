import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 px-6" role="contentinfo">
      <div className="mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Image src="/logo-jacoseg.png" alt="Logo JacoSeg" width={120} height={48} className="mb-4 h-auto w-auto" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Desde 2009, fornecendo soluções completas em equipamentos de
              proteção e ferramentas profissionais.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground/60">
              Jacobina — Matriz
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:7436219937" className="hover:text-foreground">(74) 3621-9937</a>
              </li>
              <li>
                <a href="tel:+557436219937" className="hover:text-foreground">(74) 3621-9937</a>
              </li>
              <li>
                <a href="mailto:vendas@jacoseg.com.br" className="hover:text-foreground">vendas@jacoseg.com.br</a>
              </li>
              <li>
                <a href="https://instagram.com/jacoseg" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">@jacoseg</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground/60">
              Irecê — Filial
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Av. 1&ordm; de Janeiro, 1154</li>
              <li>Asa Norte — CEP 44864-090</li>
              <li>
                <a href="tel:74998068043" className="hover:text-foreground">(74) 99806-8043</a>
              </li>
              <li>
                <a href="mailto:vendas2@jacoseg.com.br" className="hover:text-foreground">vendas2@jacoseg.com.br</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground/60">
              Horário
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Seg a Sex: 08:00 — 18:00</li>
              <li>Sábado: 08:00 — 12:30</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-xs text-muted-foreground">
          <p>CNPJ: 10.989.158/0001-90</p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} Gomes e Nascimento Equipamentos de Segurança LTDA
          </p>
        </div>
      </div>
    </footer>
  );
}
