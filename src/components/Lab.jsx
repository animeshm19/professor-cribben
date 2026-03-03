import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { siteConfig } from "../data/config";

// --- 1. THE 3D FIBRE OPTIC BACKGROUND ---
function FibreOptics() {
  const pointsRef = useRef();
  const particleCount = 1500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; 
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.position.y += 0.02;
      if (pointsRef.current.position.y > 20) {
        pointsRef.current.position.y = -20;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      {/* BLUE ACCENT: The falling data lines are now bright cobalt */}
      <pointsMaterial size={0.03} color="#3b82f6" transparent opacity={0.5} sizeAttenuation={true} />
    </points>
  );
}

// --- 2. THE STUDENT "DATA NODE" CARD ---
const StudentNode = ({ student, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      // BLUE ACCENT: Hovering gives a blue border tint
      className="group relative flex items-center gap-6 p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:bg-zinc-800/80 hover:border-blue-500/30 transition-all duration-500 overflow-hidden h-full"
    >
      {/* BLUE ACCENT: Hover glare is cyan/blue */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border border-zinc-700 group-hover:border-blue-400 transition-colors duration-500 shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
        <img 
          src={student.image} 
          alt={student.name} 
          className="relative z-10 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 w-full">
        <h4 className="text-xl font-bold text-zinc-200 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          {student.name}
        </h4>
        <p className="text-sm font-medium text-blue-400/80 uppercase tracking-widest mt-1 mb-2">
          {student.role}
        </p>
        <p className="text-sm font-light text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
          {student.focus}
        </p>
      </div>
    </motion.div>
  );
};

// --- 3. ALUMNI "ARCHIVE" CARD ---
const AlumniNode = ({ alumni, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col py-5 border-b border-white/5 group last:border-b-0"
    >
      <h4 className="text-lg font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
        {alumni.name}
      </h4>
      <div className="flex items-start gap-4 mt-1">
        <span className="text-xs font-mono text-zinc-500 w-24 shrink-0 pt-[2px]">
          {alumni.role}
        </span>
        <span className="w-4 h-[1px] bg-zinc-700 shrink-0 mt-[0.6rem]" />
        {/* BLUE ACCENT: Text turns light blue on hover */}
        <span className="text-sm font-light text-zinc-400 group-hover:text-blue-200 transition-colors leading-snug">
          {alumni.currentRole}
        </span>
      </div>
    </motion.div>
  );
};

// --- MAIN SECTION ---
export default function Lab() {
  const { lab } = siteConfig;

  return (
    <section id="lab" className="relative min-h-screen bg-[#050505] overflow-hidden py-32">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <fog attach="fog" args={['#050505', 2, 8]} />
          <FibreOptics />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mb-24"
        >
          <h2 className="text-xs font-semibold tracking-[0.4em] uppercase text-zinc-500 flex items-center gap-5 mb-8">
            <span className="w-10 h-[1px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            The Research Group
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
            Deciphering the Architecture of the Brain.
          </h3>
          <p className="text-lg text-zinc-400 font-light leading-relaxed">
            {lab.story}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          <div className="lg:col-span-8 space-y-16">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-zinc-600 uppercase mb-6 border-l-2 border-blue-500 pl-4">
                Doctoral Candidates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 [&>*:nth-child(odd):last-child]:sm:col-span-2">
                {lab.current.phd.map((student, idx) => (
                  <div key={student.name}><StudentNode student={student} delay={idx * 0.1} /></div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono tracking-widest text-zinc-600 uppercase mb-6 border-l-2 border-blue-500 pl-4">
                Masters Researchers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 [&>*:nth-child(odd):last-child]:sm:col-span-2">
                {lab.current.masters.map((student, idx) => (
                  <div key={student.name}><StudentNode student={student} delay={idx * 0.1} /></div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono tracking-widest text-zinc-600 uppercase mb-6 border-l-2 border-blue-500 pl-4">
                Undergraduate Assistants
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 [&>*:nth-child(odd):last-child]:sm:col-span-2">
                {lab.current.undergrad.map((student, idx) => (
                  <div key={student.name}><StudentNode student={student} delay={idx * 0.1} /></div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-zinc-900/40 border border-blue-500/10 backdrop-blur-md sticky top-32 shadow-[0_0_30px_rgba(59,130,246,0.05)]"
            >
              <h3 className="text-sm font-semibold tracking-widest text-zinc-300 uppercase mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
                Alumni Network
              </h3>
              <div className="flex flex-col">
                {lab.alumni.map((alumni, idx) => (
                  <AlumniNode key={alumni.name} alumni={alumni} delay={idx * 0.1} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}