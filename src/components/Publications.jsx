import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../data/config";
import { cn } from "../lib/utils";
import { ArrowUpRight, BookMarked } from "lucide-react";

const pageTurnVariants = {
  initial: { rotateY: -90, opacity: 0 },
  animate: { 
    rotateY: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 80, damping: 20, mass: 1 } 
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export default function Publications() {
  const [currentPage, setCurrentPage] = useState(0);
  const { publications } = siteConfig;
  const activePub = publications[currentPage];

  return (
    <section id="publications" className="relative min-h-screen bg-[#050505] flex items-center justify-center py-32 overflow-hidden">
      
      {/* Background Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
        
        <div className="mb-12 w-full max-w-5xl">
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

        {/* --- THE PHYSICAL BOOK CONTAINER --- */}
        <div className="relative w-full max-w-5xl h-[600px] md:h-[550px] perspective-[2000px] group">
          
          {/* HARDCOVER EDGES */}
          <div className="absolute inset-2 bg-zinc-800 rounded-xl translate-y-3 translate-x-3 shadow-2xl" />
          <div className="absolute inset-0 flex flex-col md:flex-row bg-[#0c0c0e] rounded-xl border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* --- LEFT PAGE (SCROLLABLE TABLE OF CONTENTS) --- */}
            <div className="relative w-full md:w-1/2 h-full p-10 md:p-14 flex flex-col z-20 bg-[#0c0c0e]">
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />

              <h3 className="text-xl font-bold text-zinc-200 mb-2 flex items-center gap-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                <BookMarked size={20} className="text-blue-500" />
                Table of Contents
              </h3>
              <p className="text-xs font-mono tracking-widest text-zinc-600 mb-8 uppercase">
                {publications.length} Selected Works
              </p>
              
              {/* FIXED: The Scrollable Ledger Container */}
              <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar flex flex-col gap-5">
                {publications.map((pub, index) => {
                  const isActive = currentPage === index;
                  return (
                    <button
                      key={pub.id}
                      onClick={() => setCurrentPage(index)}
                      className="group relative flex items-center w-full text-left outline-none shrink-0"
                    >
                      <span className={cn(
                        "text-sm font-semibold w-8 shrink-0 transition-colors",
                        isActive ? "text-blue-500" : "text-zinc-500 group-hover:text-zinc-300"
                      )}>
                        {pub.id}.
                      </span>
                      
                      <span className={cn(
                        "text-sm transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-[55%]",
                        isActive ? "text-zinc-200 font-medium" : "text-zinc-400 group-hover:text-zinc-300"
                      )}>
                        {pub.title}
                      </span>
                      
                      <span className="flex-grow border-b border-dotted border-zinc-800 mx-3 opacity-30" />
                      
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

              <div className="mt-6 border-t border-white/5 pt-4 flex justify-between text-[10px] font-mono text-zinc-600">
                <span>Ivor Cribben</span>
                <span>Vol. I</span>
              </div>
            </div>

            {/* --- THE CENTER SPINE --- */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-black/80 via-white/5 to-black/80 shadow-[inset_0_0_10px_rgba(0,0,0,1)]" />
            </div>

            {/* --- RIGHT PAGE (PUBLICATION CONTENT) --- */}
            <div className="relative w-full md:w-1/2 h-full z-10 transform-style-3d bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  variants={pageTurnVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ transformOrigin: "left center" }}
                  className="absolute inset-0 w-full h-full bg-[#0e0e11] p-10 md:p-14 flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />

                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <span className="text-xs font-mono text-zinc-600 uppercase tracking-tighter">Chapter {activePub.id}</span>
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                      {activePub.year}
                    </span>
                  </div>

                  <div className="relative z-10 flex-grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-6 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {activePub.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-8 opacity-30">
                      <span className="w-12 h-[1px] bg-blue-500" />
                      <span className="w-2 h-2 rotate-45 border border-blue-500" />
                      <span className="w-12 h-[1px] bg-blue-500" />
                    </div>

                    <p className="text-lg text-zinc-300 font-light italic mb-4">
                      {activePub.authors}
                    </p>
                    <p className="text-xs font-mono text-blue-500/80 uppercase tracking-widest border-l-2 border-blue-500 pl-4">
                      {activePub.journal}
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between relative z-10">
                    <div className="text-[10px] font-mono text-zinc-600">Pg. {activePub.year}</div>
                    <a 
                      href={activePub.link}
                      className="group flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-white transition-all bg-blue-500/5 px-4 py-2 rounded-full border border-blue-500/20 hover:bg-blue-500"
                    >
                      READ MANUSCRIPT 
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(59, 130, 246, 0.2); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
      `}</style>
    </section>
  );
}