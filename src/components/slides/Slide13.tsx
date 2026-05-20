'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

type Player = {
  name: string;
  x: number; // 0-100 (Speed)
  y: number; // 0-100 (Accuracy)
  size: number;
  color: string;
  isUs?: boolean;
};

const PLAYERS: Player[] = [
  { name: '従来の法務SaaS', x: 28, y: 35, size: 9,  color: '#7a8aa6' },
  { name: '汎用 LLM',       x: 80, y: 32, size: 10, color: '#7a8aa6' },
  { name: '専門家マニュアル', x: 18, y: 78, size: 9,  color: '#7a8aa6' },
  { name: 'Orbit',           x: 82, y: 84, size: 22, color: '#88bbff', isUs: true },
];

export default function Slide13() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-8 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Market Position
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            速度と精度の交差点に立つ
          </h2>
        </div>

        {/* Matrix container */}
        <div className="relative w-full max-w-3xl aspect-[1.3] mt-4">
          {/* Quadrant background */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 overflow-hidden">
            {/* Subtle quadrant gradients */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              <div className="border-r border-b border-white/5" />
              <div className="border-b border-white/5 bg-gradient-to-br from-transparent to-[#4F8EF7]/[0.08]" />
              <div className="border-r border-white/5" />
              <div className="bg-gradient-to-tr from-transparent via-[#7B5EA7]/[0.05] to-[#FF6B9D]/[0.1]" />
            </div>

            {/* Center axes */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/12" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/12" />

            {/* Players */}
            {PLAYERS.map((p, i) => (
              <motion.div
                key={p.name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${100 - p.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: 0.3 + i * 0.18,
                  type: 'spring',
                  stiffness: 180,
                  damping: 18,
                }}
              >
                {p.isUs && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: p.color, opacity: 0.25 }}
                    animate={{ scale: [1, 2.6], opacity: [0.4, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                <div
                  className="rounded-full"
                  style={{
                    width: p.size * 2,
                    height: p.size * 2,
                    background: p.color,
                    boxShadow: p.isUs
                      ? `0 0 30px ${p.color}, 0 0 6px white inset`
                      : `0 0 12px ${p.color}66`,
                    border: p.isUs ? '1.5px solid white' : 'none',
                  }}
                />
                <span
                  className={`absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap ${
                    p.isUs ? 'text-white font-bold text-sm' : 'text-white/55 text-xs'
                  }`}
                  style={{ top: '100%' }}
                >
                  {p.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Axis labels */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
              Speed
            </span>
            <svg width="40" height="6" viewBox="0 0 40 6">
              <path d="M0 3h36m-4-3l4 3-4 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
            </svg>
          </div>
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 flex items-center gap-2 origin-center">
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
              Accuracy
            </span>
            <svg width="40" height="6" viewBox="0 0 40 6">
              <path d="M0 3h36m-4-3l4 3-4 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* Quadrant corner labels */}
          <span className="absolute top-3 right-4 text-[10px] tracking-widest text-[#88bbff]/60 uppercase">
            Best Position
          </span>
        </div>

        <p className="text-xs text-white/30 tracking-wide mt-4">
          Orbit は「速さ」と「精度」を両立する唯一のレイヤー
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
