'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: 上段→中段→下段で順に表示するキーワード（短い英単語が映えます）
//   yRatio = 0 (画面最上端) 〜 1 (画面最下端) の比率で各テキストの中心を指定
const STAGES = [
  { text: 'HELLO', yRatio: 0.30 },
  { text: 'WORLD', yRatio: 0.50 },
  { text: 'DEMO',  yRatio: 0.70 },
];
const HOLD_MS = 2600; // hold each stage before morphing
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

// ─── Sample target pixels for a text at a given y center ────────────────────
function sampleText(
  text: string,
  w: number,
  h: number,
  yCenter: number,
  step: number
): { x: number; y: number }[] {
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const ctx = off.getContext('2d');
  if (!ctx) return [];

  // 3 段に振り分けるので、テキスト 1 つ分の高さは画面の 22% 以下に抑える。
  // これで Inter が無いブラウザでフォールバックフォントになっても切れない安全マージン。
  const maxW = w * 0.82;
  const maxH = h * 0.22;
  const fontStr = (px: number) => `900 ${px}px sans-serif`;

  let size = Math.floor(maxH);
  ctx.font = fontStr(size);
  let m = ctx.measureText(text);
  if (m.width > maxW) {
    size = Math.floor(size * maxW / m.width);
    ctx.font = fontStr(size);
    m = ctx.measureText(text);
  }

  // actualBoundingBox は文字の視覚的な上下端を返す（em-box ではなく実描画範囲）。
  // ブラウザによって太字ストロークが小数ピクセル分はみ出るので 5% の安全余白を足す。
  const ascent  = m.actualBoundingBoxAscent  ?? size * 0.78;
  const descent = (m.actualBoundingBoxDescent ?? size * 0.22) + size * 0.05;
  // 視覚的中心を指定された yCenter に合わせるためのアルファベットベースライン位置
  const yBaseline = yCenter + (ascent - descent) / 2;

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, w / 2, yBaseline);

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
export default function ParticleText() {
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

    // 各段のテキストを別の y 位置でサンプリング
    const STEP = 4;
    const allTargets = STAGES.map((s) =>
      sampleText(s.text, w, h, h * s.yRatio, STEP)
    );

    // 全段中の最大ピクセル数を母数にする（密度をなるべく均一に保つため上限あり）
    const maxN = Math.min(Math.max(...allTargets.map((a) => a.length)), 3200);

    // 初期: 画面全体に散らばる
    const particles: Particle[] = Array.from({ length: maxN }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      tx: Math.random() * w,
      ty: Math.random() * h,
      vx: 0,
      vy: 0,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }));

    // 各段の目標位置を粒子に割り当てる
    function assign(stageIdx: number) {
      const t = allTargets[stageIdx];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const tgt = t[i % t.length];
        p.tx = tgt.x;
        p.ty = tgt.y;
      }
    }

    let stageIdx = 0;
    assign(stageIdx);

    const swap = setInterval(() => {
      stageIdx = (stageIdx + 1) % STAGES.length;
      assign(stageIdx);
    }, HOLD_MS);

    let raf = 0;
    let lastT = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastT) / 16.667, 2); // capped frame delta
      lastT = now;

      // Trailing fade for motion blur feel
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

      {/* Overlay caption — 画面下端に固定（粒子の最下段との距離は yRatio=0.70 で確保済み） */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 mt-auto mb-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
      >
        <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
          Particle Field × Typography
        </span>
        <p className="text-xs text-white/30 tracking-widest">
          上から下へ、形と位置を変えながら粒子が流れる
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
