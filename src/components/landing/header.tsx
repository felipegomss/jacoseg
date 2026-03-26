"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "#home", label: "Início" },
  { href: "#services", label: "Serviços" },
  { href: "#about", label: "Quem Somos" },
  { href: "#contact", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href")?.replace("#", "");
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname);
    }
    setOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        animate={{ padding: scrolled ? "10px 16px 0px" : "0px 0px 0px" }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <motion.nav
          className="mx-auto flex items-center justify-between"
          animate={{
            maxWidth: scrolled ? "64rem" : "100%",
            borderRadius: scrolled ? 12 : 0,
            padding: scrolled ? "8px 20px" : "12px 32px",
            backgroundColor: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0)",
            backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
            boxShadow: scrolled
              ? "0 4px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)"
              : "0 0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          <a href="#home" onClick={scrollTo} aria-label="JacoSeg — Voltar ao início">
            <Image src="/logo-jacoseg.png" alt="JacoSeg" width={100} height={40} className="h-auto w-auto" priority />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={scrollTo}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex">
            <Button size="sm" nativeButton={false} render={<a href="tel:+557436219937" />}>
              <Phone size={14} />
              (74) 3621-9937
            </Button>
          </div>

          <button
            className="flex size-8 items-center justify-center rounded-md hover:bg-foreground/5 md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mx-4 mt-2 rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={scrollTo}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted"
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-2" nativeButton={false} render={<a href="tel:+557436219937" />}>
                <Phone size={14} />
                (74) 3621-9937
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
