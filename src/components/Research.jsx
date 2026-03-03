import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { siteConfig } from "../data/config";

// --- 1. THE 3D MORPHING CORE ---
function MorphingMesh({ scrollProgress }) {
  const meshRef = useRef();
  const smoothScroll = useSpring(scrollProgress, { damping: 20, stiffness: 100 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = smoothScroll.get();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2 + scroll * 5;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.5 + scroll * 2;
      const s = 1.5 + Math.sin(t) * 0.1 + scroll * 0.5;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 4]} />
      <meshBasicMaterial wireframe color="#3b82f6" transparent opacity={0.1} />
    </mesh>
  );
}

// --- 2. THE HOLOGRAPHIC SHOWPIECE ---
const ShowpieceCard = ({ item }) => {
  return (
    <div className="relative h-[65vh] w-[85vw] md:w-[45vw] lg:w-[32vw] shrink-0 flex flex-col justify-end p-8 md:p-12 group">
      
      <div className="absolute inset-0 bg-[#0c0c0e]/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] transition-all duration-700 group-hover:border-blue-500/40 group-hover:bg-[#0c0c0e]/60 shadow-2xl" />
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 transition-transform duration-700 group-hover:translate-y-[-8px]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-6xl font-black text-white/[0.02] font-mono leading-none group-hover:text-blue-500/10 transition-colors">
            {item.id}
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full bg-blue-500/5">
            {item.tag}
          </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 tracking-tight leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          {item.title}
        </h3>
        
        <div className="relative h-[1px] w-full bg-white/5 mb-6 overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        
        <p className="text-zinc-400 text-sm leading-relaxed font-light group-hover:text-zinc-200 transition-colors">
          {item.description}
        </p>
      </div>
    </div>
  );
};

// --- 3. MAIN SECTION ---
export default function Research() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // FIXED: Increased the transform range from -70% to -85% 
  // This pushes the track further to ensure card 05 and 06 reach the center
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} id="research" className="relative h-[400vh] bg-[#050505]">
      
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <MorphingMesh scrollProgress={scrollYProgress} />
          </Canvas>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] z-10 pointer-events-none" />

        <div className="relative z-30 w-full px-6 md:px-20 lg:px-32 mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-xs font-semibold tracking-[0.5em] uppercase text-zinc-500 flex items-center gap-6"
          >
            <span className="w-12 h-[1px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            Latent Research Space
          </motion.h2>
        </div>

        <motion.div 
          style={{ x }} 
          className="flex gap-8 md:gap-12 px-6 md:px-20 lg:px-32 relative z-20"
        >
          {siteConfig.researchInterests.map((item) => (
            <ShowpieceCard key={item.id} item={item} />
          ))}
          
          {/* FIXED: Increased spacer width to allow the final card to dock in the center */}
          <div className="w-[60vw] shrink-0" />
        </motion.div>

      </div>
    </section>
  );
}