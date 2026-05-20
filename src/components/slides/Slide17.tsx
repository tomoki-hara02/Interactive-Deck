'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

type Step = {
  badge: string;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  { badge: '01', title: 'Ingest',  desc: 'PDF・契約書・規程をドラッグ&ドロップで取込' },
  { badge: '02', title: 'Parse',   desc: 'OCR + 構造解析で条項単位に分解' },
  { badge: '03', title: 'Embed',   desc: 'ベクトル化して意味検索可能な状態に' },
  { badge: '04', title: 'Reason',  desc: '関連法令・判例を参照しながら推論' },
  { badge: '05', title: 'Output',  desc: 'リスクスコア付きで結果を提示' },
];

const STEP_MS = 1500;

export default function Slide17() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % (STEPS.length + 1));
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-6xl gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Pipeline
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            5 ステップで完結する処理フロー
          </h2>
        </div>

        <div className="relative flex items-stretch justify-between gap-2 mt-4">
          {/* Connector line — base */}
          <div className="absolute left-[6%] right-[6%] top-[2.2rem] h-px bg-white/10" />
          {/* Connector line — active */}
          <motion.div
            className="absolute left-[6%] top-[2.2rem] h-px bg-gradient-to-r from-[#7B5EA7] via-[#4F8EF7] to-[#FF6B9D]"
            animate={{
              width: `${Math.min(active, STEPS.length - 1) / (STEPS.length - 1) * 88}%`,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(79,142,247,0.5))' }}
          />

          {STEPS.map((step, i) => {
            const isDone   = i < active;
            const isActive = i === active;
            return (
              <div key={step.badge} className="flex-1 flex flex-col items-center gap-4 max-w-[12rem]">
                {/* Circle node */}
                <motion.div
                  className="relative w-[4.4rem] h-[4.4rem] rounded-full flex items-center justify-center z-10"
                  animate={{
                    background: isDone
                      ? 'linear-gradient(135deg, #7B5EA7, #4F8EF7)'
                      : isActive
                      ? 'linear-gradient(135deg, #4F8EF7, #FF6B9D)'
                      : 'rgba(20,22,38,0.85)',
                    borderColor: isDone || isActive ? 'transparent' : 'rgba(255,255,255,0.15)',
                    scale: isActive ? 1.12 : 1,
                  }}
                  style={{
                    border: '1px solid',
                    boxShadow: isActive
                      ? '0 0 35px rgba(79,142,247,0.6)'
                      : isDone
                      ? '0 0 20px rgba(123,94,167,0.35)'
                      : 'none',
                  }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  {/* Pulse for active */}
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-[#88bbff]"
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}

                  {isDone ? (
                    <motion.svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <motion.path
                        d="M5 11.5l4.2 4.2L17 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </motion.svg>
                  ) : (
                    <span className={`text-sm font-mono ${isActive ? 'text-white' : 'text-white/40'}`}>
                      {step.badge}
                    </span>
                  )}
                </motion.div>

                {/* Label */}
                <div className="text-center">
                  <motion.h3
                    className="text-base font-semibold tracking-tight"
                    animate={{
                      color: isActive ? '#ffffff' : isDone ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="text-[11px] mt-2 leading-relaxed"
                    animate={{
                      color: isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {step.desc}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-white/30 tracking-wide self-center mt-6">
          入力から出力まで、平均 3 秒以内
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
