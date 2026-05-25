'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';
import { mulberry32 } from '@/lib/random';

// useMemo の geo を unmount で dispose するためのヘルパー hook
function useDisposable<T extends { dispose: () => void } | null>(value: T): void {
  useEffect(() => {
    return () => {
      value?.dispose();
    };
  }, [value]);
}

// ─── 設定 ───────────────────────────────────────────────────────────────────
// TODO: ロゴ画像（public/ 配下に置く）
const LOGO_SRC = '/logo.png';
// TODO: パーティクル数（多いほど密だが負荷上昇）
const PARTICLE_COUNT = 6000;
// TODO: 1 サイクルの秒数（散らばる → ロゴ → 散らばる…）
const CYCLE_S = 12;
// アルファ閾値（これ未満は粒子化しない）
const ALPHA_THRESHOLD = 140;

// ─── Vertex shader ─────────────────────────────────────────────────────────
// position    : ロゴ形状の最終目標（XY 平面）
// aScatter    : 散らばった状態の位置（球殻ランダム）
// aColor      : 元のロゴピクセル色
// uTime       : 経過秒数。CYCLE_S で 1 周期。
//   0     〜 0.20 : 散 → ロゴ（収束、イージング）
//   0.20  〜 0.62 : ロゴで停止（約 5 秒）
//   0.62  〜 0.82 : ロゴ → 散（発散、イージング）
//   0.82  〜 1.00 : 散らばった状態で停止
const vertexShader = /* glsl */ `
  attribute vec3 aScatter;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uSize;
  uniform float uCycle;

  varying vec3  vColor;
  varying float vAlpha;

  float ease(float t) {
    return t < 0.5
      ? 4.0 * t * t * t
      : 1.0 - pow(-2.0 * t + 2.0, 3.0) * 0.5;
  }

  void main() {
    float phase = mod(uTime, uCycle) / uCycle;

    float t01;
    if (phase < 0.20) {
      t01 = ease(phase / 0.20);
    } else if (phase < 0.62) {
      t01 = 1.0;
    } else if (phase < 0.82) {
      t01 = 1.0 - ease((phase - 0.62) / 0.20);
    } else {
      t01 = 0.0;
    }

    vec3 pos = mix(aScatter, position, t01);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position  = projectionMatrix * mvPos;
    gl_PointSize = uSize / -mvPos.z;

    vColor  = aColor;
    // ロゴ形成時に少し明るく
    vAlpha  = 0.55 + 0.45 * t01;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float alpha = (1.0 - smoothstep(0.15, 0.5, dist)) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ─── ピクセルサンプリング ────────────────────────────────────────────────
type Sample = { x: number; y: number; r: number; g: number; b: number };

function sampleLogo(img: HTMLImageElement, drawW: number, drawH: number, step: number): Sample[] {
  const off = document.createElement('canvas');
  off.width = drawW;
  off.height = drawH;
  const ctx = off.getContext('2d');
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, drawW, drawH);
  const data = ctx.getImageData(0, 0, drawW, drawH).data;
  const out: Sample[] = [];
  for (let y = 0; y < drawH; y += step) {
    for (let x = 0; x < drawW; x += step) {
      const i = (y * drawW + x) * 4;
      const a = data[i + 3];
      if (a < ALPHA_THRESHOLD) continue;
      out.push({
        x, y,
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
      });
    }
  }
  return out;
}

// ─── パーティクルメッシュ ────────────────────────────────────────────────
// material は `<shaderMaterial ref={...} />` として JSX 宣言する
// （React 19 の react-hooks/refs ルールにより、render 中に
// ref.current を読み取ることが禁止されているため）。
function ParticlesMesh({ samples }: { samples: Sample[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // uniforms オブジェクトは ShaderMaterial に渡したあと、毎フレーム値だけ更新する。
  const uniforms = useMemo(
    () => ({
      uTime:  { value: 0 },
      uSize:  { value: 16.0 },
      uCycle: { value: CYCLE_S },
    }),
    [],
  );

  const geo = useMemo(() => {
    if (samples.length === 0) return null;
    const rand = mulberry32(0xa5e9c1 ^ samples.length);

    // ロゴの bounding box を計測（中心揃え＆ワールドスケール用）
    let maxX = 0, maxY = 0;
    for (const s of samples) {
      if (s.x > maxX) maxX = s.x;
      if (s.y > maxY) maxY = s.y;
    }
    const dim = Math.max(maxX, maxY);
    const SCALE = 2.6 / dim; // ロゴをワールド 2.6 ユニット幅に収める

    // ピクセル走査は上から順なので、シャッフルしてから粒子に対応付ける
    const shuffled = samples.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const targetBuf  = new Float32Array(PARTICLE_COUNT * 3);
    const scatterBuf = new Float32Array(PARTICLE_COUNT * 3);
    const colorBuf   = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const s = shuffled[i % shuffled.length];

      // ロゴ目標位置（XY 平面・Y を反転＝Canvas 座標 → ワールド座標）
      targetBuf[i * 3 + 0] =  (s.x - maxX / 2) * SCALE;
      targetBuf[i * 3 + 1] = -(s.y - maxY / 2) * SCALE;
      targetBuf[i * 3 + 2] = (rand() - 0.5) * 0.08; // 極小 Z ノイズで奥行き感

      // 散らばった状態：球殻にランダム配置
      const theta = rand() * Math.PI * 2;
      const phi   = Math.acos(2 * rand() - 1);
      const r     = 3.8 + rand() * 2.6;
      scatterBuf[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      scatterBuf[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      scatterBuf[i * 3 + 2] = r * Math.cos(phi);

      // 色：白抜き部分はやや発光させて、その他は元の色を維持
      const isBright = s.r > 220 && s.g > 220 && s.b > 220;
      if (isBright) {
        colorBuf[i * 3 + 0] = 0.86;
        colorBuf[i * 3 + 1] = 0.94;
        colorBuf[i * 3 + 2] = 1.00;
      } else {
        colorBuf[i * 3 + 0] = s.r / 255;
        colorBuf[i * 3 + 1] = s.g / 255;
        colorBuf[i * 3 + 2] = s.b / 255;
      }
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(targetBuf, 3));
    buffer.setAttribute('aScatter', new THREE.BufferAttribute(scatterBuf, 3));
    buffer.setAttribute('aColor',   new THREE.BufferAttribute(colorBuf, 3));

    return buffer;
  }, [samples]);

  // samples 変更 / unmount 時に GPU バッファを解放
  useDisposable(geo);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
    }
    if (groupRef.current) {
      // Slide19 のキューブと同様、3 軸でゆっくりタンブル
      groupRef.current.rotation.y = t * 0.22;
      groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.45;
      groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.12;
    }
  });

  if (!geo) return null;

  return (
    <group ref={groupRef}>
      <points>
        <primitive object={geo} attach="geometry" />
        <shaderMaterial
          ref={matRef}
          attach="material"
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ─── 共通シーン（Canvas のみ） ──────────────────────────────────────────
// `LogoParticles` スライドと `LogoParticlesBackground`（背景レイヤー）の
// 両方から再利用される。テキストオーバーレイは含まない。
export function LogoParticlesScene() {
  const [samples, setSamples] = useState<Sample[]>([]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let cancelled = false;
    img.onload = () => {
      if (cancelled) return;
      // 中解像度でサンプリング（細かすぎても粒子数で頭打ちなので 280px 程度で十分）
      const maxDim  = 280;
      const aspect  = img.width / img.height;
      const drawW   = Math.round(aspect >= 1 ? maxDim : maxDim * aspect);
      const drawH   = Math.round(aspect >= 1 ? maxDim / aspect : maxDim);
      setSamples(sampleLogo(img, drawW, drawH, 2));
    };
    img.onerror = () => {
      if (cancelled) return;
      // フォールバック：円形の点群
      const fallback: Sample[] = [];
      const dim = 200;
      const cx = dim / 2, cy = dim / 2;
      const rr = dim * 0.45;
      for (let a = 0; a < 360; a += 1.5) {
        const rad = (a * Math.PI) / 180;
        fallback.push({
          x: cx + Math.cos(rad) * rr,
          y: cy + Math.sin(rad) * rr,
          r: 100, g: 170, b: 230,
        });
      }
      setSamples(fallback);
    };
    img.src = LOGO_SRC;
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#0a0a0f' }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <ParticlesMesh samples={samples} />
    </Canvas>
  );
}

// ─── スライド本体 ────────────────────────────────────────────────────────
export default function LogoParticles() {
  return (
    <SlideWrapper>
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <LogoParticlesScene />
      </div>

      {/* 上部キャプション */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 mb-auto mt-14 pointer-events-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.4 }}
      >
        <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
          Brand Mark · 3D Particle Field
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          {/* TODO: ブランド名 / 事務所名 */}
          Our Mark
        </h2>
      </motion.div>

      {/* 下部キャプション */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 mt-auto mb-12 pointer-events-none"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
      >
        <p className="text-xs text-white/35 tracking-widest">
          {/* TODO: ロゴ下のキャプション */}
          散らばっては集う、粒子のリズム
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
