import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Rapidly tick up the percentage
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Wait a beat at 100% before triggering the exit
          return 100;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: "-100vh" }} // The upward curtain wipe
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <motion.div 
        exit={{ opacity: 0, scale: 0.9 }} 
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="text-zinc-600 font-mono text-xs tracking-[0.5em] uppercase mb-6 flex items-center justify-center gap-4">
          <span className="w-8 h-[1px] bg-blue-500/50" />
          Initializing
          <span className="w-8 h-[1px] bg-blue-500/50" />
        </p>
        <div className="text-8xl md:text-9xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
          {progress}<span className="text-blue-500 text-6xl">%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}