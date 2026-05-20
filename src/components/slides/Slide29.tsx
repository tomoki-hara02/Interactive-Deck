'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: テーマに関係するキーワード（12〜18 語程度推奨）
const KEYWORDS = [
  'AI', 'Design', 'Future', 'Workflow', 'Community',
  'Trust', 'Speed', 'Quality', 'Insight', 'Privacy',
  'Scale', 'Craft', 'Open', 'Connected', 'Resilient',
];

const PALETTE = ['#c8a8ff', '#88bbff', '#ffaacc', '#ffffff'];

export default function Slide29() {
  // 中央の見出しを避けるよう、リング状にキーワードを配置（決定論的に位置を生成）
  const placed = useMemo(() => {
    return KEYWORDS.map((kw, i) => {
      const seed = (i * 9301 + 49297) % 233280;
      const r1 = seed / 233280;
      const r2 = ((seed * 7)  % 233280) / 233280;
      const r3 = ((seed * 13) % 233280) / 233280;
      const r4 = ((seed * 17) % 233280) / 233280;

      // 中央 (50%, 50%) を中心とする楕円リング上に配置
      // 楕円は横長（横 38%、縦 30%）にして、画面比に追従させる
      const angle = i * (Math.PI * 2 / KEYWORDS.length) + r1 * 0.6;
      const rx   = 28 + r2 * 14; // 28%-42%
      const ry   = 22 + r3 * 14; // 22%-36%
      const x    = 50 + Math.cos(angle) * rx;
      const y    = 50 + Math.sin(angle) * ry;

      const size    = 1.0 + r4 * 2.6;  // 1.0rem - 3.6rem
      const opacity = 0.4 + r2 * 0.55;
      const color   = PALETTE[Math.floor(r3 * PALETTE.length)];
      const driftD  = r1 * 4;

      return { kw, x, y, size, opacity, color, driftD };
    });
  }, []);

  return (
    <SlideWrapper>
      {/* 浮遊キーワード */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {placed.map((p, i) => (
          <motion.span
            key={p.kw}
            className="absolute font-bold tracking-tight select-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}rem`,
              color: p.color,
              opacity: p.opacity,
              transform: 'translate(-50%, -50%)',
              filter: `drop-shadow(0 0 12px ${p.color}55)`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: p.opacity,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.05 * i },
              scale:   { duration: 0.8, delay: 0.05 * i, ease: 'easeOut' },
              y:       {
                duration: 4 + p.driftD,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.driftD,
              },
            }}
          >
            {p.kw}
          </motion.span>
        ))}
      </div>

      {/* 中央の見出し */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
          Tags · Themes
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          {/* TODO: テーマの集合を表すフレーズ */}
          私たちを取り巻くキーワード
        </h2>
        <p className="text-xs md:text-sm text-white/45 leading-relaxed mt-2 max-w-md">
          {/* TODO: キーワードクラウドの補足 */}
          重要なテーマを一望し、議論の焦点を共有します。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
