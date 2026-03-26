"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  fornecedores: { id: string; nome: string }[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function FornecedorCombobox({ fornecedores, value, onChange, name }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = search
    ? fornecedores.filter((f) =>
        f.nome.toLowerCase().includes(search.toLowerCase())
      )
    : fornecedores;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(nome: string) {
    setSearch(nome);
    onChange(nome);
    setOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearch(val);
    onChange(val);
    setOpen(true);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <Input
        value={search}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        placeholder="Digite ou selecione..."
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
          <div className="max-h-48 overflow-y-auto">
            {filtered.map((f) => (
              <button
                key={f.id}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent",
                  value === f.nome && "bg-accent"
                )}
                onClick={() => handleSelect(f.nome)}
              >
                <Check
                  className={cn(
                    "size-3.5 shrink-0",
                    value === f.nome ? "opacity-100" : "opacity-0"
                  )}
                />
                {f.nome}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
