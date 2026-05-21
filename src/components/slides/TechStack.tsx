'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// 技術スタックグリッド。
// 「Built with」「使用技術」を見せたいときに便利。
// 各カテゴリは色違いで、ホバーすると淡く光る。

// TODO: 各カテゴリの技術スタックを書き換え
const CATEGORIES = [
  {
    name: 'Frontend',
    accent: '#c8a8ff',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    name: 'Backend',
    accent: '#88bbff',
    items: ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis', 'BullMQ'],
  },
  {
    name: 'AI / Data',
    accent: '#ffaacc',
    items: ['OpenAI', 'Anthropic', 'pgvector', 'LangChain', 'Pinecone'],
  },
  {
    name: 'Infra / Ops',
    accent: '#FF6B9D',
    items: ['Vercel', 'AWS', 'GitHub Actions', 'Sentry', 'Datadog'],
  },
];

export default function TechStack() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Built With
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: 技術スタックのメイン見出し */}
            プロダクトを支える技術
          </h2>
        </div>

        {/* カテゴリ群 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-10">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              {/* カテゴリ見出し */}
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: cat.accent,
                    boxShadow: `0 0 10px ${cat.accent}`,
                  }}
                />
                <span
                  className="text-xs tracking-[0.22em] uppercase font-medium"
                  style={{ color: cat.accent }}
                >
                  {cat.name}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* 技術チップ群 */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <motion.span
                    key={item}
                    className="px-3 py-1.5 rounded-lg text-sm border bg-white/[0.04] text-white cursor-default"
                    style={{ borderColor: `${cat.accent}44` }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 + j * 0.05 }}
                    whileHover={{
                      background: `${cat.accent}22`,
                      borderColor: `${cat.accent}99`,
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: スタックに関する補足 */}
          ※ 全てオープンソース、もしくは標準的なマネージドサービスです。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
