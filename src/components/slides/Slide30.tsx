'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: 主要拠点を書き換え（viewBox は 100×50 を想定。x:0-100, y:0-50）
const CITIES = [
  { name: 'Tokyo',     x: 82, y: 19, accent: '#FF6B9D' },
  { name: 'New York',  x: 28, y: 18, accent: '#88bbff' },
  { name: 'London',    x: 48, y: 14, accent: '#c8a8ff' },
  { name: 'Sydney',    x: 85, y: 36, accent: '#ffaacc' },
  { name: 'São Paulo', x: 35, y: 34, accent: '#88bbff' },
];

// TODO: 拠点同士のリレーション（CITIES の index ペア）
const LINKS: [number, number][] = [
  [0, 2], // Tokyo - London
  [1, 2], // NY - London
  [0, 3], // Tokyo - Sydney
  [1, 4], // NY - São Paulo
];

export default function Slide30() {
  // 大陸を抽象化したドット格子（楕円マスク + 擬似ランダムで間引き）
  const dots = useMemo(() => {
    const out: { x: number; y: number; o: number }[] = [];
    const COLS = 56;
    const ROWS = 28;
    for (let yi = 0; yi < ROWS; yi++) {
      for (let xi = 0; xi < COLS; xi++) {
        const x = (xi + 0.5) * (100 / COLS);
        const y = (yi + 0.5) * (50 / ROWS);
        const dx = (x - 50) / 50;
        const dy = (y - 25) / 25;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r > 1) continue;
        const seed = (((xi * 73 + yi * 137 + 11) * 9301) % 233280) / 233280;
        if (seed > 0.5) continue;
        out.push({ x, y, o: 0.12 + seed * 0.45 });
      }
    }
    return out;
  }, []);

  // 拠点間アークの SVG パス
  const arcs = useMemo(() => {
    return LINKS.map(([a, b]) => {
      const A = CITIES[a];
      const B = CITIES[b];
      const mx = (A.x + B.x) / 2;
      const my = Math.min(A.y, B.y) - 7; // 上に膨らませる
      return {
        d: `M ${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`,
        color: A.accent,
      };
    });
  }, []);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Global Reach
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: グローバル展開のメイン見出し */}
            世界とつながる、5 拠点
          </h2>
        </div>

        {/* マップ */}
        <div
          className="relative w-full"
          style={{ aspectRatio: '2 / 1', maxHeight: 'min(56vh, 460px)' }}
        >
          <svg
            viewBox="0 0 100 50"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* ドット格子（抽象化した大陸） */}
            {dots.map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={0.32}
                fill="white"
                opacity={d.o}
              />
            ))}

            {/* 接続アーク */}
            {arcs.map((a, i) => (
              <motion.path
                key={i}
                d={a.d}
                fill="none"
                stroke={a.color}
                strokeWidth={0.35}
                strokeOpacity={0.75}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.6,
                  delay: 0.4 + i * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* 拠点マーカー */}
            {CITIES.map((c, i) => (
              <g key={c.name}>
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={1.4}
                  fill={c.accent}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: 'easeOut',
                  }}
                  style={{
                    transformOrigin: `${c.x}px ${c.y}px`,
                    filter: `drop-shadow(0 0 3px ${c.accent})`,
                  }}
                />
                {/* パルスリング */}
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={1.4}
                  fill="none"
                  stroke={c.accent}
                  strokeWidth={0.35}
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeOut',
                  }}
                  style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                />
              </g>
            ))}

            {/* ラベル */}
            {CITIES.map((c, i) => (
              <motion.text
                key={c.name + '_label'}
                x={c.x}
                y={c.y - 2.6}
                fontSize={2.1}
                fill="white"
                fillOpacity={0.75}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
              >
                {c.name}
              </motion.text>
            ))}
          </svg>
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 拠点・展開エリアに関する補足 */}
          ※ ドットは「拠点エリア」を抽象化した表現です。実際の地理情報ではありません。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
