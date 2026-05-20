'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';
import { useCountUp } from '@/hooks/useCountUp';

// TODO: 1 つの数字で勝負するスライド。値・単位・キャッチコピーを書き換え
const STAT = {
  value: 92,
  suffix: '%',
  label: 'Key Performance Indicator',
  headline: '導入後の満足度',
  description:
    '従来比でメインの KPI がここまで改善しました。続くスライドで根拠を示します。',
  accent: '#88bbff',
};

export default function SlideHeroStat() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const v = useCountUp(STAT.value, { duration: 1.8, start: inView, easePower: 4 });

  return (
    <SlideWrapper>
      <motion.div
        ref={ref}
        className="relative flex flex-col items-center gap-7 w-full max-w-3xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 数字背後の放射状グロー */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] max-w-[680px] max-h-[680px] rounded-full pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle, ${STAT.accent}33 0%, transparent 60%)`,
          }}
        />

        {/* 小さなラベル */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: STAT.accent }}
          />
          <span className="text-[11px] tracking-[0.32em] uppercase text-white/40">
            {STAT.label}
          </span>
        </motion.div>

        {/* 巨大な数字 */}
        <div className="relative flex items-end gap-3 leading-none">
          <span
            className="font-bold tabular-nums tracking-tight"
            style={{
              fontSize: 'clamp(8rem, 18vw, 16rem)',
              color: STAT.accent,
              filter: `drop-shadow(0 0 40px ${STAT.accent}77)`,
            }}
          >
            {Math.round(v)}
          </span>
          <span
            className="font-light text-white/80 mb-6 md:mb-10"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            {STAT.suffix}
          </span>
        </div>

        {/* 見出し */}
        <motion.h2
          className="text-2xl md:text-4xl font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {STAT.headline}
        </motion.h2>

        {/* 説明 */}
        <motion.p
          className="text-sm md:text-base text-white/50 leading-relaxed max-w-lg"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {STAT.description}
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
