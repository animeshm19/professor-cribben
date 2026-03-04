import { useEffect, useRef } from "react";

export default function CognitiveFootprint() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    
    // Arrays to hold the time-series data (100 data points)
    const historyLength = 100;
    const mouseVelocityData = Array(historyLength).fill(0);
    const scrollVelocityData = Array(historyLength).fill(0);

    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastScrollY = window.scrollY;

    const trackData = (e) => {
      // Calculate mouse velocity
      const vx = e.clientX - lastMouseX;
      const vy = e.clientY - lastMouseY;
      const velocity = Math.min(Math.hypot(vx, vy) * 0.5, 50); // Cap at 50
      
      // Push to front, pop from back
      mouseVelocityData.unshift(velocity);
      mouseVelocityData.pop();

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const trackScroll = () => {
      const currentScroll = window.scrollY;
      const sv = Math.min(Math.abs(currentScroll - lastScrollY) * 0.5, 50);
      
      scrollVelocityData.unshift(sv);
      scrollVelocityData.pop();
      
      lastScrollY = currentScroll;
    };

    window.addEventListener("mousemove", trackData);
    window.addEventListener("scroll", trackScroll);

    const drawChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const step = width / historyLength;

      // Draw Grid
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Function to draw a time-series line
      const drawLine = (dataArray, color, offset) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        for (let i = 0; i < historyLength; i++) {
          const x = width - (i * step); // Draw from right to left
          const y = height - (dataArray[i] + offset); 
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      // Draw Mouse Data (Blue) and Scroll Data (Purple)
      drawLine(mouseVelocityData, "rgba(59, 130, 246, 0.8)", 10);
      drawLine(scrollVelocityData, "rgba(168, 85, 247, 0.8)", 10);

      // Auto-decay the arrays so the lines flatten out when user is idle
      mouseVelocityData.unshift(mouseVelocityData[0] * 0.9);
      mouseVelocityData.pop();
      scrollVelocityData.unshift(scrollVelocityData[0] * 0.9);
      scrollVelocityData.pop();

      animationFrameId = requestAnimationFrame(drawChart);
    };
    drawChart();

    return () => {
      window.removeEventListener("mousemove", trackData);
      window.removeEventListener("scroll", trackScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[90] pointer-events-none backdrop-blur-md bg-black/40 border border-white/10 p-4 rounded-xl hidden md:block">
      <div className="flex items-center justify-between mb-3 gap-8">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Live Cognitive Footprint</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_5px_#a855f7]" />
        </div>
      </div>
      <canvas ref={canvasRef} width={200} height={60} className="w-full h-auto opacity-80" />
    </div>
  );
}