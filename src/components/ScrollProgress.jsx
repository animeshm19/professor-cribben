import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-0 right-0 w-1.5 h-full bg-white/5 z-[90]">
      <motion.div
        className="w-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        style={{ 
          height: "100%", 
          scaleY: scrollYProgress, 
          transformOrigin: "top" 
        }}
      />
    </div>
  );
}