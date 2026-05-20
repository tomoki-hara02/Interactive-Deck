'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

const TEXTS = ['LEGAL', 'AI', 'ORBIT'];
const HOLD_MS = 2800; // hold each text before morphing
const PALETTE = ['#c8a8ff', '#88bbff', '#ffaacc', '#ffffff'];

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  color: string;
};

// ─── Sample target pixels for a text string ─────────────────────────────────
function sampleText(text: string, w: number, h: number, step: number): { x: number; y: number }[] {
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const ctx = off.getContext('2d');
  if (!ctx) return [];

  // Auto-fit font size so text spans ~70% of the smaller dimension
  const target = Math.min(w, h) * 0.72;
  // Start big, scale down until it fits horizontally
  let size = Math.floor(target);
  ctx.font = `900 ${size}px Inter, sans-serif`;
  let measured = ctx.measureText(text).width;
  if (measured > w * 0.85) {
    size = Math.floor(size * (w * 0.85) / measured);
    ctx.font = `900 ${size}px Inter, sans-serif`;
  }
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w / 2, h / 2);

  const data = ctx.getImageData(0, 0, w, h).data;
  const out: { x: number; y: number }[] = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const a = data[(y * w + x) * 4 + 3];
      if (a > 130) out.push({ x, y });
    }
  }
  return out;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function Slide09() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    // Resolve targets for each text
    const STEP = 5;
    const allTargets = TEXTS.map((t) => sampleText(t, w, h, STEP));

    // Cap particle count at the largest target set
    const maxN = Math.min(Math.max(...allTargets.map((a) => a.length)), 3000);

    // Initial particles — random positions across screen
    const particles: Particle[] = Array.from({ length: maxN }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      tx: Math.random() * w,
      ty: Math.random() * h,
      vx: 0,
      vy: 0,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }));

    // Assign targets for given text index
    function assign(textIdx: number) {
      const t = allTargets[textIdx];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const tgt = t[i % t.length];
        p.tx = tgt.x;
        p.ty = tgt.y;
      }
    }

    let textIdx = 0;
    assign(textIdx);

    const swap = setInterval(() => {
      textIdx = (textIdx + 1) % TEXTS.length;
      assign(textIdx);
    }, HOLD_MS);

    let raf = 0;
    let lastT = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastT) / 16.667, 2); // capped frame delta
      lastT = now;

      // Trailing fade instead of full clear → smooth motion blur feel
      ctx.fillStyle = 'rgba(10,10,15,0.22)';
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        // Spring toward target
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx = p.vx * 0.86 + dx * 0.018;
        p.vy = p.vy * 0.86 + dy * 0.018;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Tiny brownian jitter
        p.x += (Math.random() - 0.5) * 0.4;
        p.y += (Math.random() - 0.5) * 0.4;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2.2, 2.2);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(swap);
    };
  }, []);

  return (
    <SlideWrapper>
      {/* Canvas fills the entire slide */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#0a0a0f' }}
      />

      {/* Overlay text on top */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3 mt-auto mb-16 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
      >
        <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
          Particle Field × Typography
        </span>
        <p className="text-xs text-white/30 tracking-widest">
          散らばった粒子が、意味あるカタチへと収束していく
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
