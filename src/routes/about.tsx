import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { socials } from "@/data/portfolio";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const philosophy = [
  {
    title: "Simplicity over complexity",
    body: "The best logos in the world — Nike, Apple, Mercedes — are deceptively simple. They're simple because the designer had the discipline to distil the brand's essence into a single, enduring mark.",
  },
  {
    title: "Strategy before aesthetics",
    body: "Trends are temporary. I design with longevity in mind — every decision rooted in what is true about the brand, not what is popular this month.",
  },
  {
    title: "Full ownership for every client",
    body: "You pay for a logo, you own the logo — completely. Every source file, every format, every variant. No licensing arrangements, no ongoing dependency.",
  },
];

const industries = [
  "Food & Restaurants", "Retail & Fashion", "Technology & Startups",
  "Coaching & Personal Development", "Events & Hospitality", "Real Estate",
  "Healthcare", "Education", "Media & Entertainment",
];

function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <SiteNav />
      <main className="relative z-10 pt-40 pb-24 md:pt-48">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">About</div>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight">
            Where brands become <span className="italic text-gold">unforgettable</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            8+ years of brand identity and graphic design. 60+ brands delivered across India and worldwide.
            Founder of Creativeskroll — a design studio that builds brands that are strategic, timeless, and impossible to forget.
          </p>
        </div>

        <section className="mx-auto mt-24 grid max-w-6xl gap-16 px-6 md:grid-cols-[1fr_1.3fr] md:px-10">
          <div>
            <div className="tilt-card overflow-hidden rounded-3xl border border-primary/20" style={{ boxShadow: "var(--shadow-luxe)" }}>
              <img src="/assets/sanchita.png" alt="Sanchita Bhatia, founder of Creativeskroll" className="w-full" />
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border/50 pt-6">
              {[{ n: "8+", l: "Years" }, { n: "60+", l: "Brands" }, { n: "∞", l: "Ideas" }].map((s) => (
                <div key={s.l}>
                  <div className="font-serif text-3xl text-gold">{s.n}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-3xl text-foreground">About Sanchita Bhatia</h2>
            <p>I'm a graphic designer and brand identity expert based in Jaipur, Rajasthan with over 8 years of professional experience. I founded Creativeskroll with a single conviction: that every business, regardless of size, deserves design that is original, strategic, and built for them.</p>
            <p>My work sits at the intersection of visual design and brand thinking. Before I open any design software, I understand the business, the audience, the competitors, and the market. The logos and brand identities I design are built to work — strategically, visually, and commercially — not just to look good.</p>
            <p>In 8+ years I've designed brand identities for restaurants, startups, retail brands, fashion labels, coaches, event companies, real-estate developers, content creators, and corporate clients across India and internationally in the UAE, UK, USA, Canada, Singapore and Australia.</p>
          </div>
        </section>

        <section className="mx-auto mt-32 max-w-6xl px-6 md:px-10">
          <h2 className="font-serif text-4xl md:text-5xl">Design philosophy</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {philosophy.map((p, i) => (
              <div key={p.title} className="tilt-card rounded-3xl border border-border/60 bg-card p-8" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="font-serif text-5xl text-primary/40">0{i + 1}</div>
                <h3 className="mt-6 font-serif text-2xl">{p.title}</h3>
                <p className="mt-3 text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-32 max-w-6xl px-6 md:px-10">
          <h2 className="font-serif text-4xl md:text-5xl">Industries served</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((i) => (
              <span key={i} className="rounded-full border border-border/60 px-5 py-2 text-sm text-muted-foreground">{i}</span>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-muted-foreground">
            Projects delivered for clients in Jaipur, Delhi, Mumbai, Bangalore and across India, plus international work in the UAE, UK, USA, Canada, Singapore and Australia.
          </p>
        </section>

        <section className="mx-auto mt-32 max-w-6xl px-6 md:px-10">
          <div className="relative overflow-hidden rounded-[36px] border border-primary/25 bg-card p-10 md:p-16" style={{ boxShadow: "var(--shadow-luxe)" }}>
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]" style={{ background: "var(--gradient-gold)" }} />
            <div className="relative">
              <h2 className="font-serif text-4xl leading-[1.05] md:text-5xl">
                Start a project with <span className="italic text-gold">Creativeskroll</span>.
              </h2>
              <p className="mt-6 max-w-xl text-muted-foreground">
                The fastest way to start a conversation is WhatsApp. Send a brief description of your project and I'll respond within a few hours. Typical project start within 1–2 weeks.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={socials.whatsapp} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)]">
                  WhatsApp +91 78914 47123
                </a>
                <a href="/#work" className="inline-flex items-center gap-3 rounded-full border border-border/70 px-7 py-3.5 text-sm uppercase tracking-[0.2em]">
                  See the work →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
