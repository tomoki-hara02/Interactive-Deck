'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: 顧客・パートナー・引用先などのロゴ風テキストを書き換えてください
// 3 行に分けてそれぞれ別方向にスクロールします
const ROW_1 = [
  '◇ Company A', '△ Company B', '◆ Company C', '○ Company D',
  '◎ Company E', '⬡ Company F', '⌬ Company G', '☷ Company H',
];
const ROW_2 = [
  '◉ Partner A', '✦ Partner B', '⌖ Partner C', '◐ Partner D',
  '⊛ Partner E', '✿ Partner F', '∎ Partner G', '✺ Partner H',
];
const ROW_3 = [
  '◇ Client A', '✕ Client B', '◈ Client C', '✻ Client D',
  '⊕ Client E', '◊ Client F', '☄ Client G', '☉ Client H',
];

function Row({
  items,
  direction = 'left',
  durationS = 40,
}: {
  items: string[];
  direction?: 'left' | 'right';
  durationS?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0a0a0f] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0a0a0f] to-transparent" />

      <motion.div
        className="flex gap-12 whitespace-nowrap py-3"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: durationS, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((name, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-sm"
          >
            <span className="text-white/65 text-sm font-medium tracking-wide">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LogoBand() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-6xl gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Trusted by
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {/* TODO: 信頼の証セクションの見出し */}
            多くのチームに選ばれて
          </h2>
        </div>

        {/* Marquee rows */}
        <div className="flex flex-col gap-3 mt-4">
          <Row items={ROW_1} direction="left"  durationS={48} />
          <Row items={ROW_2} direction="right" durationS={58} />
          <Row items={ROW_3} direction="left"  durationS={52} />
        </div>

        {/* Stat band — TODO: 数値と単位ラベルを書き換え */}
        <div className="grid grid-cols-3 gap-6 mt-6 pt-8 border-t border-white/8">
          <Stat n="000+" label="数値ラベル 1" />
          <Stat n="00"   label="数値ラベル 2" />
          <Stat n="0M+"  label="数値ラベル 3" />
        </div>
      </motion.div>
    </SlideWrapper>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl font-bold tracking-tight text-white tabular-nums">
        {n}
      </span>
      <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
        {label}
      </span>
    </div>
  );
}
