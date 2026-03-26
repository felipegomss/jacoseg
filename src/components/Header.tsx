"use client";

import { Menu, Phone, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.href.replace(/.*#/, "");
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const navLinks = [
    { href: "#home", label: "Início" },
    { href: "#services", label: "Serviços" },
    { href: "#about", label: "Quem Somos" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="#home" onClick={handleScroll} aria-label="JacoSeg — Ir para início">
          <Image src="/logo-jacoseg.png" alt="Logo JacoSeg" width={110} height={44} className="h-auto w-auto" priority />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleScroll}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:7436219937"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 active:scale-[0.96]"
          >
            <Phone size={15} />
            74 3621-9937
          </a>
        </div>

        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-white px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleScroll}
                className="text-base font-medium text-foreground/70 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:7436219937"
              className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background active:scale-[0.96]"
            >
              <Phone size={15} />
              74 3621-9937
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
