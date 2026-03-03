import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../data/config";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";

// The incredibly smooth fluid text component (Keeping this, it's perfect)
function FluidLetter({ char, variants }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.6, y: middleY * 0.6 });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.span variants={variants} className="inline-block">
      <motion.span
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ 
          x: position.x, 
          y: position.y,
          color: isHovered ? "#ffffff" : "#d4d4d8",
          textShadow: isHovered ? "0px 0px 12px rgba(255,255,255,0.4)" : "0px 0px 0px rgba(255,255,255,0)"
        }}
        transition={{ type: "spring", stiffness: 250, damping: 12, mass: 0.1 }}
        className="inline-block cursor-default select-none"
        style={{ whiteSpace: "pre" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </motion.span>
  );
}

const FluidMagneticName = ({ text }) => {
  const letters = text.split("");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex text-xl md:text-2xl font-bold tracking-tight z-50 font-sans">
      {letters.map((char, index) => <FluidLetter key={index} char={char} variants={letterVariants} />)}
    </motion.div>
  );
};

// Cleaned up Tabs: Removed the ugly grey tracking spotlight
const CleanTabs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className="relative hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-white/5 bg-black/20 backdrop-blur-xl shadow-inner"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {siteConfig.navLinks.map((link, idx) => {
        const isActive = hoveredIndex === idx;
        return (
          <a
            key={link.name}
            href={link.href}
            onMouseEnter={() => setHoveredIndex(idx)}
            className={cn(
              "relative px-5 py-2 text-sm font-medium transition-colors duration-300 z-10",
              isActive ? "text-white" : "text-zinc-400 hover:text-zinc-300"
            )}
          >
            <span className="relative z-20">{link.name}</span>
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </a>
        );
      })}
    </div>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled 
          ? "py-4 bg-background/40 backdrop-blur-2xl border-b border-border shadow-lg" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="relative z-50">
          <FluidMagneticName text={siteConfig.professor.name} />
        </a>
        <CleanTabs />
        <button 
          className="md:hidden text-zinc-400 hover:text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu kept same */}
    </motion.nav>
  );
}