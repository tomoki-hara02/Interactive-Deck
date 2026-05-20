'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

type Feature = {
  badge: string;
  title: string;
  desc: string;
  accent: string;
};

// TODO: 3 つのカード（特徴・機能・柱）を書き換えてください
const FEATURES: Feature[] = [
  {
    badge: '01',
    title: 'Feature One',
    desc: '1 つ目の特徴を 1〜2 文で簡潔に。クリックで前面に来るとアクセント色で強調されます。',
    accent: '#c8a8ff',
  },
  {
    badge: '02',
    title: 'Feature Two',
    desc: '2 つ目の特徴。中央のカードは最初からアクティブ状態になっています。',
    accent: '#88bbff',
  },
  {
    badge: '03',
    title: 'Feature Three',
    desc: '3 つ目の特徴。3 枚で 1 セットの「柱」を作るとバランスが良いです。',
    accent: '#ffaacc',
  },
];

// ─── Position slots (left / center / right) ─────────────────────────────────
type Slot = {
  x: number;
  y: number;
  rotZ: number;
  scale: number;
  z: number;
  opacity: number;
};

// 中央カードを少しだけ持ち上げる（タイトルと被らないよう、原案より控えめ）
const SLOTS: Slot[] = [
  { x: -210, y: 30, rotZ: -10, scale: 0.88, z: 1, opacity: 0.7 },  // left
  { x: 0,    y: -20, rotZ: 0,  scale: 1.0,  z: 3, opacity: 1.0 },  // center (active)
  { x: 210,  y: 50, rotZ: 10,  scale: 0.88, z: 2, opacity: 0.7 },  // right
];

// Map card → slot based on selection
function getSlotIdx(cardIdx: number, selectedIdx: number, total: number): number {
  if (cardIdx === selectedIdx) return 1;
  const others = Array.from({ length: total }, (_, i) => i).filter(
    (i) => i !== selectedIdx
  );
  return others.indexOf(cardIdx) === 0 ? 0 : 2;
}

// ─── Single tiltable card ───────────────────────────────────────────────────
function TiltCard({
  feature,
  slot,
  isActive,
  parentMX,
  parentMY,
  onClick,
  delay,
}: {
  feature: Feature;
  slot: Slot;
  isActive: boolean;
  parentMX: ReturnType<typeof useMotionValue<number>>;
  parentMY: ReturnType<typeof useMotionValue<number>>;
  onClick: () => void;
  delay: number;
}) {
  // Mouse parallax tilt — active card responds more strongly
  const tiltStrength = isActive ? 12 : 4;
  const tiltX = useTransform(parentMY, [-0.5, 0.5], [tiltStrength, -tiltStrength]);
  const tiltY = useTransform(
    parentMX,
    [-0.5, 0.5],
    [-tiltStrength * 1.4, tiltStrength * 1.4]
  );

  return (
    <motion.div
      className="absolute cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: slot.opacity,
        x: slot.x,
        y: slot.y,
        scale: slot.scale,
        zIndex: slot.z,
      }}
      transition={{
        opacity: { duration: 0.6, ease: 'easeOut', delay },
        scale:   { type: 'spring', stiffness: 180, damping: 22 },
        x:       { type: 'spring', stiffness: 180, damping: 22 },
        y:       { type: 'spring', stiffness: 180, damping: 22 },
      }}
      style={{ zIndex: slot.z, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          rotateZ: slot.rotZ,
          transformStyle: 'preserve-3d',
        }}
        transition={{
          rotateZ: { type: 'spring', stiffness: 180, damping: 22 },
        }}
        animate={{ rotateZ: slot.rotZ }}
      >
        <div
          className="w-64 md:w-72 h-80 md:h-96 rounded-2xl border backdrop-blur-xl p-6 md:p-7 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden"
          style={{
            borderColor: isActive
              ? `${feature.accent}55`
              : 'rgba(255,255,255,0.12)',
            background: isActive
              ? `linear-gradient(135deg, ${feature.accent}1A 0%, rgba(255,255,255,0.02) 60%)`
              : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)',
            boxShadow: isActive
              ? `0 40px 80px -20px rgba(0,0,0,0.7), 0 0 80px -10px ${feature.accent}40`
              : '0 20px 40px -15px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top-left corner glow */}
          <div
            className="absolute top-0 left-0 w-36 h-36 rounded-full blur-3xl pointer-events-none -translate-x-14 -translate-y-14"
            style={{
              background: feature.accent,
              opacity: isActive ? 0.35 : 0.18,
              transition: 'opacity 0.4s ease',
            }}
          />

          <div className="relative flex flex-col gap-3">
            <span
              className="text-[10px] tracking-[0.3em] font-mono"
              style={{ color: feature.accent }}
            >
              {feature.badge}
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white leading-tight">
              {feature.title}
            </h3>
          </div>

          <div className="relative flex flex-col gap-4">
            <motion.div
              className="h-px"
              style={{ background: feature.accent }}
              animate={{ width: isActive ? '3.5rem' : '1.5rem', opacity: isActive ? 0.9 : 0.4 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <motion.p
              className="text-xs leading-relaxed"
              animate={{ color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)' }}
              transition={{ duration: 0.3 }}
            >
              {feature.desc}
            </motion.p>
          </div>

          {/* Bottom-right corner glow */}
          <div
            className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none translate-x-16 translate-y-16"
            style={{
              background: feature.accent,
              opacity: isActive ? 0.28 : 0.12,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Active indicator pulse */}
          {isActive && (
            <motion.div
              className="absolute top-5 right-5 flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: feature.accent }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="text-[9px] tracking-[0.22em] uppercase" style={{ color: feature.accent }}>
                Active
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function Slide10() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(1); // center card by default

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smX = useSpring(mx, { stiffness: 120, damping: 18 });
  const smY = useSpring(my, { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-8 md:gap-12 w-full max-h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center shrink-0">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            プロダクトを支える 3 つの柱
          </h2>
        </div>

        {/* 3D stage — 画面高さで縮小 */}
        <div
          ref={stageRef}
          className="relative w-full max-w-4xl h-[22rem] md:h-[26rem] flex items-center justify-center shrink-0"
          style={{ perspective: 1400, maxHeight: '60vh' }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {FEATURES.map((f, i) => {
            const slotIdx = getSlotIdx(i, selectedIdx, FEATURES.length);
            return (
              <TiltCard
                key={f.title}
                feature={f}
                slot={SLOTS[slotIdx]}
                isActive={i === selectedIdx}
                parentMX={smX}
                parentMY={smY}
                onClick={() => setSelectedIdx(i)}
                delay={0.1 + i * 0.12}
              />
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center gap-3">
          {FEATURES.map((f, i) => (
            <button
              key={f.title}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx(i);
              }}
              className="group flex items-center gap-2"
              aria-label={f.title}
            >
              <motion.span
                className="block h-px rounded-full"
                animate={{
                  width: i === selectedIdx ? 32 : 12,
                  backgroundColor: i === selectedIdx ? f.accent : 'rgba(255,255,255,0.25)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </button>
          ))}
        </div>

        <p className="text-[11px] md:text-xs text-white/30 tracking-wide -mt-4 shrink-0">
          カードをクリックして切り替え · カーソルで視差
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
