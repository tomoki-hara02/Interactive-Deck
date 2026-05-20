'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// ─── Wireframe cube with glowing inner volume ───────────────────────────────
function GlowCube() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.15;
      groupRef.current.rotation.y = t * 0.22;
    }
    if (innerRef.current && innerRef.current.material instanceof THREE.MeshBasicMaterial) {
      innerRef.current.material.opacity = 0.18 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner glowing cube */}
      <mesh ref={innerRef}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial color="#4F8EF7" transparent opacity={0.18} />
      </mesh>

      {/* Wireframe outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.6, 1.6, 1.6)]} />
        <lineBasicMaterial color="#88bbff" />
      </lineSegments>

      {/* Inner edges for depth */}
      <lineSegments scale={[0.7, 0.7, 0.7]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.6, 1.6, 1.6)]} />
        <lineBasicMaterial color="#c8a8ff" transparent opacity={0.6} />
      </lineSegments>

      {/* Corner orbs */}
      {([
        [-0.8, -0.8, -0.8],
        [ 0.8, -0.8, -0.8],
        [-0.8,  0.8, -0.8],
        [ 0.8,  0.8, -0.8],
        [-0.8, -0.8,  0.8],
        [ 0.8, -0.8,  0.8],
        [-0.8,  0.8,  0.8],
        [ 0.8,  0.8,  0.8],
      ] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#FF6B9D' : '#88bbff'} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Surrounding particle ring ──────────────────────────────────────────────
function ParticleHalo({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#c8a8ff'),
      new THREE.Color('#88bbff'),
      new THREE.Color('#ffaacc'),
    ];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.8;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = -clock.getElapsedTime() * 0.06;
      ref.current.rotation.x =  clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial vertexColors size={0.03} sizeAttenuation transparent opacity={0.65} />
    </points>
  );
}

export default function Slide19() {
  return (
    <SlideWrapper>
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [3, 2, 4], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#0a0a0f' }}
        >
          <color attach="background" args={['#0a0a0f']} />
          <GlowCube />
          <ParticleHalo count={1400} />
        </Canvas>
      </div>

      {/* Overlay heading */}
      <motion.div
        className="relative z-10 flex flex-col items-start gap-2 w-full max-w-2xl pointer-events-none ml-auto mr-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{ position: 'absolute', top: '12%', left: '8%' }}
      >
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
          Knowledge Cube
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          多次元の法的知識を、<br />一つの空間に。
        </h2>
        <p className="text-sm text-white/45 leading-relaxed mt-3 max-w-md">
          条文・判例・解釈・実務慣行 — 異なる軸の情報を、AI が同一ベクトル空間で扱う。
        </p>
      </motion.div>

      {/* Bottom-right label */}
      <motion.div
        className="absolute bottom-8 right-8 flex items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#88bbff]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
          Vector Space · 768d
        </span>
      </motion.div>
    </SlideWrapper>
  );
}
