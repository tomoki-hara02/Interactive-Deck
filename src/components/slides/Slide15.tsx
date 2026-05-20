'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

type Satellite = {
  label: string;
  radius: number;   // px in reference stage (STAGE_REF)
  duration: number; // seconds for one full revolution
  startDeg: number; // initial angular offset
  color: string;
  size: number;
  reverse?: boolean;
};

// TODO: 中心を回る衛星（要素・概念）のラベルを書き換えてください
const SATELLITES: Satellite[] = [
  // Inner ring
  { label: 'Item A1',  radius: 120, duration: 22, startDeg: 0,   color: '#c8a8ff', size: 14 },
  { label: 'Item A2',  radius: 120, duration: 22, startDeg: 180, color: '#c8a8ff', size: 10 },
  // Middle ring
  { label: 'Item B1',  radius: 190, duration: 38, startDeg: 60,  color: '#88bbff', size: 12, reverse: true },
  { label: 'Item B2',  radius: 190, duration: 38, startDeg: 220, color: '#88bbff', size: 10, reverse: true },
  // Outer ring
  { label: 'Item C1',  radius: 260, duration: 56, startDeg: 30,  color: '#ffaacc', size: 13 },
  { label: 'Item C2',  radius: 260, duration: 56, startDeg: 200, color: '#ffaacc', size: 9 },
];

const RINGS = [120, 190, 260];

// 基準ステージサイズ（px）。CSS では min(60vh, 82vw, 540) でこれ以下に収縮させる。
const STAGE_REF = 540;

// ドットから「外向き」にラベルを離すピクセル距離
const LABEL_OFFSET_PX = 34;

export default function Slide15() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-4 md:gap-6 w-full max-h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-1 text-center shrink-0">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            System Diagram
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {/* TODO: 中心を巡る図のタイトル */}
            すべてが中心を巡る
          </h2>
        </div>

        {/* Orbit stage — ビューポートに応じて 540px まで縮小 */}
        <div
          className="relative shrink-0"
          style={{
            // @ts-expect-error -- CSS custom property
            '--stage': `min(60vh, 82vw, ${STAGE_REF}px)`,
            width: 'var(--stage)',
            height: 'var(--stage)',
            overflow: 'visible',
          }}
        >
          {/* Rings — ステージサイズの割合で描画。
              Framer Motion の scale アニメと CSS transform が衝突するので、
              中央寄せは margin で行う（Framer の transform を奪わない） */}
          {RINGS.map((r, i) => {
            const diameterRatio = (r * 2) / STAGE_REF;
            const sizeExpr = `calc(var(--stage) * ${diameterRatio})`;
            const halfNegExpr = `calc(var(--stage) * ${diameterRatio} / -2)`;
            return (
              <motion.div
                key={r}
                className="absolute rounded-full border border-white/10"
                style={{
                  top: '50%',
                  left: '50%',
                  width: sizeExpr,
                  height: sizeExpr,
                  marginLeft: halfNegExpr,
                  marginTop: halfNegExpr,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
              />
            );
          })}

          {/* Glow halo behind center */}
          <div
            className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(79,142,247,0.45) 0%, transparent 70%)',
            }}
          />

          {/* Center hub — テキストは回転させない */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05, type: 'spring', stiffness: 150, damping: 18 }}
          >
            <div
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, #1c2a55 0%, #0b1228 80%)',
                border: '1.5px solid rgba(136,187,255,0.5)',
                boxShadow: '0 0 60px rgba(79,142,247,0.5), inset 0 0 30px rgba(136,187,255,0.2)',
              }}
            >
              {/* TODO: 中心ハブのラベル */}
              <span className="text-white font-bold tracking-tight text-lg">Core</span>
            </div>
            <span className="mt-3 text-[10px] tracking-[0.32em] text-white/50 uppercase">
              {/* TODO: 中心ハブのサブラベル */}
              Center
            </span>
          </motion.div>

          {/* Satellites — ドット + 外側ラベル */}
          {SATELLITES.map((s, i) => {
            const radiusRatio = s.radius / STAGE_REF;
            return (
              <motion.div
                key={`${s.label}-${i}`}
                className="absolute top-1/2 left-1/2"
                style={{ originX: 0.5, originY: 0.5 }}
                initial={{ rotate: s.startDeg, opacity: 0 }}
                animate={{
                  rotate: s.startDeg + (s.reverse ? -360 : 360),
                  opacity: 1,
                }}
                transition={{
                  rotate: { duration: s.duration, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 0.6, delay: 0.3 + i * 0.1, ease: 'easeOut' },
                }}
              >
                {/* Dot — orbit 上 */}
                <div
                  className="absolute rounded-full"
                  style={{
                    left: `calc(var(--stage) * ${radiusRatio})`,
                    top: 0,
                    width: s.size,
                    height: s.size,
                    marginLeft: -s.size / 2,
                    marginTop: -s.size / 2,
                    background: s.color,
                    boxShadow: `0 0 ${s.size}px ${s.color}, 0 0 ${s.size * 2}px ${s.color}44`,
                  }}
                />

                {/* Label container — ドットからさらに外側に配置 */}
                {/* transform: translate(-50%, -50%) でアンカーが視覚的中心に来る */}
                <div
                  className="absolute"
                  style={{
                    left: `calc(var(--stage) * ${radiusRatio} + ${LABEL_OFFSET_PX}px)`,
                    top: 0,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* 親回転を打ち消して、テキストを常に画面で水平に保つ */}
                  <motion.div
                    style={{ originX: 0.5, originY: 0.5 }}
                    initial={{ rotate: -s.startDeg }}
                    animate={{ rotate: -s.startDeg + (s.reverse ? 360 : -360) }}
                    transition={{ duration: s.duration, repeat: Infinity, ease: 'linear' }}
                  >
                    <span
                      className="inline-block whitespace-nowrap px-2 py-0.5 rounded-md text-[11px] font-medium tracking-wide text-white/85 border border-white/[0.08]"
                      style={{
                        background: 'rgba(10, 10, 15, 0.7)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {s.label}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
