import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "../data/config";
import * as THREE from "three";

// --- 1. THE 3D BACKGROUND ---
function RandomSynapses() {
  const lineGeometry = useMemo(() => {
    const baseGeom = new THREE.IcosahedronGeometry(1, 3);
    const positionAttribute = baseGeom.getAttribute('position');
    const vertexCount = positionAttribute.count;
    const linesCount = 80; 
    const positions = new Float32Array(linesCount * 2 * 3);

    for (let i = 0; i < linesCount; i++) {
      const indexA = Math.floor(Math.random() * vertexCount);
      const indexB = Math.floor(Math.random() * vertexCount);
      positions[i * 6] = positionAttribute.getX(indexA);
      positions[i * 6 + 1] = positionAttribute.getY(indexA);
      positions[i * 6 + 2] = positionAttribute.getZ(indexA);
      positions[i * 6 + 3] = positionAttribute.getX(indexB);
      positions[i * 6 + 4] = positionAttribute.getY(indexB);
      positions[i * 6 + 5] = positionAttribute.getZ(indexB);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  return (
    <lineSegments geometry={lineGeometry}>
      {/* BLUE ACCENT: Cobalt blue electric lines */}
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
    </lineSegments>
  );
}

function NeuralNetwork() {
  const groupRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;
      const scale = 1 + Math.sin(t * 0.5) * 0.02;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} scale={1.8}>
      <mesh>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial wireframe color="#3f3f46" transparent opacity={0.15} />
      </mesh>
      <points>
        <icosahedronGeometry args={[1, 3]} />
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} sizeAttenuation={true} />
      </points>
      <RandomSynapses />
      <mesh scale={0.98}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
    </group>
  );
}

function AmbientParticles() {
  const pointsRef = useRef();
  const particleCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      {/* BLUE ACCENT: Subtle cyan tinted ambient dust */}
      <pointsMaterial size={0.01} color="#22d3ee" transparent opacity={0.15} />
    </points>
  );
}

// --- 2. THE HERO DOM COMPONENT ---
export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 1 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 1 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="relative h-screen w-full bg-background overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <NeuralNetwork />
          <AmbientParticles />
        </Canvas>
      </div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)] pointer-events-none" />

      <div className="relative z-20 w-full max-w-5xl px-6 flex flex-col items-center pointer-events-none perspective-[1000px]">
        <motion.div style={{ rotateX, rotateY }} className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-extrabold tracking-tighter leading-none mb-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] bg-linear-to-r from-zinc-500 via-zinc-100 to-zinc-500 bg-size-[200%_auto] animate-shimmer bg-clip-text text-transparent pb-2"
          >
            Ivor Cribben
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light tracking-wide leading-relaxed"
          >
            Applying high-dimensional statistical methods to functional MRI, transforming complex brain states into mathematically solvable architectures.
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 z-30 flex justify-center gap-6 px-6">
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          href="#research"
          // BLUE ACCENT: White button gets a glowing blue shadow on hover
          className="px-8 py-3 rounded-full bg-white text-zinc-950 text-sm font-semibold tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] pointer-events-auto hover:text-blue-600"
        >
          Explore Research
        </motion.a>
        
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          href="#publications"
          className="px-8 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm font-semibold tracking-wide backdrop-blur-md hover:bg-zinc-800 hover:text-white transition-all duration-300 pointer-events-auto hover:border-blue-500/50"
        >
          View Publications
        </motion.a>
      </div>
    </section>
  );
}