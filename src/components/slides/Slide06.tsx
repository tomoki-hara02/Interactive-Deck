'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// ─── Count-up hook ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1.6, start = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

// ─── Metric card ────────────────────────────────────────────────────────────
type MetricProps = {
  prefix?: string;
  value: number;
  suffix: string;
  unit?: string;
  label: string;
  sublabel: string;
  decimals?: number;
  start: boolean;
  accent: string;
  delay: number;
};

function Metric({
  prefix = '',
  value,
  suffix,
  unit,
  label,
  sublabel,
  decimals = 0,
  start,
  accent,
  delay,
}: MetricProps) {
  const current = useCountUp(value, 1.6, start);
  const formatted = current.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.div
      className="flex flex-col items-start gap-3"
      initial={{ opacity: 0, y: 16 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {/* Small label above */}
      <div className="flex items-center gap-2">
        <span className="w-1 h-1 rounded-full" style={{ background: accent }} />
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
          {label}
        </span>
      </div>

      {/* Massive number — 3列レイアウトに収まるサイズ感 */}
      <div className="flex items-end gap-1 leading-none flex-wrap">
        {prefix && (
          <span className="text-2xl font-light text-white/50 mb-2">{prefix}</span>
        )}
        <span
          className="text-6xl md:text-7xl font-bold tracking-tight tabular-nums"
          style={{
            color: accent,
            filter: `drop-shadow(0 0 18px ${accent}55)`,
          }}
        >
          {formatted}
        </span>
        <span className="text-2xl font-light text-white/70 mb-2">{suffix}</span>
        {unit && (
          <span className="text-lg font-light text-white/40 mb-3 ml-1">
            {unit}
          </span>
        )}
      </div>

      {/* Sublabel */}
      <p className="text-xs text-white/40 leading-relaxed max-w-[16rem]">
        {sublabel}
      </p>
    </motion.div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function Slide06() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <SlideWrapper>
      <motion.div
        ref={ref}
        className="flex flex-col w-full max-w-5xl gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Section Label
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: メトリクスのセクションタイトル */}
            数字が示す、インパクト
          </h2>
        </div>

        {/* Metrics grid — TODO: 値・ラベル・色を 3 つ書き換え */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14">
          <Metric
            label="Metric A"
            value={10}
            suffix="×"
            sublabel="1 つ目の数字の解釈・コンテキストをここに記述します"
            accent="#c8a8ff"
            start={inView}
            delay={0.0}
          />
          <Metric
            prefix=""
            label="Metric B"
            value={0.3}
            suffix="s"
            decimals={1}
            sublabel="2 つ目の数字の解釈・コンテキストをここに記述します"
            accent="#88bbff"
            start={inView}
            delay={0.15}
          />
          <Metric
            label="Metric C"
            value={120}
            suffix="K+"
            unit="units"
            sublabel="3 つ目の数字の解釈・コンテキストをここに記述します"
            accent="#ffaacc"
            start={inView}
            delay={0.3}
          />
        </div>

        {/* Bottom divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        />

        <p className="text-xs text-white/30 tracking-wide">
          {/* TODO: 数値の出典・注釈 */}
          ※ ここに数値の出典や注釈を入れます（例：ベンチマーク条件・サンプル数など）
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
