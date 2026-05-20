'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// AI エージェントの実行フローを 4 ステージで可視化するスライド。
// プロンプト → 推論 → ツール実行 → 出力 のような、Cursor / Copilot 系の説明に便利。
// TODO: ステージごとに icon / label / desc / accent を書き換え

const STAGES = [
  {
    icon: '◇',
    label: 'Input',
    desc: '自然言語の依頼。\nコンテキスト・添付ファイル・ルールも含む。',
    accent: '#c8a8ff',
  },
  {
    icon: '◈',
    label: 'Reasoning',
    desc: 'タスク分解と計画立案。\n優先順位と前提を整理してから動く。',
    accent: '#88bbff',
  },
  {
    icon: '◉',
    label: 'Tools',
    desc: 'ファイル読み書き・検索・実行。\n必要に応じて並列・反復で呼び出す。',
    accent: '#FF6B9D',
  },
  {
    icon: '◆',
    label: 'Output',
    desc: '構造化された結果・差分・要約。\n不明点は追加質問で詰める。',
    accent: '#ffaacc',
  },
];

export default function SlideAgentFlow() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 md:gap-12 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: フローのメイン見出し */}
            AI エージェントの動き方
          </h2>
        </div>

        {/* ステージ */}
        <div className="relative">
          {/* 接続線（PC のみ表示） */}
          <div className="absolute hidden md:block left-[12%] right-[12%] top-[64px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-4 relative">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.label}
                className="relative flex flex-col items-start gap-3 p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.12,
                  ease: 'easeOut',
                }}
              >
                {/* アイコン円 */}
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light"
                  style={{
                    background: `${s.accent}22`,
                    border: `1px solid ${s.accent}66`,
                    color: s.accent,
                    boxShadow: `0 0 18px ${s.accent}44`,
                  }}
                >
                  {s.icon}
                  {/* パルスリング */}
                  <motion.span
                    className="absolute inset-0 rounded-full border pointer-events-none"
                    style={{ borderColor: s.accent }}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeOut',
                    }}
                  />
                </div>

                {/* ステップ番号 */}
                <span
                  className="text-[10px] font-mono tabular-nums tracking-widest"
                  style={{ color: s.accent }}
                >
                  STEP {String(i + 1).padStart(2, '0')}
                </span>

                {/* ラベル */}
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                  {s.label}
                </h3>

                {/* 説明 */}
                <p className="text-xs md:text-sm text-white/55 leading-relaxed whitespace-pre-line">
                  {s.desc}
                </p>

                {/* 次への矢印（最後を除く） */}
                {i < STAGES.length - 1 && (
                  <div
                    className="hidden md:block absolute -right-3 top-9 text-xl pointer-events-none"
                    style={{ color: `${STAGES[i + 1].accent}cc` }}
                  >
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 補足 */}
          ※ ステージは並列・反復実行されることもあります。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
