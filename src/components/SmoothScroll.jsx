import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize the core Lenis engine
    const lenis = new Lenis({
      lerp: 0.05, 
      duration: 1.5,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
    });

    // Create the rendering loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount to prevent memory leaks
    return () => {
      lenis.destroy();
    };
  }, []);

  // We simply return the app unchanged, Lenis handles the scroll hijacking externally
  return <>{children}</>;
}