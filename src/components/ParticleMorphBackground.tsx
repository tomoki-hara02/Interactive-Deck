'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const COUNT = 7000;
const SHAPE_DURATION = 3.5; // seconds per shape

// ─── Vertex shader ────────────────────────────────────────────────────────────
// Four position buffers (sphere / torus / icosahedron / box) are stored as
// vertex attributes. uTime drives a 0→4 cycle; each integer phase triggers a
// smooth cubic ease-in-out blend between consecutive shapes.
const vertexShader = /* glsl */ `
  attribute vec3 aPos1;
  attribute vec3 aPos2;
  attribute vec3 aPos3;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uSize;

  varying vec3  vColor;
  varying float vAlpha;

  // Cubic ease-in-out
  float ease(float t) {
    return t < 0.5
      ? 4.0 * t * t * t
      : 1.0 - pow(-2.0 * t + 2.0, 3.0) * 0.5;
  }

  void main() {
    float cycle  = uTime / ${SHAPE_DURATION.toFixed(1)};
    float phase  = mod(floor(cycle), 4.0);
    float blend  = ease(fract(cycle));

    vec3 pos;
    if      (phase < 0.5) pos = mix(position, aPos1, blend);  // sphere  → torus
    else if (phase < 1.5) pos = mix(aPos1,   aPos2, blend);   // torus   → icosa
    else if (phase < 2.5) pos = mix(aPos2,   aPos3, blend);   // icosa   → box
    else                  pos = mix(aPos3, position, blend);   // box     → sphere

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position  = projectionMatrix * mvPos;
    gl_PointSize = uSize / -mvPos.z;

    // Subtle pulse tied to morph cycle
    float pulse = 0.85 + 0.15 * sin(uTime * 0.6 + phase);
    vColor = aColor * pulse;
    vAlpha = 1.0;
  }
`;

// ─── Fragment shader ──────────────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    // Soft circular falloff – works beautifully with additive blending
    float alpha = (1.0 - smoothstep(0.1, 0.5, dist)) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ─── Surface sampler helper ───────────────────────────────────────────────────
function sampleSurface(geo: THREE.BufferGeometry, scale: number): Float32Array {
  const mesh = new THREE.Mesh(
    geo.toNonIndexed(),
    new THREE.MeshBasicMaterial()
  );
  const sampler = new MeshSurfaceSampler(mesh).build();
  const buf = new Float32Array(COUNT * 3);
  const v   = new THREE.Vector3();
  for (let i = 0; i < COUNT; i++) {
    sampler.sample(v);
    buf[i * 3]     = v.x * scale;
    buf[i * 3 + 1] = v.y * scale;
    buf[i * 3 + 2] = v.z * scale;
  }
  return buf;
}

// ─── Particle mesh ────────────────────────────────────────────────────────────
function MorphingParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const { geo, mat } = useMemo(() => {
    const S = 2.0; // world-space scale

    // Sample each shape surface
    const p0 = sampleSurface(new THREE.SphereGeometry(1, 32, 32), S);
    const p1 = sampleSurface(new THREE.TorusGeometry(0.7, 0.32, 32, 128), S);
    const p2 = sampleSurface(new THREE.IcosahedronGeometry(1, 0), S);
    const p3 = sampleSurface(new THREE.BoxGeometry(1.1, 1.1, 1.1, 12, 12, 12), S);

    // Per-particle color — weighted toward near-white for minimal feel
    // Accent hues: light purple / blue / pink from the palette
    const palette: [number, number, number][] = [
      [0.93, 0.95, 1.00],  // near-white (primary)
      [0.80, 0.70, 1.00],  // #ccb3ff  light purple
      [0.58, 0.76, 1.00],  // #94c2ff  light blue
      [1.00, 0.72, 0.87],  // #ffb8de  light pink
    ];
    const weights = [0.55, 0.20, 0.15, 0.10];
    const thresholds = weights.map(((acc) => (w: number) => (acc += w, acc))(0));

    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.random();
      const ci = thresholds.findIndex((t) => r < t);
      const c  = palette[ci] ?? palette[0];
      colors[i * 3]     = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }

    // Build the BufferGeometry with all position buffers
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(p0, 3));
    geo.setAttribute('aPos1',    new THREE.BufferAttribute(p1, 3));
    geo.setAttribute('aPos2',    new THREE.BufferAttribute(p2, 3));
    geo.setAttribute('aPos3',    new THREE.BufferAttribute(p3, 3));
    geo.setAttribute('aColor',   new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 14.0 }, // tune: bigger = larger points
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geo, mat };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Simple rAF-style rotation — matches the reference implementation
      groupRef.current.rotation.y += 0.0006;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.18) * 0.10;
    }
    mat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group ref={groupRef}>
      <points geometry={geo} material={mat} />
    </group>
  );
}

// ─── Background dust (very sparse, tiny dots for depth) ───────────────────────
function DustField({ count = 400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 5 + Math.random() * 6;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        color="#7B8FBF"
        size={0.012}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Scene root ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <MorphingParticles />
      <DustField count={400} />
    </>
  );
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────
export default function ParticleMorphBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
