import { useRef, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Globe from "./Globe";
import { siteConfig } from "../data/config";
import DecryptedText from "./DecryptedText";
import { useTheme } from "../context/ThemeContext";

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
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleGlobe = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const yGlobe = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const textLeft = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const textRight = useTransform(scrollYProgress, [0, 1], [300, -300]);

  // --- THEME-AWARE GLOBE CONFIG ---
  const customGlobeConfig = useMemo(() => {
    const isDark = theme === "dark";
    return {
      width: 800,
      height: 800,
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      // 'dark' = 1 means dark background (white dots). 'dark' = 0 means light background (dark dots)
      dark: isDark ? 1 : 0, 
      diffuse: 1.2,
      mapSamples: 20000, 
      mapBrightness: isDark ? 12 : 4, 
      baseColor: isDark ? [0.3, 0.3, 0.3] : [0.9, 0.9, 0.9],
      markerColor: [0.23, 0.51, 0.96],
      glowColor: isDark ? [0.1, 0.2, 0.5] : [0.9, 0.95, 1], 
      markers: [], 
      onRender: () => {}, 
    };
  }, [theme]); // Rebuilds the WebGL config when theme changes

  return (
    <section 
      id="impact" 
      ref={containerRef}
      className="relative min-h-[120vh] bg-[#fcfcfc] dark:bg-[#050505] flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000"
    >
      
      {/* Halo Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0 transition-colors duration-1000" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#fcfcfc_80%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)] pointer-events-none z-10 transition-colors duration-1000" />

      {/* --- PARALLAX TEXT --- */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 overflow-hidden opacity-20 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen transition-all duration-1000">
        <motion.div style={{ x: textLeft }} className="whitespace-nowrap">
          <h2 
            className="text-[15vw] font-black tracking-tighter text-black/5 dark:text-white/5 stroke-text transition-colors duration-1000" 
            style={{ WebkitTextStroke: theme === 'dark' ? "2px rgba(255,255,255,0.4)" : "2px rgba(0,0,0,0.2)" }}
          >
            <DecryptedText text="WORLDWIDE" />
          </h2>
        </motion.div>
        <motion.div style={{ x: textRight }} className="whitespace-nowrap -mt-8 md:-mt-24">
          <h2 
            className="text-[15vw] font-black tracking-tighter text-blue-500/5 stroke-text transition-colors duration-1000" 
            style={{ WebkitTextStroke: "2px rgba(59,130,246,0.5)" }}
          >
            <DecryptedText text="INFLUENCE" />
          </h2>
        </motion.div>
      </div>

      <div className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 z-20 text-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-zinc-600 dark:text-zinc-500 flex items-center justify-center gap-4 md:gap-6 transition-colors duration-1000"
        >
          <span className="w-8 md:w-12 h-[1px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          Global Reach
          <span className="w-8 md:w-12 h-[1px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </motion.h2>
      </div>

      <motion.div 
        style={{ scale: scaleGlobe, y: yGlobe }}
        className="relative z-20 w-full max-w-[800px] aspect-square flex items-center justify-center mt-10 md:mt-20 px-6"
      >
        <Globe config={customGlobeConfig} />
      </motion.div>

      {/* --- MOBILE OPTIMIZED HUD PANELS --- */}
      {/* Changed to flex-row and scaled down on mobile to perfectly frame the globe */}
      <div className="absolute bottom-16 md:bottom-32 w-full max-w-7xl px-4 md:px-8 flex flex-row justify-between items-end z-30 pointer-events-none gap-2 md:gap-8">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-md bg-white/60 dark:bg-black/40 border-l border-b border-black/10 dark:border-white/10 p-4 md:p-8 rounded-br-2xl md:rounded-br-3xl w-[140px] md:w-[200px] transition-colors duration-1000 shadow-lg md:shadow-none"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Coverage</span>
          </div>
          <p className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-1 flex items-center transition-colors duration-1000" style={{ fontFamily: "'Syne', sans-serif" }}>
            <AnimatedCounter value={5} />+
          </p>
          <p className="text-[8px] md:text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] transition-colors duration-1000">Continents</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="backdrop-blur-md bg-white/60 dark:bg-black/40 border-r border-t border-blue-500/30 p-4 md:p-8 rounded-tl-2xl md:rounded-tl-3xl w-[140px] md:w-[200px] text-right transition-colors duration-1000 shadow-lg md:shadow-none"
        >
          <div className="flex items-center justify-end gap-2 md:gap-3 mb-2 md:mb-4">
            <span className="text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Talks</span>
            <div className="w-4 md:w-8 h-[1px] bg-blue-500/50" />
          </div>
          <p className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-1 transition-colors duration-1000" style={{ fontFamily: "'Syne', sans-serif" }}>
            <AnimatedCounter value={impact.length} />
          </p>
          <p className="text-[8px] md:text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] transition-colors duration-1000">Global Events</p>
        </motion.div>

      </div>

    </section>
  );
}