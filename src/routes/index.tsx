import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { useState } from "react";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { PortfolioCarousel3D } from "@/components/PortfolioCarousel3D";
import { PortfolioPrismWall } from "@/components/PortfolioPrismWall";
import { MotionShowcase } from "@/components/MotionShowcase";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [variant, setVariant] = useState<"stage" | "orbit" | "prism">("stage");
  return (
    <div className="relative min-h-screen">
      <SiteNav />
      <main className="relative z-10">
        <Hero />
        <div className="mx-auto flex max-w-7xl justify-center px-6 pt-8 md:px-10">
          <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/40 p-1 text-[10px] uppercase tracking-[0.3em] backdrop-blur">
            <button
              onClick={() => setVariant("stage")}
              className={`rounded-full px-4 py-2 transition-all ${variant === "stage" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
            >
              Sample 01 · Stage
            </button>
            <button
              onClick={() => setVariant("orbit")}
              className={`rounded-full px-4 py-2 transition-all ${variant === "orbit" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
            >
              Sample 02 · Orbit
            </button>
            <button
              onClick={() => setVariant("prism")}
              className={`rounded-full px-4 py-2 transition-all ${variant === "prism" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
            >
              Sample 03 · Prism
            </button>
          </div>
        </div>
        {variant === "stage" && <PortfolioGallery />}
        {variant === "orbit" && <PortfolioCarousel3D />}
        {variant === "prism" && <PortfolioPrismWall />}
        <MotionShowcase />
        <ServicesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
