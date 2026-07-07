import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { socials } from "@/data/portfolio";

const links = [
  { to: "/", label: "Work", hash: "#work" },
  { to: "/", label: "Motion", hash: "#motion" },
  { to: "/", label: "Services", hash: "#services" },
  { to: "/about", label: "About" },
  { to: "/", label: "Contact", hash: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-serif text-2xl tracking-tight text-gold">Creativeskroll</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.hash ? `/${l.hash}` : (l.to as string)}
              className="group relative text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-gold)]"
          >
            Hire
          </a>
          <a href="/admin.html" className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/40 text-muted-foreground/40 hover:text-primary hover:border-primary/40 transition-all text-xs" title="Admin">⚙</a>
          <button
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-2.5 w-4">
              <span className={`absolute inset-x-0 top-0 h-px bg-foreground transition ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`absolute inset-x-0 bottom-0 h-px bg-foreground transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.hash ? `/${l.hash}` : (l.to as string)}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl text-foreground/90"
              >
                {l.label}
              </a>
            ))}
            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary"
            >
              Hire on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}