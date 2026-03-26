import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/20 px-6">
      <div className="mx-auto max-w-7xl py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Image src="/logo-jacoseg.png" alt="JacoSeg" width={100} height={40} className="mb-3 h-auto w-auto" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              EPIs, EPCs e ferramentas para eólica, construção, indústria e campo.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground/50">Jacobina</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><a href="tel:+557436219937" className="hover:text-foreground">(74) 3621-9937</a></li>
              <li><a href="mailto:vendas@jacoseg.com.br" className="hover:text-foreground">vendas@jacoseg.com.br</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground/50">Irecê</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Av. 1&ordm; de Janeiro, 1154</li>
              <li><a href="tel:+5574998068043" className="hover:text-foreground">(74) 99806-8043</a></li>
              <li><a href="mailto:vendas2@jacoseg.com.br" className="hover:text-foreground">vendas2@jacoseg.com.br</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground/50">Horário</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Seg a Sex: 08:00 — 18:00</li>
              <li>Sábado: 08:00 — 12:30</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>CNPJ: 10.989.158/0001-90 &middot; &copy; {new Date().getFullYear()} Gomes e Nascimento Equipamentos de Segurança LTDA</p>
        </div>
      </div>
    </footer>
  );
}
