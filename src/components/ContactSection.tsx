import { socials } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div
          className="relative overflow-hidden rounded-[36px] border border-primary/25 bg-card p-10 md:p-20"
          style={{ boxShadow: "var(--shadow-luxe)" }}
        >
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
            style={{ background: "var(--gradient-gold)" }}
          />
          <div className="relative">
            <div className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">Let's talk</div>
            <h2 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
              Let's create something <span className="italic text-gold">remarkable</span>.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Available for brand identity, social media, motion and packaging projects — in Jaipur, across India,
              and worldwide. Typical project start within 1–2 weeks.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-gold)] transition-all hover:-translate-y-0.5"
              >
                WhatsApp +91 78914 47123
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-border/70 px-8 py-4 text-sm uppercase tracking-[0.25em] hover:border-primary hover:text-primary"
              >
                Instagram
              </a>
              <a
                href={socials.behance}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-border/70 px-8 py-4 text-sm uppercase tracking-[0.25em] hover:border-primary hover:text-primary"
              >
                Behance
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-border/70 px-8 py-4 text-sm uppercase tracking-[0.25em] hover:border-primary hover:text-primary"
              >
                LinkedIn
              </a>
            </div>

            <div className="mt-12 grid gap-6 border-t border-border/50 pt-8 md:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Based in</div>
                <div className="mt-1 font-serif text-2xl">Jaipur, India</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Working</div>
                <div className="mt-1 font-serif text-2xl">Worldwide · Remote</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Response</div>
                <div className="mt-1 font-serif text-2xl">Within a few hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}