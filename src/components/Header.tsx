"use client";

import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleMenu() {
    setOpen(!open);
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href");
    if (target) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed top-0 text-white right-0 left-0 md:bg-amber-950/20 px-8 ${
        open ? "bg-amber-400 h-full" : ""
      }  backdrop-blur-sm z-50`}
    >
      <nav className="flex md:flex-row flex-col justify-between py-10 items-center w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl font-extrabold">Jacoseg</h1>
          {open ? (
            <button
              className="md:hidden p-2 bg-white/10 rounded-full"
              onClick={handleMenu}
            >
              <X />
            </button>
          ) : (
            <button
              className="md:hidden p-2 bg-white/10 rounded-full"
              onClick={handleMenu}
            >
              <Menu />
            </button>
          )}
        </div>
        <div
          className={`md:flex gap-10 text-lg justify-end font-medium flex-col md:flex-row w-full mt-10 md:mt-0
        ${open ? "flex" : "hidden"}
        `}
        >
          <Link href="/">Página Inicial</Link>
          <Link href="#brands">Marcas</Link>
          <Link href="#about">Quem somos?</Link>
          <Link href="#contact">Contato</Link>
        </div>
      </nav>
    </div>
  );
}
