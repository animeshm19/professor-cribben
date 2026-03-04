import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/config";

export default function Hero() {
  const canvasRef = useRef(null);
  const [isStabilized, setIsStabilized] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let animationId;

    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    
    // Physics State
    let hasMorphed = false; // THE LOCK: Once true, it never goes back to false
    let targetMorph = 0; // 0 = Sphere, 1 = Text
    let currentMorph = 0; // Smoothly interpolates to targetMorph
    let time = 0;

    const initEngine = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];

      const textCanvas = document.createElement("canvas");
      const textCtx = textCanvas.getContext("2d");
      textCanvas.width = canvas.width;
      textCanvas.height = canvas.height;

      const fontSize = Math.min(canvas.width / 12, 120);
      textCtx.font = `800 ${fontSize}px 'Syne', sans-serif`;
      textCtx.fillStyle = "white";
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      
      const textString = "IVOR CRIBBEN";
      textCtx.fillText(textString, canvas.width / 2, canvas.height / 2.2);

      const textData = textCtx.getImageData(0, 0, canvas.width, canvas.height).data;
      const textCoords = [];

      const step = canvas.width < 768 ? 5 : 4; 
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
          vx: 0,
          vy: 0,
          vz: 0,
          sphereBaseX: sphereX,
          sphereBaseY: sphereY,
          sphereBaseZ: sphereZ,
          targetTextX: randomTextCoord.x,
          targetTextY: randomTextCoord.y,
          randomOffset: Math.random() * Math.PI * 2 
        });
      }
    };

    window.addEventListener("resize", initEngine);
    initEngine();

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.005;

      const distToCenter = Math.hypot(canvas.width / 2 - mouse.x, canvas.height / 2 - mouse.y);
      
      // --- THE ONE-WAY LATCH ---
      // If the mouse gets close, trigger the morph permanently.
      if (distToCenter < 400) {
        hasMorphed = true;
      }
      
      targetMorph = hasMorphed ? 1 : 0;
      currentMorph += (targetMorph - currentMorph) * 0.04;

      if (currentMorph > 0.8 && !isStabilized) setIsStabilized(true);
      // We no longer need to check for destabilization since it never goes back!

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

        const ax = (idealX - p.x) * 0.1; 
        const ay = (idealY - p.y) * 0.1;
        const az = (idealZ - p.z) * 0.1;

        p.vx += ax;
        p.vy += ay;
        p.vz += az;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.hypot(dx, dy);
        
        if (distToMouse < 100) {
          const force = (100 - distToMouse) / 100;
          p.vx += (dx / distToMouse) * force * 2;
          p.vy += (dy / distToMouse) * force * 2;
        }

        p.vx *= 0.85;
        p.vy *= 0.85;
        p.vz *= 0.85;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        const perspective = 400 / (400 - p.z);
        const size = Math.max(0.1, (1.5 * perspective));

        const r = Math.floor(255 - (196 * currentMorph)); 
        const g = Math.floor(255 - (125 * currentMorph)); 
        const b = Math.floor(255 - (9 * currentMorph));   
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
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 mix-blend-screen" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* 2. THE STABILIZED METADATA */}
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
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-[9px] md:text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em] text-center">
            <span>{siteConfig.professor.title}</span>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
            <span>Statistical Learning</span>
          </div>
          
          <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-center">
            <span className="text-[10px] md:text-xs text-white tracking-widest uppercase">
              {siteConfig.professor.department}
            </span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}