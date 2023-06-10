"use client";

import { Menu, Phone, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleMenu() {
    setOpen(!open);
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });

    setOpen(false);
  };

  return (
    <div
      className={`absolute top-0 text-white right-0 left-0 md:bg-amber-950/20 px-8 ${
        open ? "bg-amber-400 h-full" : ""
      }  backdrop-blur-sm z-50`}
    >
      <nav className="flex md:flex-row flex-col justify-between py-10 items-center w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center md:w-auto w-full ">
          <h1 className="text-3xl font-extrabold">Jacoseg</h1>
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
          className={`md:flex md:gap-8 gap-12 text-lg justify-center items-start font-medium flex-col md:flex-row w-full mt-10 md:mt-0
        ${open ? "flex" : "hidden"}
        `}
        >
          <Link
            href="#home"
            className="hover:text-amber-100"
            onClick={handleScroll}
          >
            Página Inicial
          </Link>
          {/* <Link
            href="#brands"
            className="hover:text-amber-100"
            onClick={handleScroll}
          >
            Marcas
          </Link> */}
          <Link
            href="#about"
            className="hover:text-amber-100"
            onClick={handleScroll}
          >
            Quem somos?
          </Link>
          <Link
            href="#contact"
            className="hover:text-amber-100"
            onClick={handleScroll}
          >
            Contatos
          </Link>
        </div>
        <div className={`md:flex ${open ? "flex" : "hidden"}`}>
          <Link
            href="tel:7436219937"
            className="border-2 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-2xl duration-300 ease-in-out flex gap-4 items-center justify-center w-max md:mt-0 mt-10"
          >
            <Phone />
            74 3621-9937
          </Link>
        </div>
      </nav>
    </div>
  );
}
