import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { siteConfig } from "../data/config";
import { Activity, Target, Scan, Fingerprint } from "lucide-react";

export default function Research() {
  const containerRef = useRef(null);
  const { researchInterests } = siteConfig;
  const totalItems = researchInterests.length;

  // Track the scroll progress through this massive 400vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll data for physics
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 1 });

  // Map the scroll progress to an active index (0 to 5)
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    return smoothProgress.onChange((latest) => {
      // Calculate which research item should be active based on scroll depth
      const newIndex = Math.min(
        Math.max(Math.floor(latest * totalItems), 0),
        totalItems - 1
      );
      setActiveIndex(newIndex);
    });
  }, [smoothProgress, totalItems]);

  // 3D Camera Push Effect
  const zPush = useTransform(smoothProgress, [0, 1], [0, 1500]);
  const scanLineY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="research" className="relative h-[400vh] bg-[#050505]">
      
      {/* THE PINNED MEDICAL TERMINAL */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-y border-white/5">
        
        {/* Terminal Background Grid & Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <motion.div 
          style={{ top: scanLineY }} 
          className="absolute left-0 right-0 h-[2px] bg-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-50 pointer-events-none" 
        />
        
        {/* HUD UI: Top Left */}
        <div className="absolute top-8 left-8 flex flex-col gap-2 z-40 pointer-events-none hidden md:flex">
          <div className="flex items-center gap-3 text-blue-500 font-mono text-xs uppercase tracking-widest">
            <Scan size={16} className="animate-pulse" />
            <span>fMRI Volumetric Scrubber</span>
          </div>
          <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest pl-7">
            Subject: UAlberta / Node_04
          </div>
        </div>

        {/* HUD UI: Top Right (Live Depth Tracker) */}
        <div className="absolute top-8 right-8 flex flex-col items-end gap-2 z-40 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Z-Depth Axis</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          </div>
          <div className="text-white font-mono text-xl tracking-tighter">
            -<motion.span>{useTransform(smoothProgress, p => (p * 1000).toFixed(2))}</motion.span>mm
          </div>
        </div>

        {/* --- CENTER: THE 3D fMRI SLICE SIMULATION --- */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ perspective: "1000px" }}
        >
          <motion.div 
            style={{ z: zPush }} 
            className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]"
          >
            {/* Generate 8 layered "slices" of the brain visualization */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-blue-500/20 rounded-[40%_60%_70%_50%] mix-blend-screen"
                style={{
                  transform: `translateZ(${-i * 150}px)`,
                  boxShadow: i === activeIndex ? "inset 0 0 50px rgba(59,130,246,0.3), 0 0 50px rgba(59,130,246,0.2)" : "none",
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
            
            {/* Central glowing core targeting the active node */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.8)]" />
              <Target size={40} className="absolute text-white/20 animate-[spin_4s_linear_infinite]" />
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT PANEL: DYNAMIC RESEARCH DATA --- */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[40%] bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent z-30 flex items-center justify-end px-6 md:px-16 pointer-events-none">
          
          <div className="w-full max-w-md relative pointer-events-auto">
            {researchInterests.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 50,
                    filter: isActive ? "blur(0px)" : "blur(10px)",
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Activity size={18} className="text-blue-500" />
                    <span className="bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded border border-blue-500/20">
                      Coordinate Cluster {item.id}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {item.title}
                  </h3>
                  
                  <div className="w-12 h-[2px] bg-blue-500 mb-6 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  
                  <p className="text-zinc-400 font-light text-lg leading-relaxed mb-8 mix-blend-screen">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-6 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-1">Sector Tag</span>
                      <span className="text-xs text-zinc-300 font-mono uppercase tracking-widest flex items-center gap-2">
                        <Fingerprint size={12} className="text-zinc-500" />
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* HUD UI: Bottom Left Tracker */}
        <div className="absolute bottom-8 left-8 flex items-end gap-6 z-40 pointer-events-none hidden md:flex">
          <div className="flex gap-1 items-end h-8">
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-1.5 bg-blue-500/50 rounded-t"
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                style={{ 
                  backgroundColor: activeIndex === i ? "rgba(59,130,246,1)" : "rgba(59,130,246,0.2)",
                  boxShadow: activeIndex === i ? "0 0 10px rgba(59,130,246,0.8)" : "none"
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Dataset {activeIndex + 1} / {totalItems}
          </span>
        </div>

      </div>
    </section>
  );
}