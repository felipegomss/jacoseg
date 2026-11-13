import Link from "next/link";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-tech text-xs tracking-[0.08em] uppercase sm:text-[13px]",
        tone === "dark" ? "text-safety" : "text-graphite",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionTitle({ children, className, as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag
      className={cn(
        "font-display text-[32px] leading-[1.1] font-semibold tracking-[-0.015em] text-balance sm:text-[44px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type Variant = "safety" | "ink" | "outline-dark" | "outline-light" | "text";

const variants: Record<Variant, string> = {
  safety: "bg-safety text-ink hover:bg-[#ffc51a]",
  ink: "bg-ink text-bone hover:bg-[#2a2924]",
  "outline-dark": "border border-ink-border text-bone hover:border-fog",
  "outline-light": "border border-ink text-ink hover:bg-ink hover:text-bone",
  text: "border-b border-current px-0 pb-0.5 font-semibold min-h-0",
};

export function ButtonLink({
  href,
  variant = "safety",
  className,
  children,
  external,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const base =
    variant === "text"
      ? variants.text
      : cn(
          "inline-flex min-h-[52px] items-center justify-center gap-2.5 px-6 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safety sm:text-base",
          variants[variant],
        );
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cn(base, className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, className)}>
      {children}
    </Link>
  );
}

export function Arrow() {
  return <span aria-hidden="true">→</span>;
}
