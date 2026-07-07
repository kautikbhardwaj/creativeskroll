import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio, categories, type PortfolioItem } from "@/data/portfolio";

export function PortfolioGallery() {
  const [cat, setCat] = useState<string>("All");
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => {
    const list = cat === "All" ? portfolio : portfolio.filter((i) => i.category === cat);
    return list;
  }, [cat]);

  useEffect(() => setActive(0), [cat]);

  const current = items[active];
  const total = items.length;

  const next = () => setActive((i) => (i + 1) % Math.max(total, 1));
  const prev = () => setActive((i) => (i - 1 + Math.max(total, 1)) % Math.max(total, 1));

  // Mouse-driven 3D tilt on the stage card
  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(1400px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      card.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg)";
    };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Keyboard
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (zoom || showAll) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });

  // Coverflow indices (5 visible)
  const rail = useMemo(() => {
    const out: { item: PortfolioItem; offset: number; idx: number }[] = [];
    if (total === 0) return out;
    for (let o = -3; o <= 3; o++) {
      const idx = ((active + o) % total + total) % total;
      out.push({ item: items[idx], offset: o, idx });
    }
    return out;
  }, [items, active, total]);

  return (
    <section id="work" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
          <span className="h-px w-8 bg-primary/60" /> Selected work
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
            An interactive <span className="italic text-gold">gallery</span>.
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Drag your cursor across the stage. Every brand — logos, ads, packaging, films —
            unfolds in three dimensions.
          </p>
        </div>

        {/* Category chips — horizontal scroll on mobile */}
        <div className="mt-8 -mx-2 flex gap-2 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-all ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-gold)]"
                  : "border-border/60 text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {total === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">No work in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            {/* 3D Stage */}
            <div
              ref={stageRef}
              className="relative flex h-[440px] items-center justify-center md:h-[520px]"
              style={{ perspective: "1400px" }}
            >
              {/* ambient glows */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]" />
              </div>

              {/* Prev/Next arrows */}
              <button
                onClick={prev}
                aria-label="Previous work"
                className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground/80 backdrop-blur transition-all hover:border-primary hover:text-primary md:-left-2"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next work"
                className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground/80 backdrop-blur transition-all hover:border-primary hover:text-primary md:-right-2"
              >
                →
              </button>

              {/* Deck of cards */}
              <div
                ref={cardRef}
                className="relative h-full w-full max-w-[460px] transition-transform duration-500 [transform-style:preserve-3d]"
                style={{ transform: "perspective(1400px) rotateY(0deg) rotateX(0deg)" }}
              >
                {/* rear stacked cards */}
                {[2, 1].map((o) => {
                  const idx = (active + o) % total;
                  const it = items[idx];
                  return (
                    <div
                      key={`bg-${o}`}
                      aria-hidden
                      className="absolute inset-0 overflow-hidden rounded-3xl border border-border/40 bg-card"
                      style={{
                        transform: `translateZ(${-o * 60}px) translateX(${o * 30}px) rotate(${o * 3}deg)`,
                        opacity: 0.35 - o * 0.1,
                        filter: "blur(1px)",
                      }}
                    >
                      <img src={it.src} alt="" className="h-full w-full object-cover" />
                    </div>
                  );
                })}

                {/* Main card */}
                <button
                  onClick={() => setZoom(true)}
                  className="group absolute inset-0 block overflow-hidden rounded-3xl border border-primary/25 bg-card text-left"
                  style={{ boxShadow: "var(--shadow-luxe)", transform: "translateZ(40px)" }}
                  aria-label={`Zoom into ${current.title}`}
                >
                  <img
                    src={current.src}
                    alt={current.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                  {/* corner meta */}
                  <div className="absolute left-5 top-5 rounded-full border border-primary/40 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-primary backdrop-blur">
                    {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </div>
                  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-background/60 text-primary opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* floor reflection line */}
                  <div
                    className="pointer-events-none absolute inset-x-8 -bottom-10 h-10 rounded-full blur-2xl"
                    style={{ background: "var(--gradient-gold)", opacity: 0.35 }}
                  />
                </button>
              </div>
            </div>

            {/* Meta panel */}
            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.4em] text-primary">
                {current.subcategory ?? current.category}
              </div>
              <h3 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
                {current.title}
              </h3>
              <div className="mt-6 hairline" />
              <p className="mt-6 text-muted-foreground">
                {current.description ??
                  "A crafted piece from the Creativeskroll studio — designed with intention, refined with obsession, and delivered with care."}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setZoom(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-gold)] transition-all hover:-translate-y-0.5"
                >
                  Enlarge
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M15 3h6v6M14 10l7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-xs uppercase tracking-[0.25em] transition-all hover:border-primary hover:text-primary"
                >
                  View all · {total}
                </button>
              </div>

              {/* progress rail */}
              <div className="mt-10 h-[2px] w-full overflow-hidden rounded-full bg-border/40">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((active + 1) / total) * 100}%`,
                    background: "var(--gradient-gold)",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Coverflow rail */}
        {total > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3 md:gap-4" style={{ perspective: "1200px" }}>
            {rail.map(({ item, offset, idx }) => {
              const isActive = offset === 0;
              return (
                <button
                  key={`${item.id}-${offset}`}
                  onClick={() => setActive(idx)}
                  aria-label={item.title}
                  className="shrink-0 overflow-hidden rounded-xl border transition-all duration-500"
                  style={{
                    width: isActive ? 96 : 68,
                    height: isActive ? 120 : 84,
                    transform: `rotateY(${offset * -18}deg) translateZ(${isActive ? 40 : 0}px) scale(${isActive ? 1.05 : 1})`,
                    opacity: Math.max(0.35, 1 - Math.abs(offset) * 0.22),
                    borderColor: isActive ? "oklch(0.78 0.11 82 / 0.7)" : "oklch(0.30 0.015 70 / 0.6)",
                    boxShadow: isActive ? "var(--shadow-gold)" : "none",
                  }}
                >
                  <img src={item.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {zoom && current && (
        <Lightbox
          items={items}
          index={active}
          onClose={() => setZoom(false)}
          onNav={(d) => setActive((i) => ((i + d) % total + total) % total)}
        />
      )}

      {showAll && (
        <GridOverlay
          items={items}
          onClose={() => setShowAll(false)}
          onPick={(i) => {
            setActive(i);
            setShowAll(false);
          }}
        />
      )}
    </section>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onNav: (d: number) => void;
}) {
  const item = items[index];
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", on);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 hover:border-primary hover:text-primary"
      >
        ✕
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 hover:border-primary hover:text-primary md:left-8"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 hover:border-primary hover:text-primary md:right-8"
      >
        →
      </button>
      <figure className="relative mx-6 max-h-[85vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-[var(--shadow-luxe)]" />
        <figcaption className="mt-4 flex items-center justify-between text-sm">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.subcategory ?? item.category}</div>
            <div className="mt-1 font-serif text-xl">{item.title}</div>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {index + 1} / {items.length}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

function GridOverlay({
  items,
  onClose,
  onPick,
}: {
  items: PortfolioItem[];
  onClose: () => void;
  onPick: (i: number) => void;
}) {
  useEffect(() => {
    const on = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", on);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] overflow-y-auto bg-background/97 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 hover:border-primary hover:text-primary"
      >
        ✕
      </button>
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10" onClick={(e) => e.stopPropagation()}>
        <div className="mb-10 flex items-baseline justify-between">
          <h3 className="font-serif text-4xl md:text-5xl">All work · <span className="text-gold italic">{items.length}</span></h3>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Press esc to close</span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => onPick(i)}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border/50 bg-card text-left"
            >
              <img
                src={it.src}
                alt={it.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-[9px] uppercase tracking-[0.3em] text-primary">{it.subcategory ?? it.category}</div>
                <div className="mt-1 font-serif text-base">{it.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}