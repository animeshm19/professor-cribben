import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Activity, SplitSquareHorizontal, ShieldAlert, ArrowUpRight } from "lucide-react";

// Added real-world applications to each methodology
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
  const [glitchStates, setGlitchStates] = useState([0, 0, 0]); // Tracks corruption of the 3 insight cards

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    let particles = [];
    const numParticles = 200; 
    let time = 0;

    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let lastMouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.vx = e.clientX - lastMouse.x;
      mouse.vy = e.clientY - lastMouse.y;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      lastMouse = { x: mouse.x, y: mouse.y };
    };
    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      constructor(isInsight = false, insightIndex = 0) {
        this.isInsight = isInsight;
        this.insightIndex = insightIndex; // 0, 1, or 2
        this.reset();
        // Start insights slightly offscreen so they drift in
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
        this.targetX = null; // Only used by insights to stop on screen
        
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
          // If it's an insight packet, assign it a fixed parking spot on the right side
          if (this.isInsight) {
            this.targetX = centerX + (width * 0.15) + (this.insightIndex * width * 0.12);
          }
        }

        if (this.isProcessed) {
          const distToMouse = Math.hypot(this.x - mouse.x, this.y - mouse.y);
          
          if (distToMouse < 100) {
            this.isCorrupted = true;
            this.corruptionLevel = 1;
            const force = (100 - distToMouse) / 100;
            // Insights are heavier, harder to push
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
          // --- MATH ALIGNMENT ---
          if (state === 0) {
            this.targetY = (height / 2) + Math.sin(this.x * 0.01 + time) * 120;
          } else if (state === 1) {
            this.targetY = (height / 2) + (this.baseY - height / 2) * 0.3;
            if (!this.isCorrupted && !this.isInsight) this.y += Math.sin(time * 5 + this.x) * 0.5;
          } else if (state === 2) {
            // For logistic, put insight 0 and 1 on top, insight 2 on bottom
            const isTopCluster = this.isInsight ? this.insightIndex < 2 : this.baseY < height / 2;
            this.targetY = isTopCluster ? (height / 2) - 140 : (height / 2) + 140;
          }

          const restorativeForce = 0.05 * (1 - this.corruptionLevel);
          this.y += (this.targetY - this.y) * restorativeForce;

          // If it's an insight, make it stop at its target X coordinate
          if (this.isInsight && this.targetX) {
             this.x += (this.targetX - this.x) * restorativeForce;
             this.speedX = 0; 
          } else {
             this.speedX = state === 2 ? 3 : 2; 
          }
        }

        // Loop normal particles. Don't loop insights once they are parked.
        if ((this.x > width + 20 || this.y < -50 || this.y > height + 50) && !this.isInsight) {
          this.reset();
        }
      }

      draw(ctx, state) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.isProcessed) {
          if (this.corruptionLevel > 0) {
            ctx.fillStyle = `rgba(239, 68, 68, ${this.corruptionLevel + 0.2})`; 
          } else {
            ctx.fillStyle = methodologies[state].color;
          }
        } else {
          ctx.fillStyle = this.isInsight ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.15)"; 
        }
        
        // Add glow to insights
        if (this.isInsight) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = ctx.fillStyle;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Create standard particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(false));
    }
    // Create the 3 Insight Data Packets
    const insightParticles = [new Particle(true, 0), new Particle(true, 1), new Particle(true, 2)];
    particles.push(...insightParticles);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.05;

      particles.forEach(p => {
        p.update(activeMethod, canvas.width, canvas.height);
        p.draw(ctx, activeMethod);
      });

      // Update HTML positions and glitch states based on the 3 insight particles
      const newGlitchStates = [...glitchStates];
      insightParticles.forEach((p, i) => {
        const el = labelsRef.current[i];
        if (el && p.isProcessed) {
          // Sync HTML position to canvas particle
          el.style.transform = `translate(calc(${p.x}px - 0%), calc(${p.y}px - 100%))`;
          
          // Fade in the card once it crosses the lens
          if (p.x > canvas.width / 2 + 50) {
            el.style.opacity = 1 - p.corruptionLevel; // Fade out slightly if corrupted
            el.style.pointerEvents = "auto";
          } else {
            el.style.opacity = 0;
            el.style.pointerEvents = "none";
          }

          // Update React state for the text glitch effect
          newGlitchStates[i] = p.corruptionLevel;
        }
      });
      
      // Only update state if corruption changed significantly to avoid React render lag
      if (Math.abs(newGlitchStates[0] - glitchStates[0]) > 0.1) {
          setGlitchStates(newGlitchStates);
      }

      // Draw Neural connections for state 1
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
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [activeMethod]);

  const activeData = methodologies[activeMethod];

  return (
    <section className="relative min-h-[110vh] bg-[#050505] overflow-hidden border-y border-white/5 flex flex-col items-center justify-center">
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      
      {/* The Lens */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 md:w-8 bg-gradient-to-b from-transparent via-white/10 to-transparent backdrop-blur-sm border-x border-white/5 z-10 flex items-center justify-center pointer-events-none">
        <div 
          className="absolute w-1 h-32 rounded-full transition-all duration-700 blur-[8px]"
          style={{ backgroundColor: activeData.color, boxShadow: `0 0 40px ${activeData.color}` }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] pointer-events-none z-0" />

      {/* --- THE LIVE DATA CARDS (Synced to Canvas) --- */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        {activeData.insights.map((insight, i) => (
          <div
            key={`${activeMethod}-${i}`} // Force re-render on method change
            ref={(el) => (labelsRef.current[i] = el)}
            className="absolute top-0 left-0 transition-opacity duration-150 will-change-transform pb-4 pl-4"
            style={{ opacity: 0 }} // Hidden until processed
          >
            <a 
              href={insight.link}
              data-hide-cursor="true"
              className="group block bg-[#0a0a0c]/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl w-48 hover:bg-[#111115] hover:border-white/30 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* If mouse corrupts the node, overlay a red glitch box */}
              {glitchStates[i] > 0.2 && (
                <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay animate-pulse" />
              )}
              
              <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded" style={{ backgroundColor: activeData.color + '33', color: activeData.color }}>
                  Extraction {i+1}
                </span>
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              
              {/* Scramble text if corrupted, otherwise show real title */}
              <span className="block text-sm font-bold text-white mb-1 leading-tight">
                {glitchStates[i] > 0.3 ? "ERR: DATA CORRUPT" : insight.title}
              </span>
              <span className="block text-xs text-zinc-400 font-mono">
                {glitchStates[i] > 0.3 ? "0x000F8A..." : insight.subtitle}
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* Top UI */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 text-center w-full flex flex-col items-center pointer-events-none">
        <h2 className="text-xs font-semibold tracking-[0.5em] uppercase text-zinc-500 flex items-center justify-center gap-6 mb-6">
          <span className="w-12 h-[1px] bg-zinc-800" />
          Algorithmic Processing
          <span className="w-12 h-[1px] bg-zinc-800" />
        </h2>
        <div className="flex items-center gap-4 text-zinc-400 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <Activity size={14} className="text-blue-500" />
          Data packets resolve into actionable insights on the right
        </div>
      </div>

      {/* Bottom UI Filters */}
      <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col md:flex-row gap-4 items-center">
        {methodologies.map((method, i) => (
          <button
            key={method.id}
            data-hide-cursor="true"
            onClick={() => setActiveMethod(i)}
            className={`group relative px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer overflow-hidden border ${
              activeMethod === i 
                ? "border-white/20 text-white bg-white/5 backdrop-blur-md" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${method.accent}`} />
            <div className="relative z-10 flex items-center gap-3">
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