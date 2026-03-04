import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  const canvasRef = useRef(null);
  
  // We use Refs for physics values so they update instantly without restarting the React loop
  const mouseRef = useRef({ x: -100, y: -100 });
  const stateRef = useRef({ isScanning: false });

  // Keep the ref synced with the X-Ray state
  useEffect(() => {
    stateRef.current.isScanning = isScanning;
  }, [isScanning]);

  useEffect(() => {
    let animationFrameId;

    const updateMousePosition = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('[data-hide-cursor="true"]')) {
        setIsHidden(true);
        setIsHovering(false);
        return;
      }
      setIsHidden(false);
      if (target.closest("a") || target.closest("button")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsScanning(true);
    const handleMouseUp = () => setIsScanning(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // The continuous physics loop
    const drawSynapses = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const { x: currentX, y: currentY } = mouseRef.current;
      const { isScanning } = stateRef.current;

      // Draw the neural web AS LONG AS we aren't using the X-Ray lens
      if (!isScanning) {
        const interactables = document.querySelectorAll('a, button, [data-hide-cursor="true"]');
        
        interactables.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const elX = rect.left + rect.width / 2;
          const elY = rect.top + rect.height / 2;
          const dist = Math.hypot(elX - currentX, elY - currentY);
          
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(elX, elY);
            const opacity = 1 - dist / 200;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.5})`;
            ctx.lineWidth = opacity * 2;
            ctx.stroke();
          }
        });
      }
      animationFrameId = requestAnimationFrame(drawSynapses);
    };
    
    drawSynapses();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array means the canvas never restarts and drops frames

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[9997]" 
      />

      {/* The Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHidden || isHovering || isScanning ? 0 : 1,
          scale: isHidden ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* THE X-RAY LENS */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/60 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHidden ? 0 : (isScanning ? 8 : (isHovering ? 1.8 : 1)),
          opacity: isHidden ? 0 : 1,
          backgroundColor: (isHovering || isScanning) && !isHidden ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
          borderWidth: isHovering || isScanning ? "0px" : "1px",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isScanning ? 0.3 : 0 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="absolute w-[1px] h-4 bg-black" />
          <div className="absolute w-4 h-[1px] bg-black" />
        </motion.div>
      </motion.div>
    </>
  );
}