'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhongMaterial
          color="#0d1f4a"
          emissive="#0a1530"
          emissiveIntensity={0.6}
          specular="#4F8EF7"
          shininess={40}
        />
      </mesh>

      {/* Wireframe grid overlay */}
      <mesh>
        <sphereGeometry args={[1.52, 28, 28]} />
        <meshBasicMaterial
          color="#4F8EF7"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* Inner atmosphere */}
      <mesh>
        <sphereGeometry args={[1.62, 64, 64]} />
        <meshPhongMaterial
          color="#4F8EF7"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial
          color="#2a5dd4"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({
  radius,
  tiltX,
  tiltZ,
  color,
  speed,
}: {
  radius: number;
  tiltX: number;
  tiltZ: number;
  color: string;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function OrbitDots({
  count,
  radius,
  tiltX,
  tiltZ,
  color,
  speed,
  dotSize = 0.05,
}: {
  count: number;
  radius: number;
  tiltX: number;
  tiltZ: number;
  color: string;
  speed: number;
  dotSize?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      <points geometry={geometry}>
        <pointsMaterial color={color} size={dotSize} sizeAttenuation />
      </points>
    </group>
  );
}

function AmbientParticles({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#7B5EA7'),
      new THREE.Color('#4F8EF7'),
      new THREE.Color('#FF6B9D'),
    ];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 6;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial vertexColors size={0.04} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={1.8} color="#c8d8ff" />
      <pointLight position={[-4, -2, -4]} intensity={0.5} color="#7B5EA7" />
      <pointLight position={[0, 4, 0]} intensity={0.3} color="#FF6B9D" />

      <Stars
        radius={250}
        depth={60}
        count={4000}
        factor={3}
        saturation={0.3}
        fade
        speed={0.4}
      />

      <Earth />

      {/* Orbit ring 1 – purple, inner */}
      <OrbitRing
        radius={2.3}
        tiltX={Math.PI * 0.14}
        tiltZ={Math.PI * 0.04}
        color="#7B5EA7"
        speed={0.22}
      />
      <OrbitDots
        count={14}
        radius={2.3}
        tiltX={Math.PI * 0.14}
        tiltZ={Math.PI * 0.04}
        color="#c8a8ff"
        speed={0.22}
        dotSize={0.06}
      />

      {/* Orbit ring 2 – blue, mid */}
      <OrbitRing
        radius={3.0}
        tiltX={Math.PI * 0.32}
        tiltZ={-Math.PI * 0.08}
        color="#4F8EF7"
        speed={0.13}
      />
      <OrbitDots
        count={10}
        radius={3.0}
        tiltX={Math.PI * 0.32}
        tiltZ={-Math.PI * 0.08}
        color="#88bbff"
        speed={0.13}
        dotSize={0.07}
      />

      {/* Orbit ring 3 – pink, outer */}
      <OrbitRing
        radius={3.8}
        tiltX={Math.PI * 0.52}
        tiltZ={Math.PI * 0.18}
        color="#FF6B9D"
        speed={0.08}
      />
      <OrbitDots
        count={7}
        radius={3.8}
        tiltX={Math.PI * 0.52}
        tiltZ={Math.PI * 0.18}
        color="#ffaacc"
        speed={0.08}
        dotSize={0.08}
      />

      <AmbientParticles count={250} />
    </>
  );
}

export default function EarthBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.5, 7.5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#0a0a0f' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
