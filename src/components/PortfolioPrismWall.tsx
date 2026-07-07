import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio, categories, type PortfolioItem } from "@/data/portfolio";

/**
 * Sample 3 — "Prism Cascade"
 * Isometric 3D wall. Cards float on a tilted plane that parallax-tracks the
 * cursor. Hover flips each card in 3D to reveal meta on the back. Ambient
 * rotating prisms drift behind the grid. Emerald / teal / hot-pink theme on
 * deep navy — deliberately different from Stage (gold) and Orbit (iridescent).
 */
export function PortfolioPrismWall() {
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(
    () => (cat === "All" ? portfolio : portfolio.filter((i) => i.category === cat)).slice(0, 18),
    [cat],
  );

  const onMove = (e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x, y });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="work"
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse at top, oklch(0.22 0.08 250 / 0.6), transparent 60%), radial-gradient(ellipse at bottom right, oklch(0.28 0.14 340 / 0.35), transparent 55%)",
      }}
    >
      {/* Floating prisms */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <FloatingPrism className="left-[8%] top-[12%]" size={140} hue="emerald" delay={0} />
        <FloatingPrism className="right-[10%] top-[20%]" size={180} hue="pink" delay={3} />
        <FloatingPrism className="left-[20%] bottom-[8%]" size={110} hue="teal" delay={6} />
        <FloatingPrism className="right-[22%] bottom-[15%]" size={160} hue="violet" delay={2} />
        {/* grid floor */}
        <div
          className="absolute inset-x-0 bottom-0 h-[60%] opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.7 0.15 170) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.15 170) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "perspective(800px) rotateX(60deg)",
            transformOrigin: "center bottom",
            maskImage: "linear-gradient(to top, black, transparent 80%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div
          className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em]"
          style={{ color: "oklch(0.82 0.16 170)" }}
        >
          <span className="h-px w-8" style={{ background: "oklch(0.82 0.16 170 / 0.6)" }} /> Prism cascade · sample 03
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
            An isometric{" "}
            <span className="italic" style={{ color: "oklch(0.82 0.16 170)" }}>
              wall
            </span>{" "}
            of{" "}
            <span className="italic" style={{ color: "oklch(0.78 0.2 340)" }}>
              craft
            </span>
            .
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Move your cursor — the entire plane parallaxes. Hover any tile to flip it in 3D.
            Click to open the full case.
          </p>
        </div>

        {/* Category tokens */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="rounded-md border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-all"
                style={
                  active
                    ? {
                        borderColor: "oklch(0.82 0.16 170)",
                        color: "oklch(0.9 0.14 170)",
                        background: "oklch(0.82 0.16 170 / 0.12)",
                        boxShadow: "0 0 20px oklch(0.82 0.16 170 / 0.35)",
                      }
                    : {
                        borderColor: "oklch(0.35 0.02 250 / 0.6)",
                        color: "oklch(0.7 0.03 250)",
                      }
                }
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Isometric stage */}
        <div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="mt-14"
          style={{ perspective: "1800px", perspectiveOrigin: "50% 40%" }}
        >
          <div
            className="grid grid-cols-2 gap-5 transition-transform duration-500 ease-out md:grid-cols-3 lg:grid-cols-4"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${18 - tilt.y * 10}deg) rotateY(${-14 + tilt.x * 14}deg) rotateZ(-2deg)`,
            }}
          >
            {items.map((it, i) => (
              <PrismTile key={it.id} item={it} index={i} onOpen={() => setOpen(i)} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          {items.length} tiles · hover to flip · click to open
        </div>
      </div>

      {open !== null && (
        <PrismLightbox
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onNav={(d) => setOpen((z) => (z === null ? z : (z + d + items.length) % items.length))}
        />
      )}
    </section>
  );
}

function PrismTile({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  // stagger depth per tile for organic wall depth
  const z = ((index * 37) % 60) - 30;
  const accents = ["oklch(0.82 0.16 170)", "oklch(0.78 0.2 340)", "oklch(0.75 0.16 220)", "oklch(0.85 0.17 90)"];
  const accent = accents[index % accents.length];

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="group relative aspect-[3/4] w-full text-left"
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${z}px) translateY(${(index % 3) * 8}px)`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `${accent.replace(")", " / 0.4)")}`,
            boxShadow: `0 30px 60px -30px oklch(0 0 0 / 0.8), 0 0 0 1px ${accent.replace(")", " / 0.15)")} inset`,
          }}
        >
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-70"
            style={{
              background: `linear-gradient(135deg, ${accent.replace(")", " / 0.35)")}, transparent 45%)`,
            }}
          />
          <div className="absolute inset-x-3 bottom-3">
            <div
              className="text-[9px] uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              {item.subcategory ?? item.category}
            </div>
            <div className="mt-0.5 line-clamp-1 font-serif text-sm">{item.title}</div>
          </div>
          {/* corner index */}
          <div
            className="absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[9px] tracking-[0.2em] backdrop-blur"
            style={{ borderColor: `${accent.replace(")", " / 0.5)")}`, color: accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border p-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${accent.replace(")", " / 0.6)")}`,
            background: `linear-gradient(160deg, oklch(0.18 0.04 250), oklch(0.12 0.03 260))`,
            boxShadow: `0 30px 60px -30px oklch(0 0 0 / 0.8), 0 0 40px ${accent.replace(")", " / 0.25)")} inset`,
          }}
        >
          <div>
            <div
              className="text-[9px] uppercase tracking-[0.35em]"
              style={{ color: accent }}
            >
              {item.category}
            </div>
            <h4 className="mt-3 font-serif text-lg leading-tight">{item.title}</h4>
            <div
              className="mt-3 h-px w-10"
              style={{ background: `${accent.replace(")", " / 0.6)")}` }}
            />
            <p className="mt-3 line-clamp-4 text-xs text-muted-foreground">
              {item.description ??
                "Designed at Creativeskroll — composition, colour and typography converging into unmistakable brand DNA."}
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-[9px] uppercase tracking-[0.3em]"
            style={{ borderColor: `${accent.replace(")", " / 0.6)")}`, color: accent }}
          >
            Open case
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function FloatingPrism({
  className,
  size,
  hue,
  delay,
}: {
  className: string;
  size: number;
  hue: "emerald" | "pink" | "teal" | "violet";
  delay: number;
}) {
  const colors: Record<string, string> = {
    emerald: "oklch(0.78 0.17 165)",
    pink: "oklch(0.72 0.22 340)",
    teal: "oklch(0.75 0.14 210)",
    violet: "oklch(0.68 0.18 300)",
  };
  const c = colors[hue];
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        animation: `prism-drift 18s ease-in-out ${delay}s infinite`,
      }}
    >
      <div
        className="h-full w-full rounded-3xl opacity-60 blur-2xl"
        style={{
          background: `conic-gradient(from 0deg, ${c}, transparent, ${c})`,
          transform: "rotate(20deg)",
        }}
      />
      <style>{`
        @keyframes prism-drift {
          0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(20px,-30px,0) rotate(60deg); }
        }
      `}</style>
    </div>
  );
}

function PrismLightbox({
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
      className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.15 0.05 250 / 0.98), oklch(0.08 0.03 260 / 0.98))",
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur"
        style={{ borderColor: "oklch(0.82 0.16 170 / 0.5)", color: "oklch(0.82 0.16 170)" }}
      >
        ✕
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur md:left-10"
        style={{ borderColor: "oklch(0.82 0.16 170 / 0.5)", color: "oklch(0.82 0.16 170)" }}
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Next"
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur md:right-10"
        style={{ borderColor: "oklch(0.82 0.16 170 / 0.5)", color: "oklch(0.82 0.16 170)" }}
      >
        →
      </button>

      <div
        className="mx-6 grid w-full max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr] md:items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border"
          style={{
            borderColor: "oklch(0.82 0.16 170 / 0.35)",
            boxShadow: "0 0 80px oklch(0.82 0.16 170 / 0.25), 0 40px 80px -20px oklch(0 0 0 / 0.8)",
          }}
        >
          <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
        </div>
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.4em]"
            style={{ color: "oklch(0.82 0.16 170)" }}
          >
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