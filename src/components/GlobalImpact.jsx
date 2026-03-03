import { useMemo } from "react";
import { motion } from "framer-motion";
import Globe from "./Globe";
import { siteConfig } from "../data/config";

export default function GlobalImpact() {
  const { impact } = siteConfig;

  // We override the default Magic UI config to style it 
  // to match our premium electric blue theme, but without markers.
  const customGlobeConfig = useMemo(() => {
    return {
      width: 800,
      height: 800,
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      dark: 1, 
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.23, 0.51, 0.96],
      glowColor: [0.05, 0.05, 0.08],
      
      // Setting this to an empty array entirely removes the blue tags
      markers: [], 
      
      onRender: () => {}, 
    };
  }, []);

  return (
    <section id="impact" className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden py-24">
      
      {/* 1. OVERLAY VIGNETTE */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] pointer-events-none" />

      {/* 2. HEADER */}
      <div className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 z-20 text-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-[0.5em] uppercase text-zinc-500 flex items-center justify-center gap-6"
        >
          <span className="w-12 h-[1px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          Global Reach
          <span className="w-12 h-[1px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </motion.h2>
      </div>

      {/* 3. THE FULL GLOBE (No Markers) */}
      <div className="relative z-0 w-full max-w-[700px] aspect-square flex items-center justify-center mt-12 px-6">
        <Globe config={customGlobeConfig} />
      </div>

      {/* 4. FLOATING STATS PILL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute bottom-16 md:bottom-24 z-20 flex gap-16 md:gap-32 backdrop-blur-xl bg-zinc-900/40 border border-white/10 px-12 py-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-white mb-1">5+</p>
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">Continents</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-white mb-1">{impact.length}</p>
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">Global Talks</p>
        </div>
      </motion.div>

    </section>
  );
}