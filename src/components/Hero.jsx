import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/config";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const canvasRef = useRef(null);
  const [isStabilized, setIsStabilized] = useState(false);
  const { theme } = useTheme(); 
  
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let animationId;

    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    
    let hasMorphed = false;
    let targetMorph = 0; 
    let currentMorph = 0; 
    let time = 0;

    const initEngine = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];

      const textCanvas = document.createElement("canvas");
      const textCtx = textCanvas.getContext("2d");
      textCanvas.width = canvas.width;
      textCanvas.height = canvas.height;

      // --- MOBILE RESPONSIVE TEXT MATH ---
      const isMobile = canvas.width < 768;
      
      // Much larger font size on mobile because we are stacking the words
      const fontSize = isMobile ? canvas.width / 5.5 : Math.min(canvas.width / 12, 120);
      textCtx.font = `900 ${fontSize}px 'Syne', sans-serif`;
      textCtx.fillStyle = "white";
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      
      // If mobile, stack the text. If desktop, keep it inline.
      if (isMobile) {
        textCtx.fillText("IVOR", canvas.width / 2, canvas.height / 2 - fontSize * 0.5);
        textCtx.fillText("CRIBBEN", canvas.width / 2, canvas.height / 2 + fontSize * 0.5);
      } else {
        textCtx.fillText("IVOR CRIBBEN", canvas.width / 2, canvas.height / 2.2);
      }

      const textData = textCtx.getImageData(0, 0, canvas.width, canvas.height).data;
      const textCoords = [];

      // Slightly lower density on mobile to ensure smooth 60FPS
      const step = isMobile ? 6 : 4; 
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const alpha = textData[(y * canvas.width + x) * 4 + 3];
          if (alpha > 128) {
            textCoords.push({ x, y });
          }
        }
      }

      const numParticles = textCoords.length;
      const sphereRadius = Math.min(canvas.width, canvas.height) * 0.35;

      for (let i = 0; i < numParticles; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / numParticles);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        
        const sphereX = sphereRadius * Math.cos(theta) * Math.sin(phi);
        const sphereY = sphereRadius * Math.sin(theta) * Math.sin(phi);
        const sphereZ = sphereRadius * Math.cos(phi);

        const randomTextCoord = textCoords.splice(Math.floor(Math.random() * textCoords.length), 1)[0];

        particles.push({
          x: canvas.width / 2 + sphereX,
          y: canvas.height / 2 + sphereY,
          z: sphereZ,
          vx: 0, vy: 0, vz: 0,
          sphereBaseX: sphereX, sphereBaseY: sphereY, sphereBaseZ: sphereZ,
          targetTextX: randomTextCoord.x, targetTextY: randomTextCoord.y,
          randomOffset: Math.random() * Math.PI * 2 
        });
      }
    };

    window.addEventListener("resize", initEngine);
    initEngine();

    // --- MOBILE TOUCH SUPPORT ADDED ---
    const updateMouse = (clientX, clientY) => {
      mouse.x = clientX;
      mouse.y = clientY;
    };

    const onMouseMove = (e) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
        // Any touch on mobile immediately triggers the text reveal
        hasMorphed = true;
      }
    };
    
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("touchend", onMouseLeave);

    const render = () => {
      const isDark = themeRef.current === "dark";

      ctx.fillStyle = isDark ? "rgba(5, 5, 5, 0.4)" : "rgba(252, 252, 252, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.005;

      const distToCenter = Math.hypot(canvas.width / 2 - mouse.x, canvas.height / 2 - mouse.y);
      if (distToCenter < 400) hasMorphed = true;
      
      targetMorph = hasMorphed ? 1 : 0;
      currentMorph += (targetMorph - currentMorph) * 0.04;

      if (currentMorph > 0.8 && !isStabilized) setIsStabilized(true);

      const cosY = Math.cos(time);
      const sinY = Math.sin(time);
      const cosX = Math.cos(time * 0.5);
      const sinX = Math.sin(time * 0.5);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        let sy = p.sphereBaseY * cosX - p.sphereBaseZ * sinX;
        let sz = p.sphereBaseZ * cosX + p.sphereBaseY * sinX;
        let sx = p.sphereBaseX * cosY - sz * sinY;
        sz = sz * cosY + p.sphereBaseX * sinY;

        const centerSphereX = canvas.width / 2 + sx;
        const centerSphereY = canvas.height / 2 + sy;

        let idealX = centerSphereX + (p.targetTextX - centerSphereX) * currentMorph;
        let idealY = centerSphereY + (p.targetTextY - centerSphereY) * currentMorph;
        let idealZ = sz * (1 - currentMorph); 

        if (currentMorph > 0.5) {
          idealX += Math.sin(time * 10 + p.randomOffset) * 2 * currentMorph;
          idealY += Math.cos(time * 10 + p.randomOffset) * 2 * currentMorph;
        }

        p.vx += (idealX - p.x) * 0.1;
        p.vy += (idealY - p.y) * 0.1;
        p.vz += (idealZ - p.z) * 0.1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.hypot(dx, dy);
        
        if (distToMouse < 100) {
          const force = (100 - distToMouse) / 100;
          p.vx += (dx / distToMouse) * force * 2.5; // Slightly stronger repulsion for touch
          p.vy += (dy / distToMouse) * force * 2.5;
        }

        p.vx *= 0.85; p.vy *= 0.85; p.vz *= 0.85;
        p.x += p.vx; p.y += p.vy; p.z += p.vz;

        const perspective = 400 / (400 - p.z);
        const size = Math.max(0.1, (1.5 * perspective));

        let r, g, b;
        if (isDark) {
          r = Math.floor(255 - (196 * currentMorph)); 
          g = Math.floor(255 - (125 * currentMorph)); 
          b = Math.floor(255 - (9 * currentMorph));   
        } else {
          r = Math.floor(30 + (29 * currentMorph)); 
          g = Math.floor(30 + (100 * currentMorph)); 
          b = Math.floor(30 + (216 * currentMorph)); 
        }
        
        const alpha = Math.min(1, Math.max(0.1, 0.3 + (0.7 * currentMorph) * perspective));

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", initEngine);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("touchend", onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000">
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-1000" />

      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20 flex justify-center pointer-events-none w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ 
            opacity: isStabilized ? 1 : 0, 
            y: isStabilized ? 0 : 20,
            filter: isStabilized ? "blur(0px)" : "blur(10px)"
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-5 md:gap-4"
        >
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-[9px] md:text-[10px] font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.3em] text-center transition-colors">
            <span>{siteConfig.professor.title}</span>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span>Statistical Learning</span>
          </div>
          
          <div className="px-6 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md text-center transition-colors">
            <span className="text-[10px] md:text-xs text-black dark:text-white tracking-widest uppercase transition-colors">
              {siteConfig.professor.department}
            </span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}