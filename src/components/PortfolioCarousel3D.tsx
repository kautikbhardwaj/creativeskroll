import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio, categories, type PortfolioItem } from "@/data/portfolio";

/**
 * Sample 2 — "Orbital Vault"
 * A cylindrical 3D carousel. Cards orbit around a Y axis; drag to spin,
 * scroll wheel to fly through, auto-rotates when idle. Iridescent theme,
 * maximum depth, floating particles, holographic edges.
 */
export function PortfolioCarousel3D() {
  const [cat, setCat] = useState<string>("All");
  const [angle, setAngle] = useState(0); // degrees
  const [zoom, setZoom] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const dragRef = useRef<{ x: number; a: number } | null>(null);

  const items = useMemo(
    () => (cat === "All" ? portfolio : portfolio.filter((i) => i.category === cat)).slice(0, 24),
    [cat],
  );
  const n = items.length;
  const step = 360 / Math.max(n, 1);
  const radius = Math.max(340, Math.min(560, n * 55));

  // Snap to nearest card index
  const activeIdx = ((Math.round(-angle / step) % n) + n) % n;
  const current = items[activeIdx];

  // Auto rotation
  useEffect(() => {
    if (paused || zoom !== null) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setAngle((a) => a - dt * 6); // slow drift
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, zoom]);

  // Reset on category change
  useEffect(() => setAngle(0), [cat]);

  const rotateBy = (d: number) => setAngle((a) => a - d);
  const snapTo = (i: number) => setAngle(-i * step);

  // Pointer drag
  const onDown = (e: React.PointerEvent) => {
    setPaused(true);
    dragRef.current = { x: e.clientX, a: angle };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    setAngle(dragRef.current.a + dx * 0.4);
  };
  const onUp = () => {
    dragRef.current = null;
    // snap
    setAngle((a) => Math.round(a / step) * step);
    setTimeout(() => setPaused(false), 1500);
  };

  return (
    <section id="work" className="relative overflow-hidden py-24 md:py-28">
      {/* Iridescent aurora backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              "conic-gradient(from 120deg, oklch(0.65 0.18 300 / 0.7), oklch(0.75 0.16 200 / 0.6), oklch(0.86 0.13 88 / 0.7), oklch(0.65 0.18 20 / 0.6), oklch(0.65 0.18 300 / 0.7))",
            filter: "blur(120px)",
          }}
        />
        {/* particle grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.86 0.13 88 / 0.9) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
          <span className="h-px w-8 bg-primary/60" /> Orbital vault · sample 02
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Every project, in <span className="italic text-gold">orbit</span>.
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Drag to spin the ring. Scroll to fly through. Every card is a live artefact — click any
            to enter its holographic vitrine.
          </p>
        </div>

        {/* Category tokens */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-md border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-all ${
                cat === c
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_oklch(0.78_0.11_82/0.35)]"
                  : "border-border/50 text-muted-foreground hover:border-primary/60 hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {n === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">No work in this category yet.</p>
        ) : (
          <>
            {/* Stage */}
            <div
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onWheel={(e) => {
                setPaused(true);
                setAngle((a) => a - e.deltaY * 0.25);
                clearTimeout((onUp as unknown as { t?: number }).t);
                (onUp as unknown as { t?: number }).t = window.setTimeout(() => {
                  setAngle((a) => Math.round(a / step) * step);
                  setPaused(false);
                }, 250);
              }}
              className="relative mt-14 h-[520px] cursor-grab select-none active:cursor-grabbing md:h-[560px]"
              style={{ perspective: "1600px" }}
            >
              {/* Reflective floor */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto h-24 w-[80%] rounded-[50%] opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse, oklch(0.78 0.11 82 / 0.35), transparent 70%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Ring */}
              <div
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%,-50%) rotateX(-8deg) rotateY(${angle}deg)`,
                  transition: paused ? "none" : "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {items.map((it, i) => {
                  const a = i * step;
                  const isActive = i === activeIdx;
                  return (
                    <div
                      key={it.id}
                      className="absolute"
                      style={{
                        width: 240,
                        height: 320,
                        left: -120,
                        top: -160,
                        transform: `rotateY(${a}deg) translateZ(${radius}px)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <button
                        onClick={() => {
                          if (isActive) setZoom(i);
                          else snapTo(i);
                        }}
                        className="group relative block h-full w-full overflow-hidden rounded-2xl border text-left transition-all duration-500"
                        style={{
                          borderColor: isActive
                            ? "oklch(0.86 0.13 88 / 0.9)"
                            : "oklch(0.30 0.015 70 / 0.5)",
                          boxShadow: isActive
                            ? "0 0 60px oklch(0.78 0.11 82 / 0.5), 0 30px 60px -20px oklch(0 0 0 / 0.7)"
                            : "0 20px 40px -20px oklch(0 0 0 / 0.6)",
                          transform: isActive ? "translateZ(40px) scale(1.06)" : "translateZ(0)",
                        }}
                      >
                        <img
                          src={it.src}
                          alt={it.alt}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        {/* holo edge */}
                        <div
                          className="pointer-events-none absolute inset-0 rounded-2xl opacity-70 mix-blend-overlay"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.86 0.13 88 / 0.4), transparent 40%, oklch(0.65 0.18 300 / 0.35))",
                          }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                        <div className="absolute inset-x-3 bottom-3">
                          <div className="text-[9px] uppercase tracking-[0.3em] text-primary">
                            {it.subcategory ?? it.category}
                          </div>
                          <div className="mt-0.5 line-clamp-1 font-serif text-base text-foreground">
                            {it.title}
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-primary/60 bg-background/60 text-primary backdrop-blur">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                              <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Center HUD */}
              <div className="pointer-events-none absolute inset-x-0 top-4 mx-auto flex max-w-xs items-center justify-center">
                <div className="rounded-full border border-primary/30 bg-background/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-primary backdrop-blur">
                  {String(activeIdx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · drag to spin
                </div>
              </div>

              {/* Controls */}
              <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center gap-3">
                <button
                  onClick={() => rotateBy(step)}
                  aria-label="Rotate left"
                  className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur transition-all hover:border-primary hover:text-primary"
                >
                  ←
                </button>
                <button
                  onClick={() => setZoom(activeIdx)}
                  className="pointer-events-auto rounded-full border border-primary/60 bg-primary/10 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-primary backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  Open vitrine
                </button>
                <button
                  onClick={() => rotateBy(-step)}
                  aria-label="Rotate right"
                  className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur transition-all hover:border-primary hover:text-primary"
                >
                  →
                </button>
              </div>
            </div>

            {/* Active meta */}
            <div className="mx-auto mt-6 max-w-2xl text-center">
              <div className="text-[11px] uppercase tracking-[0.4em] text-primary">
                {current.subcategory ?? current.category}
              </div>
              <h3 className="mt-2 font-serif text-3xl md:text-4xl">{current.title}</h3>
            </div>
          </>
        )}
      </div>

      {zoom !== null && <Vitrine items={items} index={zoom} onClose={() => setZoom(null)} onNav={(d) => setZoom((z) => (z === null ? z : (z + d + n) % n))} />}
    </section>
  );
}

function Vitrine({
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
  const ref = useRef<HTMLDivElement | null>(null);

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

  // parallax tilt inside vitrine
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1600px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1600px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      {/* aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, oklch(0.65 0.18 300 / 0.5), oklch(0.86 0.13 88 / 0.5), oklch(0.65 0.18 200 / 0.5), oklch(0.65 0.18 300 / 0.5))",
          filter: "blur(140px)",
        }}
      />
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur hover:border-primary hover:text-primary"
      >
        ✕
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur hover:border-primary hover:text-primary md:left-10"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Next"
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur hover:border-primary hover:text-primary md:right-10"
      >
        →
      </button>

      <div
        className="relative mx-6 grid w-full max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr] md:items-center"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ perspective: "1600px" }}
      >
        <div
          ref={ref}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-primary/30 bg-card transition-transform duration-300"
          style={{ boxShadow: "0 0 80px oklch(0.78 0.11 82 / 0.25), var(--shadow-luxe)" }}
        >
          <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.86 0.13 88 / 0.25), transparent 40%, oklch(0.65 0.18 300 / 0.2))",
            }}
          />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.4em] text-primary">
            {item.subcategory ?? item.category} · {index + 1} / {items.length}
          </div>
          <h3 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">{item.title}</h3>
          <div className="mt-6 hairline" />
          <p className="mt-6 text-muted-foreground">
            {item.description ??
              "Handcrafted by Sanchita Bhatia at Creativeskroll — where composition, colour and typography converge into unmistakable brand DNA."}
          </p>
        </div>
      </div>
    </div>
  );
}