'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// ─── Data ────────────────────────────────────────────────────────────────────

type TextChunk = { text: string; accent?: boolean };
type IndexedChunk = TextChunk & { globalIdx: number };

const RAW_BLOCKS: TextChunk[][] = [
  // ① 本文・第1文
  [
    { text: '著作物は、次に掲げる場合その他の当該著作物に表現された思想又は感情を自ら享受し又は他人に享受させることを目的としない場合には、その必要と認められる限度において、いずれの方法によるかを問わず、利用することができる。' },
  ],
  // ② 本文・ただし書
  [
    { text: 'ただし、当該著作物の種類及び用途並びに当該利用の態様に照らし著作権者の利益を不当に害することとなる場合は、この限りでない。' },
  ],
  // ③ 一号
  [
    { text: '一　著作物の録音、録画その他の利用に係る技術の開発又は実用化のための試験の用に供する場合' },
  ],
  // ④ 二号（AI学習 — アクセント）
  [
    { text: '二　情報解析（多数の著作物その他の大量の情報から、当該情報を構成する言語、音、影像その他の要素に係る情報を抽出し、比較、分類その他の解析を行うことをいう。）の用に供する場合', accent: true },
  ],
  // ⑤ 三号（AI処理 — アクセント）
  [
    { text: '三　前二号に掲げる場合のほか、著作物の表現についての人の知覚による認識を伴うことなく当該著作物を電子計算機による情報処理の過程における利用その他の利用に供する場合', accent: true },
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

export default function Slide05() {
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
          {/* ── ヘッダー ── */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
              著作権法
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-white">
                第30条の4
              </span>
              <span className="text-[11px] text-white/30 leading-none">
                著作物に表現された思想又は感情の享受を目的としない利用
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

          {/* ── フッター注釈 ── */}
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#88bbff]/60" />
            <span className="text-[11px] text-white/25 tracking-wide">
              二号・三号が AI による著作物の学習・処理を適法とする根拠規定
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
