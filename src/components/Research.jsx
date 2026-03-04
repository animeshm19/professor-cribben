import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { siteConfig } from "../data/config";
import { Activity, Target, Scan, Fingerprint } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Research() {
  const containerRef = useRef(null);
  const { researchInterests } = siteConfig;
  const totalItems = researchInterests.length;
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 1 });
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    return smoothProgress.onChange((latest) => {
      const newIndex = Math.min(
        Math.max(Math.floor(latest * totalItems), 0),
        totalItems - 1
      );
      setActiveIndex(newIndex);
    });
  }, [smoothProgress, totalItems]);

  const zPush = useTransform(smoothProgress, [0, 1], [0, 1500]);
  const scanLineY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="research" className="relative h-[400vh] bg-[#fcfcfc] dark:bg-[#050505] transition-colors duration-1000">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-center border-y border-black/5 dark:border-white/5 transition-colors duration-1000">
        
        {/* Terminal Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none transition-colors duration-1000" />
        
        {/* The Scanning Laser */}
        <motion.div 
          style={{ top: scanLineY }} 
          className="absolute left-0 right-0 h-[2px] bg-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-50 pointer-events-none" 
        />
        
        {/* HUD UI: Top Left */}
        <div className="absolute top-20 md:top-8 left-6 md:left-8 flex flex-col gap-2 z-40 pointer-events-none">
          <div className="flex items-center gap-3 text-blue-500 font-mono text-[9px] md:text-xs uppercase tracking-widest">
            <Scan size={14} className="animate-pulse md:w-4 md:h-4" />
            <span>fMRI Volumetric Scrubber</span>
          </div>
          <div className="text-zinc-500 font-mono text-[8px] md:text-[10px] uppercase tracking-widest pl-6 md:pl-7">
            Subject: UAlberta / Node_04
          </div>
        </div>

        {/* HUD UI: Top Right */}
        <div className="absolute top-20 md:top-8 right-6 md:right-8 flex flex-col items-end gap-1 md:gap-2 z-40 pointer-events-none">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-zinc-500 font-mono text-[8px] md:text-xs uppercase tracking-widest">Z-Depth Axis</span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          </div>
          <div className="text-black dark:text-white font-mono text-sm md:text-xl tracking-tighter transition-colors">
            -<motion.span>{useTransform(smoothProgress, p => (p * 1000).toFixed(2))}</motion.span>mm
          </div>
        </div>

        {/* --- CENTER: THE 3D fMRI SLICE SIMULATION --- */}
        {/* Positioned higher on mobile so it doesn't overlap text, and bounded to show the full ring */}
        <div 
          className="absolute inset-0 flex items-start md:items-center justify-center pt-32 md:pt-0 pointer-events-none z-10"
          style={{ perspective: "1000px" }}
        >
          <motion.div 
            style={{ z: zPush }} 
            className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px]"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-blue-500/20 rounded-[40%_60%_70%_50%] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"
                style={{
                  transform: `translateZ(${-i * 150}px)`,
                  boxShadow: i === activeIndex ? "inset 0 0 40px rgba(59,130,246,0.2), 0 0 40px rgba(59,130,246,0.2)" : "none",
                  borderColor: i === activeIndex ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.2)",
                  transition: "all 0.5s ease"
                }}
                animate={{
                  rotateZ: [0, 360],
                  borderRadius: ["40% 60% 70% 50%", "50% 40% 60% 70%", "70% 50% 40% 60%", "40% 60% 70% 50%"]
                }}
                transition={{
                  duration: 20 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-blue-500 dark:bg-white rounded-full shadow-[0_0_20px_5px_rgba(59,130,246,0.5)] dark:shadow-[0_0_30px_10px_rgba(255,255,255,0.8)]" />
              <Target size={40} className="absolute text-blue-500/20 dark:text-white/20 animate-[spin_4s_linear_infinite]" />
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT PANEL: DYNAMIC RESEARCH DATA --- */}
        {/* On mobile: Frosted glass card at the bottom. On Desktop: Right-aligned gradient panel */}
        <div className="absolute inset-x-0 bottom-0 top-auto md:top-0 md:inset-x-auto md:right-0 w-full md:w-[45%] h-[50vh] md:h-full bg-gradient-to-t md:bg-gradient-to-l from-[#fcfcfc] via-[#fcfcfc]/90 dark:from-[#050505] dark:via-[#050505]/90 to-transparent z-30 flex items-end md:items-center justify-center md:justify-end px-6 pb-12 md:pb-0 md:px-16 pointer-events-none transition-colors duration-1000">
          
          <div className="w-full max-w-md relative pointer-events-auto h-[250px] md:h-auto">
            {researchInterests.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : (window.innerWidth < 768 ? 20 : 0),
                    x: isActive ? 0 : (window.innerWidth >= 768 ? 50 : 0),
                    filter: isActive ? "blur(0px)" : "blur(10px)",
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute bottom-0 md:top-1/2 md:-translate-y-1/2 left-0 right-0 flex flex-col bg-white/50 dark:bg-transparent md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border border-black/5 dark:border-transparent md:border-transparent p-6 md:p-0 rounded-3xl md:rounded-none shadow-xl md:shadow-none"
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <Activity size={16} className="text-blue-500" />
                    <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] md:text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded border border-blue-500/20">
                      Coordinate Cluster {item.id}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-5xl font-bold text-black dark:text-white mb-3 md:mb-4 leading-tight transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {item.title}
                  </h3>
                  
                  <div className="w-8 md:w-12 h-[2px] bg-blue-500 mb-4 md:mb-6 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  
                  <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-6 md:mb-8 transition-colors line-clamp-3 md:line-clamp-none">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-6 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] text-zinc-500 font-mono uppercase tracking-widest mb-1">Sector Tag</span>
                      <span className="text-[10px] md:text-xs text-black dark:text-zinc-300 font-mono uppercase tracking-widest flex items-center gap-2 transition-colors">
                        <Fingerprint size={12} className="text-zinc-400" />
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}