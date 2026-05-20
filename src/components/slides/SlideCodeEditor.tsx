'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// Syntax-tinted token. (kind drives color)
type Tok = { t: string; k?: 'kw' | 'str' | 'fn' | 'cm' | 'op' | 'num' | 'var' };

const COLORS: Record<NonNullable<Tok['k']> | 'def', string> = {
  kw:  '#c8a8ff', // purple — keywords
  str: '#ffe39a', // soft yellow — strings
  fn:  '#88bbff', // blue — function/role
  cm:  '#6a7a9a', // muted — comment
  op:  '#FF6B9D', // pink — operator
  num: '#a8e3a8', // green — numbers
  var: '#e8f0ff', // near-white — variables/text
  def: '#c8d4e8',
};

// TODO: 表示したい疑似コードを書き換えてください
// 各行はトークンの配列。空配列は空行になります。
// k の種類: kw=キーワード(紫), str=文字列(黄), fn=関数(青), cm=コメント(灰), op=演算子(ピンク), num=数値(緑), var=変数(白)
const LINES: Tok[][] = [
  [{ t: '# Template — your prompt or pipeline', k: 'cm' }],
  [],
  [{ t: 'role', k: 'kw' }, { t: ': ', k: 'op' }, { t: '"assistant_role"', k: 'str' }],
  [{ t: 'goal', k: 'kw' }, { t: ': ', k: 'op' }, { t: '"このプロンプトのゴールを書く"', k: 'str' }],
  [],
  [{ t: 'context', k: 'kw' }, { t: ' = ', k: 'op' }, { t: 'load', k: 'fn' }, { t: '(', k: 'op' }, { t: '"input.pdf"', k: 'str' }, { t: ')', k: 'op' }],
  [{ t: 'tags', k: 'kw' },    { t: ' = ', k: 'op' }, { t: '[', k: 'op' }, { t: '"タグ A"', k: 'str' }, { t: ', ', k: 'op' }, { t: '"タグ B"', k: 'str' }, { t: ', ', k: 'op' }, { t: '"タグ C"', k: 'str' }, { t: ']', k: 'op' }],
  [],
  [{ t: 'def ', k: 'kw' }, { t: 'process', k: 'fn' }, { t: '(', k: 'op' }, { t: 'doc', k: 'var' }, { t: '):', k: 'op' }],
  [{ t: '  items', k: 'var' }, { t: ' = ', k: 'op' }, { t: 'extract', k: 'fn' }, { t: '(', k: 'op' }, { t: 'doc', k: 'var' }, { t: ')', k: 'op' }],
  [{ t: '  scores', k: 'var' }, { t: ' = ', k: 'op' }, { t: 'evaluate', k: 'fn' },   { t: '(', k: 'op' }, { t: 'items', k: 'var' }, { t: ', ', k: 'op' }, { t: 'tags', k: 'var' }, { t: ')', k: 'op' }],
  [{ t: '  return ', k: 'kw' }, { t: 'scores.', k: 'var' }, { t: 'sorted', k: 'fn' }, { t: '(', k: 'op' }, { t: 'by', k: 'kw' }, { t: '=', k: 'op' }, { t: '"score"', k: 'str' }, { t: ', ', k: 'op' }, { t: 'desc', k: 'kw' }, { t: '=', k: 'op' }, { t: 'True', k: 'num' }, { t: ')', k: 'op' }],
  [],
  [{ t: '# → 結果の要約をコメントとして表示', k: 'cm' }],
];

export default function SlideCodeEditor() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-4xl gap-3 md:gap-5 max-h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col gap-1 shrink-0">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Prompt Engineering
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            「現場のための」設計言語
          </h2>
        </div>

        {/* Editor window */}
        <motion.div
          className="rounded-xl overflow-hidden border border-white/10 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(180deg, rgba(20,22,38,0.85), rgba(12,14,28,0.85))',
            boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7), 0 0 80px -20px rgba(79,142,247,0.18)',
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/70" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/70" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/70" />
            <span className="ml-3 text-[11px] text-white/40 font-mono tracking-wide">
              {/* TODO: 表示ファイル名（疑似的なパス） */}
              project/templates/example.py
            </span>
            <span className="ml-auto text-[10px] text-[#88bbff]/70 tracking-widest">
              ● connected
            </span>
          </div>

          {/* Code area — 画面高さで縮小 */}
          <div
            className="flex overflow-auto"
            style={{ maxHeight: 'min(54vh, 380px)' }}
          >
            {/* Line numbers */}
            <div className="px-3 md:px-4 py-3 md:py-5 text-right select-none">
              {LINES.map((_, i) => (
                <div key={i} className="text-[10px] md:text-[11px] font-mono text-white/20 leading-5 md:leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code lines */}
            <div className="flex-1 py-3 md:py-5 pr-4 md:pr-6 font-mono text-[11px] md:text-[13px] leading-5 md:leading-6">
              {LINES.map((line, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.4 + li * 0.06 }}
                  className="whitespace-pre"
                >
                  {line.length === 0 ? '\u00A0' : line.map((tok, ti) => (
                    <span
                      key={ti}
                      style={{ color: COLORS[tok.k ?? 'def'] }}
                    >
                      {tok.t}
                    </span>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-[10px] text-white/40 font-mono">
            <div className="flex items-center gap-3">
              <span>Python</span>
              <span>UTF-8</span>
              <span>LF</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#88bbff]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span>{/* TODO: ステータスバー右側のテキスト */}runtime · ready</span>
            </div>
          </div>
        </motion.div>

        <p className="text-[11px] md:text-xs text-white/30 tracking-wide shrink-0">
          ワークフローを「再利用可能なテンプレート」として組み立てる
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
