import { socials } from "@/data/portfolio";

const services = [
  {
    n: "01",
    title: "Brand Identity Design",
    body:
      "Logos, brand systems, guidelines and applications built on strategy — designed to feel inevitable, timeless and unmistakably yours.",
    tags: ["Logo", "Brand Guidelines", "Applications"],
  },
  {
    n: "02",
    title: "Social Media Design",
    body:
      "Editorial Instagram grids, campaign creatives, Meta & PR ads that convert while keeping your brand voice sharp and cohesive.",
    tags: ["Instagram", "Meta Ads", "Campaigns"],
  },
  {
    n: "03",
    title: "Print & Packaging",
    body:
      "Menus, catalogues, letterheads, tags and packaging — considered typography, refined print production and premium finishes.",
    tags: ["Menus", "Catalogues", "Packaging"],
  },
  {
    n: "04",
    title: "Motion Graphics & Video",
    body:
      "Brand films, event recaps and product promos with a cinematic, editorial hand. Story-first motion that moves people to act.",
    tags: ["Brand Films", "Event", "Promos"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
          <span className="h-px w-8 bg-primary/60" /> Services
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
            Four disciplines. <span className="italic text-gold">One studio.</span>
          </h2>
          <a
            href={socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="text-sm uppercase tracking-[0.3em] text-primary hover:opacity-80"
          >
            Start a project →
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <a
              key={s.n}
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 md:p-10"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "var(--gradient-gold)" }}
              />
              <div className="relative flex items-start justify-between">
                <span className="font-serif text-6xl text-primary/40 group-hover:text-primary/70 transition-colors">
                  {s.n}
                </span>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary">
                  Inquire →
                </span>
              </div>
              <h3 className="relative mt-8 font-serif text-3xl">{s.title}</h3>
              <p className="relative mt-4 max-w-md text-muted-foreground">{s.body}</p>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}