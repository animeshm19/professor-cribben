import { useRef, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Globe from "./Globe";
import { siteConfig } from "../data/config";
import DecryptedText from "./DecryptedText";

// --- NEW: High-Tech Number Ticker ---
function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 50, damping: 20, mass: 1 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function GlobalImpact() {
  const { impact } = siteConfig;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleGlobe = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const yGlobe = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const textLeft = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const textRight = useTransform(scrollYProgress, [0, 1], [300, -300]);

  // --- UPGRADED GLOBE CONFIG (Brighter, Richer Glow) ---
  const customGlobeConfig = useMemo(() => {
    return {
      width: 800,
      height: 800,
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      dark: 1, 
      diffuse: 1.2,
      mapSamples: 20000, 
      mapBrightness: 12, // Increased brightness for popping dots
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.23, 0.51, 0.96],
      glowColor: [0.1, 0.2, 0.5], // Changed to a rich, bleeding electric blue
      markers: [], 
      onRender: () => {}, 
    };
  }, []);

  return (
    <section 
      id="impact" 
      ref={containerRef}
      className="relative min-h-[120vh] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      
      {/* Halo Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)] pointer-events-none z-10" />

      {/* --- UPGRADED PARALLAX TEXT (Brighter, Thicker Stroke, Faint Fill) --- */}
      {/* --- UPGRADED PARALLAX TEXT --- */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 overflow-hidden opacity-60 mix-blend-screen">
        <motion.div style={{ x: textLeft }} className="whitespace-nowrap">
          <h2 
            className="text-[15vw] font-black tracking-tighter text-white/5 stroke-text" 
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)" }}
          >
            {/* The Decryption Component */}
            <DecryptedText text="WORLDWIDE" />
          </h2>
        </motion.div>
        <motion.div style={{ x: textRight }} className="whitespace-nowrap -mt-12 md:-mt-24">
          <h2 
            className="text-[15vw] font-black tracking-tighter text-blue-500/5 stroke-text" 
            style={{ WebkitTextStroke: "2px rgba(59,130,246,0.5)" }}
          >
             {/* The Decryption Component */}
            <DecryptedText text="INFLUENCE" />
          </h2>
        </motion.div>
      </div>

      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20 text-center w-full">
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

      {/* THE 3D SCALING GLOBE */}
      <motion.div 
        style={{ scale: scaleGlobe, y: yGlobe }}
        className="relative z-20 w-full max-w-[800px] aspect-square flex items-center justify-center mt-20 px-6"
      >
        <Globe config={customGlobeConfig} />
      </motion.div>

      {/* ASYMMETRICAL HUD DATA PANELS */}
      <div className="absolute bottom-20 md:bottom-32 w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-end z-30 pointer-events-none gap-8">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-md bg-black/40 border-l border-b border-white/10 p-6 md:p-8 rounded-br-3xl w-[200px]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Coverage</span>
          </div>
          <p className="text-5xl font-bold text-white mb-1 flex items-center" style={{ fontFamily: "'Syne', sans-serif" }}>
            <AnimatedCounter value={5} />+
          </p>
          <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.2em]">Continents</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="backdrop-blur-md bg-black/40 border-r border-t border-blue-500/20 p-6 md:p-8 rounded-tl-3xl w-[200px] text-right"
        >
          <div className="flex items-center justify-end gap-3 mb-4">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Keynotes & Seminars</span>
            <div className="w-8 h-[1px] bg-blue-500/50" />
          </div>
          <p className="text-5xl font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            {/* --- UPGRADED TICKER --- */}
            <AnimatedCounter value={impact.length} />
          </p>
          <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.2em]">Global Talks</p>
        </motion.div>

      </div>

    </section>
  );
}