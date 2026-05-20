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

// Each row is an array of tokens; empty array = blank line
const LINES: Tok[][] = [
  [{ t: '# Orbit — Legal Prompt Template', k: 'cm' }],
  [],
  [{ t: 'role', k: 'kw' }, { t: ': ', k: 'op' }, { t: '"contract_reviewer"', k: 'str' }],
  [{ t: 'goal', k: 'kw' }, { t: ': ', k: 'op' }, { t: '"NDA に潜む不利な条項を洗い出す"', k: 'str' }],
  [],
  [{ t: 'context', k: 'kw' }, { t: ' = ', k: 'op' }, { t: 'load', k: 'fn' }, { t: '(', k: 'op' }, { t: '"contract.pdf"', k: 'str' }, { t: ')', k: 'op' }],
  [{ t: 'laws', k: 'kw' },    { t: ' = ', k: 'op' }, { t: '[', k: 'op' }, { t: '"著作権法"', k: 'str' }, { t: ', ', k: 'op' }, { t: '"個人情報保護法"', k: 'str' }, { t: ', ', k: 'op' }, { t: '"不正競争防止法"', k: 'str' }, { t: ']', k: 'op' }],
  [],
  [{ t: 'def ', k: 'kw' }, { t: 'analyze', k: 'fn' }, { t: '(', k: 'op' }, { t: 'doc', k: 'var' }, { t: '):', k: 'op' }],
  [{ t: '  clauses', k: 'var' }, { t: ' = ', k: 'op' }, { t: 'orbit.extract', k: 'fn' }, { t: '(', k: 'op' }, { t: 'doc', k: 'var' }, { t: ')', k: 'op' }],
  [{ t: '  risks', k: 'var' },   { t: ' = ', k: 'op' }, { t: 'orbit.score', k: 'fn' },   { t: '(', k: 'op' }, { t: 'clauses', k: 'var' }, { t: ', ', k: 'op' }, { t: 'laws', k: 'var' }, { t: ')', k: 'op' }],
  [{ t: '  return ', k: 'kw' }, { t: 'risks.', k: 'var' }, { t: 'sorted', k: 'fn' }, { t: '(', k: 'op' }, { t: 'by', k: 'kw' }, { t: '=', k: 'op' }, { t: '"severity"', k: 'str' }, { t: ', ', k: 'op' }, { t: 'desc', k: 'kw' }, { t: '=', k: 'op' }, { t: 'True', k: 'num' }, { t: ')', k: 'op' }],
  [],
  [{ t: '# → 12 件のリスクが見つかりました', k: 'cm' }],
];

export default function Slide14() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-4xl gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Prompt Engineering
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            「法律家のための」設計言語
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
              orbit/templates/nda_review.py
            </span>
            <span className="ml-auto text-[10px] text-[#88bbff]/70 tracking-widest">
              ● connected
            </span>
          </div>

          {/* Code area */}
          <div className="flex">
            {/* Line numbers */}
            <div className="px-4 py-5 text-right select-none">
              {LINES.map((_, i) => (
                <div key={i} className="text-[11px] font-mono text-white/20 leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code lines */}
            <div className="flex-1 py-5 pr-6 font-mono text-[13px] leading-6">
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
              <span>orbit-runtime · ready</span>
            </div>
          </div>
        </motion.div>

        <p className="text-xs text-white/30 tracking-wide">
          法務ワークフローを「再利用可能なテンプレート」として組み立てる
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
