'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// ─── Data ────────────────────────────────────────────────────────────────────

type TextChunk = { text: string; accent?: boolean };
type IndexedChunk = TextChunk & { globalIdx: number };

// TODO: クリックで段階的に強調していく本文 / 条文 / 引用文を書き換えてください
// accent: true を付けた段落はハイライト色（青）で目立たせます。
const RAW_BLOCKS: TextChunk[][] = [
  [
    { text: 'ここに本文の第 1 段落を配置します。長い引用文や条文、宣言文などをそのまま貼り付けるのに向いています。クリックするごとに段落が順に強調されていきます。' },
  ],
  [
    { text: 'ここに本文の第 2 段落を配置します。前段の補足条件や、ただし書を入れる場所として活用してください。' },
  ],
  [
    { text: '一　第 1 のサブ条項。箇条書きとしてインデントされて表示されます。' },
  ],
  [
    { text: '二　第 2 のサブ条項（強調表示）。聴衆に最も伝えたい一文を、accent: true で目立たせましょう。', accent: true },
  ],
  [
    { text: '三　第 3 のサブ条項（強調表示）。複数のキーポイントを連続して強調することもできます。', accent: true },
  ],
];

function buildBlocks() {
  let idx = 0;
  const blocks: IndexedChunk[][] = RAW_BLOCKS.map((block) =>
    block.map((chunk) => ({ ...chunk, globalIdx: idx++ }))
  );
  return { blocks, total: idx };
}

const { blocks: BLOCKS, total: TOTAL } = buildBlocks();

// ─── Component ───────────────────────────────────────────────────────────────

export default function TextHighlight() {
  // -1 = まだ何も表示していない、0〜TOTAL-1 = 現在ハイライト中のチャンク
  const [activeIdx, setActiveIdx] = useState(-1);

  const isFinished = activeIdx >= TOTAL - 1;

  const handleClick = (e: React.MouseEvent) => {
    if (isFinished) {
      // 全文表示済み → バブルアップしてスライドを進める
      return;
    }
    e.stopPropagation(); // Presentation の左右クリックをブロック
    setActiveIdx((i) => i + 1);
  };

  return (
    // absolute inset-0 でクリック領域を全画面にカバー
    <div className="absolute inset-0" onClick={handleClick}>
      <SlideWrapper>
        <motion.div
          className="flex flex-col items-start gap-4 w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {/* ── ヘッダー ── TODO: 出典・タイトル・サブタイトルを書き換え */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
              Source / Category
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-white">
                セクション タイトル
              </span>
              <span className="text-[11px] text-white/30 leading-none">
                本文の出典・章番号などの補足テキスト
              </span>
            </div>
          </div>

          {/* ── 区切り線 ── */}
          <div className="w-full h-px bg-white/8" />

          {/* ── 本文 ── */}
          <div className="flex flex-col gap-3 text-sm leading-[1.95]">
            {BLOCKS.map((block, bi) => (
              <div key={bi} className={bi > 0 ? 'pl-3 border-l border-white/8' : ''}>
                {block.map((chunk) => {
                  const isActive = chunk.globalIdx === activeIdx;
                  // activeIdx より後はまだ未表示（opacity 0）
                  const isHidden = chunk.globalIdx > activeIdx;
                  return (
                    <motion.span
                      key={chunk.globalIdx}
                      animate={{
                        opacity: isHidden ? 0 : isActive ? 1 : 0.22,
                        color: chunk.accent ? '#88bbff' : '#ffffff',
                        filter: isActive
                          ? chunk.accent
                            ? 'drop-shadow(0 0 6px rgba(79,142,247,0.9))'
                            : 'drop-shadow(0 0 6px rgba(200,220,255,0.7))'
                          : 'none',
                      }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      {chunk.text}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ── フッター注釈 ── TODO: 強調パートの要約・結論を一行で */}
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#88bbff]/60" />
            <span className="text-[11px] text-white/25 tracking-wide">
              ハイライト部分の結論や要約をここに 1 行で添える
            </span>
          </div>
        </motion.div>

        {/* ── クリックヒント ── */}
        <AnimatePresence>
          {!isFinished && (
            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/20 text-xs tracking-widest pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-block w-3 h-px bg-white/20" />
              クリックで次の文へ
              <span className="inline-block w-3 h-px bg-white/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </SlideWrapper>
    </div>
  );
}
