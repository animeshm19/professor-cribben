import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe({ config }) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const onResize = () => {
    if (containerRef.current) {
      width = containerRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phi += 0.003; 
        }
        state.phi = phi + pointerInteractionMovement.current;
        
        if (containerRef.current) {
          width = containerRef.current.offsetWidth;
        }
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-square max-w-[800px] mx-auto flex items-center justify-center group"
    >
      <div className="absolute inset-4 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none transition-opacity duration-1000 group-hover:opacity-70 opacity-40" />

      <canvas
        className="w-full h-full opacity-0 transition-opacity duration-1000 ease-in-out relative z-10"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current * 100;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerInteractionMovement.current = (e.clientX - pointerInteracting.current) / 100;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            pointerInteractionMovement.current = (e.touches[0].clientX - pointerInteracting.current) / 100;
          }
        }}
        style={{
          cursor: "grab",
          contain: "layout paint size",
        }}
      />

      {/* --- THEME AWARE VIGNETTE SHADOW --- */}
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(252,252,252,0.9)] dark:shadow-[inset_0_0_60px_rgba(5,5,5,0.9)] rounded-full pointer-events-none z-20 transition-shadow duration-1000" />
      
    </div>
  );
}