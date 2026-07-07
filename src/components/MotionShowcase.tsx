import { useEffect, useState } from "react";
import { motionReel, type MotionItem } from "@/data/portfolio";

const thumb = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
const preview = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

export function MotionShowcase() {
  const [active, setActive] = useState<MotionItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", on);
      document.body.style.overflow = "";
    };
  }, [active]);

  const groups: MotionItem["category"][] = ["Event Films", "Brand Promotions"];

  return (
    <section id="motion" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
          <span className="h-px w-8 bg-primary/60" /> Motion & film
        </div>
        <h2 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
          Stories that move — <span className="italic text-gold">quietly cinematic</span>.
        </h2>

        <div className="mt-14 space-y-16">
          {groups.map((g) => {
            const items = motionReel.filter((m) => m.category === g);
            return (
              <div key={g}>
                <div className="mb-6 flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl">{g}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {items.length} films
                  </span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActive(m)}
                      className="tilt-card group relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-card text-left"
                      style={{ boxShadow: "var(--shadow-card)" }}
                    >
                      <img
                        src={thumb(m.driveId)}
                        alt={`${m.title} — motion film thumbnail`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 bg-background/60 backdrop-blur transition-all group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{g}</div>
                        <div className="mt-1 font-serif text-lg">{m.title}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close video"
            onClick={() => setActive(null)}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 hover:border-primary hover:text-primary"
          >
            ✕
          </button>
          <div
            className="relative mx-6 aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-primary/20 bg-black shadow-[var(--shadow-luxe)]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={preview(active.driveId)}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={active.title}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}