import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Activity, SplitSquareHorizontal, ShieldAlert, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const methodologies = [
  {
    id: 0,
    title: "Multivariate Time Series",
    icon: Activity,
    desc: "Extracting latent structural changes from high-dimensional, heavy-tailed systems to find the hidden signal.",
    color: "rgba(59, 130, 246, 1)", 
    accent: "bg-blue-500",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
    insights: [
      { title: "fabisearch R Package", subtitle: "Change Point Detection", link: "#publications" },
      { title: "Extremal Dependence", subtitle: "Australian Electricity Markets", link: "#publications" },
      { title: "High-Dimensional Data", subtitle: "Gaussian Graphical Analysis", link: "#publications" }
    ]
  },
  {
    id: 1,
    title: "Dynamic Connectivity",
    icon: Network,
    desc: "Determining state-related changes in brain functional networks via precision matrices and graph theory.",
    color: "rgba(168, 85, 247, 1)", 
    accent: "bg-purple-500",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.5)]",
    insights: [
      { title: "Dynamic Connectivity Regression", subtitle: "State-related brain changes", link: "#publications" },
      { title: "Vine Copula Models", subtitle: "Non-linear functional connectivity", link: "#publications" },
      { title: "Spectral Clustering", subtitle: "Estimating whole brain dynamics", link: "#publications" }
    ]
  },
  {
    id: 2,
    title: "Logistic Classification",
    icon: SplitSquareHorizontal,
    desc: "Applying multilevel regression models to predict and isolate binary outcomes in professional sports analytics.",
    color: "rgba(16, 185, 129, 1)", 
    accent: "bg-emerald-500",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.5)]",
    insights: [
      { title: "NHL Goalie Analytics", subtitle: "Multilevel logistic regression", link: "#publications" },
      { title: "Performance Dynamics", subtitle: "Time series forecasting in sports", link: "#publications" },
      { title: "Binary Isolation", subtitle: "Predictive outcome modeling", link: "#publications" }
    ]
  }
];

export default function InferenceLens() {
  const canvasRef = useRef(null);
  const labelsRef = useRef([]);
  const [activeMethod, setActiveMethod] = useState(0);
  const [glitchStates, setGlitchStates] = useState([0, 0, 0]); 
  
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const isMobile = window.innerWidth < 768;
    // Reduce particle count on mobile for buttery 60fps performance
    const numParticles = isMobile ? 120 : 200; 
    let particles = [];
    let time = 0;

    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let lastMouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // --- MOBILE TOUCH SUPPORT ADDED ---
    const updateMouse = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = clientX - rect.left;
      const currentY = clientY - rect.top;
      mouse.vx = currentX - lastMouse.x;
      mouse.vy = currentY - lastMouse.y;
      mouse.x = currentX;
      mouse.y = currentY;
      lastMouse = { x: mouse.x, y: mouse.y };
    };

    const onMouseMove = (e) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });

    class Particle {
      constructor(isInsight = false, insightIndex = 0) {
        this.isInsight = isInsight;
        this.insightIndex = insightIndex; 
        this.reset();
        this.x = isInsight ? -100 - (insightIndex * 150) : Math.random() * canvas.width; 
      }

      reset() {
        this.x = this.isInsight ? -50 : -20;
        this.y = Math.random() * canvas.height;
        this.baseY = this.y;
        this.speedX = this.isInsight ? 2.5 : Math.random() * 2 + 1;
        this.size = this.isInsight ? 4 : Math.random() * 2 + 1.5;
        this.isProcessed = false;
        this.targetY = this.y;
        this.targetX = null; 
        
        this.isCorrupted = false;
        this.corruptionLevel = 0; 
        this.chaosVx = 0;
        this.chaosVy = 0;
      }

      update(state, width, height) {
        this.x += this.speedX + this.chaosVx;
        this.y += this.chaosVy;
        const centerX = width / 2;

        if (this.x > centerX && !this.isProcessed) {
          this.isProcessed = true;
          if (this.isInsight) {
            // Push cards a bit further right on mobile so they don't cover the lens
            const offset = window.innerWidth < 768 ? 0.25 : 0.15;
            this.targetX = centerX + (width * offset) + (this.insightIndex * width * 0.12);
          }
        }

        if (this.isProcessed) {
          const distToMouse = Math.hypot(this.x - mouse.x, this.y - mouse.y);
          if (distToMouse < 100) {
            this.isCorrupted = true;
            this.corruptionLevel = 1;
            const force = (100 - distToMouse) / 100;
            const mass = this.isInsight ? 0.02 : 0.1;
            this.chaosVx += (this.x - mouse.x) * force * mass + (mouse.vx * mass);
            this.chaosVy += (this.y - mouse.y) * force * mass + (mouse.vy * mass);
          }
        }

        if (this.isCorrupted) {
          this.chaosVx *= 0.85;
          this.chaosVy *= 0.85;
          this.corruptionLevel *= 0.92;

          if (this.corruptionLevel < 0.05) {
            this.isCorrupted = false;
            this.corruptionLevel = 0;
            this.chaosVx = 0;
            this.chaosVy = 0;
          }
        }

        if (this.isProcessed) {
          if (state === 0) {
            this.targetY = (height / 2) + Math.sin(this.x * 0.01 + time) * 120;
          } else if (state === 1) {
            this.targetY = (height / 2) + (this.baseY - height / 2) * 0.3;
            if (!this.isCorrupted && !this.isInsight) this.y += Math.sin(time * 5 + this.x) * 0.5;
          } else if (state === 2) {
            const isTopCluster = this.isInsight ? this.insightIndex < 2 : this.baseY < height / 2;
            this.targetY = isTopCluster ? (height / 2) - 140 : (height / 2) + 140;
          }

          const restorativeForce = 0.05 * (1 - this.corruptionLevel);
          this.y += (this.targetY - this.y) * restorativeForce;

          if (this.isInsight && this.targetX) {
             this.x += (this.targetX - this.x) * restorativeForce;
             this.speedX = 0; 
          } else {
             this.speedX = state === 2 ? 3 : 2; 
          }
        }

        if ((this.x > width + 20 || this.y < -50 || this.y > height + 50) && !this.isInsight) {
          this.reset();
        }
      }

      draw(ctx, state, isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.isProcessed) {
          if (this.corruptionLevel > 0) {
            ctx.fillStyle = `rgba(239, 68, 68, ${this.corruptionLevel + 0.2})`; 
          } else {
            ctx.fillStyle = methodologies[state].color;
          }
        } else {
          ctx.fillStyle = this.isInsight 
            ? (isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)")
            : (isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"); 
        }
        
        if (this.isInsight) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = ctx.fillStyle;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; 
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(false));
    }
    const insightParticles = [new Particle(true, 0), new Particle(true, 1), new Particle(true, 2)];
    particles.push(...insightParticles);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.05;
      const isDark = themeRef.current === "dark";

      particles.forEach(p => {
        p.update(activeMethod, canvas.width, canvas.height);
        p.draw(ctx, activeMethod, isDark);
      });

      const newGlitchStates = [...glitchStates];
      insightParticles.forEach((p, i) => {
        const el = labelsRef.current[i];
        if (el && p.isProcessed) {
          // Adjust position on mobile to be slightly lower
          const yOffset = window.innerWidth < 768 ? 50 : 0;
          el.style.transform = `translate(calc(${p.x}px - 0%), calc(${p.y + yOffset}px - 100%))`;
          if (p.x > canvas.width / 2 + 50) {
            el.style.opacity = 1 - p.corruptionLevel;
            el.style.pointerEvents = "auto";
          } else {
            el.style.opacity = 0;
            el.style.pointerEvents = "none";
          }
          newGlitchStates[i] = p.corruptionLevel;
        }
      });
      
      if (Math.abs(newGlitchStates[0] - glitchStates[0]) > 0.1) {
          setGlitchStates(newGlitchStates);
      }

      if (activeMethod === 1) {
        ctx.lineWidth = 0.5;
        const validNodes = particles.filter(p => p.isProcessed && p.corruptionLevel < 0.2);
        for (let i = 0; i < validNodes.length; i++) {
          for (let j = i + 1; j < validNodes.length; j++) {
            const p1 = validNodes[i];
            const p2 = validNodes[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < 80) {
              const opacity = 1 - (dist / 80);
              ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.6})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, [activeMethod]);

  const activeData = methodologies[activeMethod];

  return (
    <section className="relative min-h-[110vh] bg-transparent overflow-hidden border-y border-black/5 dark:border-white/5 flex flex-col items-center justify-center transition-colors duration-1000">
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 md:w-8 bg-gradient-to-b from-transparent via-black/5 dark:via-white/10 to-transparent backdrop-blur-sm border-x border-black/5 dark:border-white/5 z-10 flex items-center justify-center pointer-events-none transition-colors duration-1000">
        <div 
          className="absolute w-1 h-32 rounded-full transition-all duration-700 blur-[8px]"
          style={{ backgroundColor: activeData.color, boxShadow: `0 0 40px ${activeData.color}` }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#fcfcfc_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] pointer-events-none z-0 transition-colors duration-1000" />

      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        {activeData.insights.map((insight, i) => (
          <div
            key={`${activeMethod}-${i}`} 
            ref={(el) => (labelsRef.current[i] = el)}
            className="absolute top-0 left-0 transition-opacity duration-150 will-change-transform pb-4 pl-4"
            style={{ opacity: 0 }} 
          >
            <a 
              href={insight.link}
              data-hide-cursor="true"
              className="group block bg-white/90 dark:bg-[#0a0a0c]/80 backdrop-blur-md border border-black/10 dark:border-white/10 p-3 md:p-4 rounded-xl shadow-xl w-36 md:w-48 hover:bg-white dark:hover:bg-[#111115] hover:border-black/20 dark:hover:border-white/30 transition-all cursor-pointer relative overflow-hidden"
            >
              {glitchStates[i] > 0.2 && (
                <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay animate-pulse" />
              )}
              
              <div className="flex justify-between items-start mb-2">
                <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded" style={{ backgroundColor: activeData.color + '33', color: activeData.color }}>
                  Ext {i+1}
                </span>
                <ArrowUpRight size={14} className="text-zinc-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors hidden md:block" />
              </div>
              
              <span className="block text-xs md:text-sm font-bold text-black dark:text-white mb-1 leading-tight transition-colors">
                {glitchStates[i] > 0.3 ? "ERR: CORRUPT" : insight.title}
              </span>
              <span className="block text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 font-mono transition-colors">
                {glitchStates[i] > 0.3 ? "0x000F8A..." : insight.subtitle}
              </span>
            </a>
          </div>
        ))}
      </div>

      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 text-center w-full flex flex-col items-center pointer-events-none px-4">
        <h2 className="text-xs font-semibold tracking-[0.5em] uppercase text-zinc-400 dark:text-zinc-500 flex items-center justify-center gap-2 md:gap-6 mb-6 text-center leading-relaxed">
          <span className="hidden md:block w-12 h-[1px] bg-zinc-300 dark:bg-zinc-800" />
          Algorithmic Processing
          <span className="hidden md:block w-12 h-[1px] bg-zinc-300 dark:bg-zinc-800" />
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-zinc-600 dark:text-zinc-400 font-mono text-[9px] md:text-[10px] uppercase tracking-widest bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl md:rounded-full border border-black/5 dark:border-white/10 transition-colors text-center">
          <div className="flex items-center gap-2">
             <Activity size={14} className="text-blue-500" />
             <span className="hidden md:inline">Data packets resolve into actionable insights on the right</span>
             <span className="md:hidden">Swipe structured data to inject noise</span>
          </div>
        </div>
      </div>

      {/* --- MOBILE RESPONSIVE UI UPDATE --- */}
      {/* We move the description down above the buttons on mobile so it's readable */}
      <div className="absolute bottom-36 md:bottom-auto md:right-24 md:top-1/2 md:-translate-y-1/2 w-full px-6 md:px-0 md:max-w-sm z-20 pointer-events-none md:text-right flex flex-col items-center md:items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMethod}
            initial={{ opacity: 0, y: 10, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center md:items-end bg-white/80 dark:bg-[#0a0a0c]/80 md:bg-transparent md:dark:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-black/5 dark:border-white/5 md:border-transparent p-4 md:p-0 rounded-2xl w-full text-center md:text-right"
          >
            <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-6 bg-black/5 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 ${activeData.glow}`}>
              <activeData.icon className="text-black dark:text-white" size={20} />
            </div>
            <h3 className="text-xl md:text-3xl font-bold text-black dark:text-white mb-2 md:mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              {activeData.title}
            </h3>
            <p className="text-xs md:text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              {activeData.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 md:bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-wrap justify-center md:flex-row gap-2 md:gap-4 items-center w-full px-4">
        {methodologies.map((method, i) => (
          <button
            key={method.id}
            data-hide-cursor="true"
            onClick={() => setActiveMethod(i)}
            className={`group relative px-4 md:px-6 py-2 md:py-3 rounded-full font-mono text-[9px] md:text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer overflow-hidden border ${
              activeMethod === i 
                ? "border-black/20 dark:border-white/20 text-black dark:text-white bg-black/5 dark:bg-white/5 backdrop-blur-md" 
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${method.accent}`} />
            <div className="relative z-10 flex items-center gap-2 md:gap-3">
              {activeMethod === i && (
                <motion.div 
                  layoutId="active-dot" 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: method.color, boxShadow: `0 0 10px ${method.color}` }}
                />
              )}
              {method.title}
            </div>
          </button>
        ))}
      </div>

    </section>
  );
}