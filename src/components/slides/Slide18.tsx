'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

type Row = {
  label: string;
  value: number;
  unit: string;
  accent: string;
};

const ROWS: Row[] = [
  { label: 'NDA レビュー',    value: 94, unit: '%', accent: '#88bbff' },
  { label: '契約条項抽出',     value: 91, unit: '%', accent: '#c8a8ff' },
  { label: '判例引用の正確性', value: 88, unit: '%', accent: '#ffaacc' },
  { label: 'コンプラ違反検知', value: 82, unit: '%', accent: '#9ee0a8' },
  { label: '個人情報リスク',   value: 76, unit: '%', accent: '#f7c46c' },
];

function useCountUp(target: number, ms: number, start: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - t0) / ms, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, start]);
  return v;
}

function Bar({ row, start, delay }: { row: Row; start: boolean; delay: number }) {
  const v = useCountUp(row.value, 1500, start);

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={start ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-white/80 font-medium tracking-wide">
          {row.label}
        </span>
        <span
          className="text-2xl font-bold tabular-nums tracking-tight"
          style={{ color: row.accent }}
        >
          {v.toFixed(0)}
          <span className="text-sm font-light text-white/40 ml-0.5">{row.unit}</span>
        </span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden bg-white/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${row.accent}80, ${row.accent})`,
            boxShadow: `0 0 12px ${row.accent}66`,
          }}
          initial={{ width: 0 }}
          animate={start ? { width: `${row.value}%` } : {}}
          transition={{ duration: 1.5, ease: 'easeOut', delay }}
        />
        {/* Shine */}
        <motion.div
          className="absolute inset-y-0 w-12 opacity-50"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          }}
          animate={start ? { x: ['-50px', '500px'] } : {}}
          transition={{ duration: 1.6, ease: 'easeOut', delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default function Slide18() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <SlideWrapper>
      <motion.div
        ref={ref}
        className="flex flex-col w-full max-w-3xl gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Benchmark Accuracy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            タスク別の精度ベンチマーク
          </h2>
        </div>

        <div className="flex flex-col gap-7">
          {ROWS.map((r, i) => (
            <Bar key={r.label} row={r} start={inView} delay={0.1 + i * 0.12} />
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/8 text-xs text-white/40">
          <span>n = 1,000 サンプル / domain experts による評価</span>
          <span className="text-[10px] tracking-widest uppercase text-white/30">
            v1.2 · 2026Q1
          </span>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
