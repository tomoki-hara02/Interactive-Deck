'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

const BEFORE = [
  { label: '紙のファイル数百冊を物理探索' },
  { label: '条文検索に数十分〜数時間' },
  { label: '担当弁護士の経験に大きく依存' },
  { label: '関連判例は記憶か手作業の照合' },
  { label: '夜遅くまでドラフトをレビュー' },
];

const AFTER = [
  { label: '全社の文書を即時セマンティック検索' },
  { label: '関連条文を 1 秒未満で抽出' },
  { label: '判断根拠と引用が常に明示される' },
  { label: '判例・ガイドラインを横断推論' },
  { label: '初次レビューを AI が下書き' },
];

const ROW_DELAY = 0.12;

export default function Slide12() {
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
            実務はこう変わる
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
              with Orbit
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
              Orbit-powered Workflow
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
