import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "../data/config";
import { cn } from "../lib/utils";
import { ArrowUpRight, BookMarked } from "lucide-react";

const pageTurnVariants = {
  initial: { rotateY: 90, opacity: 0, scale: 0.98 },
  animate: { 
    rotateY: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 15, mass: 1.5 } 
  },
  exit: { 
    rotateY: -90, 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } 
  }
};

// Generates a high-performance mathematical paper grain texture
const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function Publications() {
  const [currentPage, setCurrentPage] = useState(0);
  const { publications } = siteConfig;
  const activePub = publications[currentPage];

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 30, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section 
      id="publications" 
      className="relative min-h-screen bg-[#050505] flex items-center justify-center py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "2000px" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
        
        <div className="mb-16 w-full max-w-5xl">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.4em] uppercase text-zinc-500 flex items-center gap-5"
          >
            <span className="w-10 h-[1px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            The Archive
          </motion.h2>
        </div>

        <motion.div 
          data-hide-cursor="true" 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full max-w-5xl h-[600px] md:h-[550px] cursor-auto group"
        >
          
          <div className="absolute inset-0 bg-[#08080a] rounded-xl translate-y-4 translate-x-4 shadow-[30px_30px_60px_rgba(0,0,0,0.9)] border border-white/5" style={{ transform: "translateZ(-20px)" }} />
          <div className="absolute inset-0 bg-[#0a0a0c] rounded-xl translate-y-2 translate-x-2 border border-white/5" style={{ transform: "translateZ(-10px)" }} />

          <div className="absolute inset-0 flex flex-col md:flex-row bg-[#0c0c0e] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
            
            {/* --- LEFT PAGE (TABLE OF CONTENTS) --- */}
            <div className="relative w-full md:w-1/2 h-full p-10 md:p-14 flex flex-col z-20 bg-[#0c0c0e]">
              
              {/* --- NEW: PAPER TEXTURE & AGED BORDERS --- */}
              <div 
                className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay z-0" 
                style={{ backgroundImage: paperTexture }} 
              />
              <div className="absolute inset-0 shadow-[inset_15px_15px_50px_rgba(0,0,0,0.8)] pointer-events-none z-0" />
              {/* --------------------------------------- */}

              <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-black/90 via-black/40 to-transparent pointer-events-none z-30" />

              <h3 className="text-xl font-bold text-zinc-200 mb-2 flex items-center gap-3 relative z-10" style={{ fontFamily: "'Syne', sans-serif" }}>
                <BookMarked size={20} className="text-blue-500" />
                Table of Contents
              </h3>
              <p className="text-xs font-mono tracking-widest text-zinc-600 mb-8 uppercase relative z-10">
                {publications.length} Selected Works
              </p>
              
              <div className="flex-grow overflow-y-auto pr-6 custom-scrollbar flex flex-col gap-6 relative z-40">
                {publications.map((pub, index) => {
                  const isActive = currentPage === index;
                  return (
                    <button
                      key={pub.id}
                      onClick={() => setCurrentPage(index)}
                      className="group relative flex items-center w-full text-left outline-none shrink-0 cursor-pointer"
                    >
                      <span className={cn(
                        "text-sm font-semibold w-8 shrink-0 transition-colors duration-300",
                        isActive ? "text-blue-500" : "text-zinc-500 group-hover:text-zinc-300"
                      )}>
                        {pub.id}.
                      </span>
                      
                      <span className={cn(
                        "text-sm transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis max-w-[55%]",
                        isActive ? "text-zinc-100 font-medium translate-x-1" : "text-zinc-400 group-hover:text-zinc-300"
                      )}>
                        {pub.title}
                      </span>
                      
                      <span className="flex-grow border-b border-dotted border-zinc-700 mx-3 opacity-30" />
                      
                      <span className={cn(
                        "text-[10px] font-mono transition-colors shrink-0",
                        isActive ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400"
                      )}>
                        {pub.year}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-white/5 pt-4 flex justify-between text-[10px] font-mono text-zinc-600 relative z-10">
                <span>Dr. Ivor Cribben</span>
                <span>Vol. I</span>
              </div>
            </div>

            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-black/90 via-white/5 to-black/90 shadow-[inset_0_0_20px_rgba(0,0,0,1)] border-x border-white/5" />
            </div>

            {/* --- RIGHT PAGE (MANUSCRIPT CONTENT) --- */}
            <div className="relative w-full md:w-1/2 h-full z-10 bg-[#0a0a0c]" style={{ perspective: "1500px" }}>
              
              <div className="absolute right-0 top-1 bottom-1 w-1 bg-zinc-800 rounded-r shadow-[-2px_0_5px_rgba(0,0,0,0.5)] z-0" />
              <div className="absolute right-1 top-2 bottom-2 w-1 bg-zinc-700 rounded-r shadow-[-2px_0_5px_rgba(0,0,0,0.5)] z-0" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  variants={pageTurnVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                  className="absolute inset-0 w-full h-full bg-[#0e0e11] p-10 md:p-14 flex flex-col border-l border-white/5 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
                >
                  
                  {/* --- NEW: PAPER TEXTURE & AGED BORDERS --- */}
                  <div 
                    className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay z-0" 
                    style={{ backgroundImage: paperTexture }} 
                  />
                  <div className="absolute inset-0 shadow-[inset_-15px_15px_50px_rgba(0,0,0,0.8)] pointer-events-none z-0" />
                  {/* --------------------------------------- */}

                  <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/90 via-black/20 to-transparent pointer-events-none z-20" />

                  <motion.div 
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-20"
                  />

                  <div className="flex items-center justify-between mb-10 relative z-30">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-tighter">Chapter {activePub.id}</span>
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      {activePub.year}
                    </span>
                  </div>

                  <div className="relative z-30 flex-grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-6 leading-tight drop-shadow-md" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {activePub.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-8 opacity-40">
                      <span className="w-12 h-[1px] bg-blue-500" />
                      <span className="w-2 h-2 rotate-45 border border-blue-500" />
                      <span className="w-12 h-[1px] bg-blue-500" />
                    </div>

                    <p className="text-lg text-zinc-300 font-light italic mb-4 leading-relaxed mix-blend-screen">
                      {activePub.authors}
                    </p>
                    <p className="text-xs font-mono text-blue-500/80 uppercase tracking-widest border-l-2 border-blue-500 pl-4 mt-6">
                      {activePub.journal}
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between relative z-30">
                    <div className="text-[10px] font-mono text-zinc-600">Pg. {activePub.year}</div>
                    <a 
                      href={activePub.link}
                      className="group flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white transition-all bg-blue-500/10 px-5 py-2.5 rounded-full border border-blue-500/20 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer"
                    >
                      READ MANUSCRIPT 
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(59, 130, 246, 0.15); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
      `}</style>
    </section>
  );
}