import { socials } from "@/data/portfolio";

const floatingTags = [
  "Brand Identity",
  "Logo Design",
  "Social Media",
  "Motion Graphics",
  "Photography",
  "Illustrations",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-spotlight)" }} />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-primary-deep/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.15fr_1fr] md:items-center md:px-10">
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Available for new brand projects · 2026
          </div>

          <h1 className="font-serif text-[clamp(2.5rem,6.2vw,5.5rem)] leading-[1.02] tracking-tight">
            Where brands become <span className="text-gold italic">unforgettable</span>.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I'm <span className="text-foreground">Sanchita Bhatia</span> — a graphic designer & brand identity expert
            in Jaipur. For 8+ years I've built logos, brand systems, social creatives and motion for 60+ brands
            across India and worldwide.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-all hover:-translate-y-0.5"
            >
              View my work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-border/80 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-foreground transition-all hover:border-primary hover:text-primary"
            >
              Hire on WhatsApp
            </a>
            <a href="/about" className="text-sm uppercase tracking-[0.3em] text-muted-foreground hover:text-primary">
              My story →
            </a>
          </div>

          <div className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border/50 pt-8">
            {[
              { n: "8+", l: "Years" },
              { n: "60+", l: "Brands" },
              { n: "∞", l: "Ideas" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-4xl text-gold">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait card */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute inset-0 rotate-[3deg] rounded-[32px] border border-primary/25 bg-gradient-to-br from-primary/15 to-transparent" />
            <div className="absolute inset-0 -rotate-[2deg] rounded-[32px] border border-border/60 bg-card/50" />
            <div
              className="tilt-card relative h-full w-full overflow-hidden rounded-[32px] border border-primary/20 bg-card"
              style={{ boxShadow: "var(--shadow-luxe)" }}
            >
              <img
                src="/assets/sanchita.png"
                alt="Sanchita Bhatia — Founder of Creativeskroll, graphic designer in Jaipur"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs uppercase tracking-[0.3em] text-primary">Founder · Creativeskroll</div>
                <div className="mt-1 font-serif text-2xl">Sanchita Bhatia</div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -left-6 top-10 hidden animate-float md:block">
              <span className="glass-panel inline-flex rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary">
                Brand Identity
              </span>
            </div>
            <div className="absolute -right-4 bottom-24 hidden animate-float md:block" style={{ animationDelay: "1.5s" }}>
              <span className="glass-panel inline-flex rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary">
                Motion Graphics
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-20 overflow-hidden border-y border-border/40 py-6">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
          {[...floatingTags, ...floatingTags, ...floatingTags].map((t, i) => (
            <span key={i} className="flex items-center gap-16 font-serif text-3xl text-muted-foreground/70">
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}