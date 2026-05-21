'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// Code Diff ビューアー。Git の diff のように追加 / 削除 / コンテキスト行を表示。
// レビュー前後・リファクタリングのビフォーアフターを示すのに便利。

type DiffLine = { type: 'context' | 'add' | 'remove'; text: string };

// TODO: 差分内容を書き換え
const DIFF: DiffLine[] = [
  { type: 'context', text: 'function processItem(item) {' },
  { type: 'remove',  text: '  const result = transform(item);' },
  { type: 'remove',  text: '  return result;' },
  { type: 'add',     text: '  const validated = validate(item);' },
  { type: 'add',     text: '  if (!validated) return null;' },
  { type: 'add',     text: '  const result = transform(validated);' },
  { type: 'add',     text: '  return enrich(result);' },
  { type: 'context', text: '}' },
];

// TODO: ファイルパスとコミット要約
const FILE_LABEL = 'src/utils/process.ts';
const COMMIT     = 'feat: add validation and enrichment';

export default function CodeDiff() {
  const adds    = DIFF.filter((d) => d.type === 'add').length;
  const removes = DIFF.filter((d) => d.type === 'remove').length;

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex items-end justify-between gap-4 flex-wrap shrink-0">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              Code · Diff
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {/* TODO: 差分セクションのメイン見出し */}
              ここが変わった
            </h2>
          </div>
          <span className="text-xs text-white/40 font-mono">{COMMIT}</span>
        </div>

        {/* Diff カード */}
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d14]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* ファイルバー */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
            </div>
            <span className="text-xs text-white/55 font-mono">{FILE_LABEL}</span>
            <div className="ml-auto flex items-center gap-3 text-[10px] font-mono">
              <span className="text-[#FF6B9D]">− {removes}</span>
              <span className="text-[#88bbff]">+ {adds}</span>
            </div>
          </div>

          {/* Diff 行 */}
          <div
            className="font-mono text-xs md:text-sm overflow-auto"
            style={{ maxHeight: 'min(55vh, 460px)' }}
          >
            {DIFF.map((line, i) => {
              const lineNum = i + 1;
              let bg = 'transparent';
              let marker = ' ';
              let textColor = 'rgba(255,255,255,0.78)';
              if (line.type === 'add') {
                bg = 'rgba(136,187,255,0.10)';
                marker = '+';
                textColor = '#d6e8ff';
              } else if (line.type === 'remove') {
                bg = 'rgba(255,107,157,0.10)';
                marker = '−';
                textColor = '#ffcedb';
              }
              return (
                <motion.div
                  key={i}
                  className="flex items-stretch"
                  style={{ background: bg }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                >
                  <span className="w-12 px-3 py-1 text-right text-[11px] text-white/30 select-none border-r border-white/5">
                    {lineNum}
                  </span>
                  <span
                    className="w-6 px-2 py-1 text-center select-none"
                    style={{
                      color:
                        line.type === 'add'
                          ? '#88bbff'
                          : line.type === 'remove'
                          ? '#FF6B9D'
                          : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {marker}
                  </span>
                  <span
                    className="flex-1 px-3 py-1 whitespace-pre"
                    style={{ color: textColor }}
                  >
                    {line.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 差分に関する補足 */}
          ※ バリデーションとエンリッチを追加し、入力の安全性と出力の質を改善しました。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
