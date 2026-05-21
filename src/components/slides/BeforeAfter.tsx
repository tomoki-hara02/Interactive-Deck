'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: Before / After 各 5 項目を書き換えてください
const BEFORE = [
  { label: '従来の課題 1' },
  { label: '従来の課題 2' },
  { label: '従来の課題 3' },
  { label: '従来の課題 4' },
  { label: '従来の課題 5' },
];

const AFTER = [
  { label: '導入後の改善 1' },
  { label: '導入後の改善 2' },
  { label: '導入後の改善 3' },
  { label: '導入後の改善 4' },
  { label: '導入後の改善 5' },
];

const ROW_DELAY = 0.12;

export default function BeforeAfter() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-6xl gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Before / After
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: Before/After のセクション見出し */}
            こう変わる
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
          {/* BEFORE column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
                Before
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white/55 tracking-tight">
              Traditional Workflow
            </h3>

            <ul className="flex flex-col gap-3 mt-2">
              {BEFORE.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: 0.4 + i * ROW_DELAY }}
                  className="flex items-start gap-3 text-sm text-white/45 line-through decoration-white/20"
                >
                  <span className="mt-1.5 w-1 h-1 bg-white/30 rounded-full shrink-0" />
                  <span>{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Divider with arrow */}
          <motion.div
            className="hidden md:flex flex-col items-center justify-center gap-3 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          >
            <motion.svg
              width="44" height="44" viewBox="0 0 44 44" fill="none"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <defs>
                <linearGradient id="arr12" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#7B5EA7" />
                  <stop offset="1" stopColor="#FF6B9D" />
                </linearGradient>
              </defs>
              <path d="M6 22h32M28 12l10 10-10 10" stroke="url(#arr12)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/30">
              {/* TODO: 矢印下の小ラベル（例：with [Product]） */}
              with our solution
            </span>
          </motion.div>

          {/* AFTER column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.7 }}
            className="flex flex-col gap-5 rounded-2xl border border-white/15 bg-gradient-to-br from-[#7B5EA7]/10 to-transparent p-6"
            style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.4), 0 0 60px -10px rgba(79,142,247,0.2)' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#7B5EA7] via-[#4F8EF7] to-[#FF6B9D]" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#88bbff]">
                After
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {/* TODO: 改善後のワークフロー名 */}
              New Workflow
            </h3>

            <ul className="flex flex-col gap-3 mt-2">
              {AFTER.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.9 + i * ROW_DELAY }}
                  className="flex items-start gap-3 text-sm text-white/85"
                >
                  <CheckMark delay={0.9 + i * ROW_DELAY + 0.15} />
                  <span>{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}

function CheckMark({ delay }: { delay: number }) {
  return (
    <motion.svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className="shrink-0 mt-0.5"
    >
      <circle cx="8" cy="8" r="7.5" stroke="#88bbff" strokeOpacity="0.4" />
      <motion.path
        d="M4.5 8.2l2.4 2.4 4.6-5"
        stroke="#88bbff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay }}
      />
    </motion.svg>
  );
}
