import { socials } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/50 bg-background/60 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3 md:px-10">
        <div>
          <div className="font-serif text-3xl text-gold">Creativeskroll</div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Sanchita Bhatia · Graphic designer & brand identity expert based in Jaipur, India. Available worldwide.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
          <a href="/about" className="hover:text-foreground">About</a>
          <a href="/#work" className="hover:text-foreground">Portfolio</a>
          <a href="/#motion" className="hover:text-foreground">Motion</a>
          <a href="/#contact" className="hover:text-foreground">Contact</a>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary">WhatsApp · +91 78914 47123</a>
          <a href={socials.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">Instagram</a>
          <a href={socials.behance} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">Behance</a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">LinkedIn</a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl px-6 md:px-10">
        <div className="hairline" />
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Creativeskroll · Jaipur, India
        </p>
      </div>
    </footer>
  );
}