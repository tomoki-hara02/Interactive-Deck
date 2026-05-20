'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

const PROMPT = '第30条の4は、AIモデルの学習目的での著作物利用を許容しますか？';

// Stream tokens — emulates an LLM streaming response token-by-token
const TOKENS = [
  'はい、', '原則として', '許容', 'されます。', '\n\n',
  '第30条の4', 'は、', '「思想又は感情の', '享受を', '目的としない」', '利用を', '広く', '認める', '規定であり、', '\n',
  '同条', '第二号', 'は', '「情報解析の用に供する場合」', 'を', '具体例', 'として', '明示的に', '列挙しています。', '\n\n',
  'ただし、', 'ただし書により、', '「著作権者の利益を', '不当に害する場合」', 'は', '適用除外', 'となります。',
];

const TOKEN_MS = 60;
const PROMPT_MS = 38;

// ─── Typewriter helpers ─────────────────────────────────────────────────────
function useTypewriter(text: string, ms: number, start: boolean) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!start) return;
    setOut('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, ms);
    return () => clearInterval(id);
  }, [text, ms, start]);
  return out;
}

function useTokenStream(tokens: string[], ms: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= tokens.length) clearInterval(id);
    }, ms);
    return () => clearInterval(id);
  }, [tokens, ms, start]);
  return tokens.slice(0, count).join('');
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function Slide08() {
  const [phase, setPhase] = useState<'prompt' | 'thinking' | 'answer'>('prompt');

  const promptText = useTypewriter(PROMPT, PROMPT_MS, phase === 'prompt');
  const promptDone = promptText.length === PROMPT.length;

  useEffect(() => {
    if (!promptDone || phase !== 'prompt') return;
    const t1 = setTimeout(() => setPhase('thinking'), 500);
    const t2 = setTimeout(() => setPhase('answer'), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [promptDone, phase]);

  const answerText = useTokenStream(TOKENS, TOKEN_MS, phase === 'answer');

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-2xl gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* Header */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Live Inference
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Orbit に聞いてみる
          </h2>
        </div>

        {/* ── Prompt bubble ── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.18em] uppercase text-white/30">
              You
            </span>
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm px-5 py-4">
            <p className="text-sm leading-relaxed text-white/85 font-mono min-h-[1.5em]">
              {promptText}
              {!promptDone && (
                <motion.span
                  className="inline-block w-[2px] h-[1em] bg-white/70 align-middle ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </p>
          </div>
        </div>

        {/* ── Answer bubble ── */}
        <AnimatePresence>
          {(phase === 'thinking' || phase === 'answer') && (
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#7B5EA7] via-[#4F8EF7] to-[#FF6B9D]" />
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/30">
                  Orbit
                </span>
              </div>

              <div className="relative rounded-2xl rounded-tl-sm border border-white/10 px-5 py-4 overflow-hidden">
                {/* Animated gradient border glow */}
                <div className="absolute inset-0 -z-10 opacity-30 bg-gradient-to-br from-[#7B5EA7]/20 via-transparent to-[#4F8EF7]/15 blur-2xl" />

                {phase === 'thinking' && (
                  <div className="flex items-center gap-3">
                    <ThinkingDots />
                    <span className="text-xs text-white/40 tracking-wider">
                      Analyzing 著作権法 §30 …
                    </span>
                  </div>
                )}

                {phase === 'answer' && (
                  <p className="text-sm leading-relaxed text-white/90 font-mono whitespace-pre-wrap min-h-[8em]">
                    {answerText}
                    {answerText.length < TOKENS.join('').length && (
                      <motion.span
                        className="inline-block w-[2px] h-[1em] bg-[#88bbff] align-middle ml-0.5"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center gap-2 text-[10px] text-white/25 tracking-widest">
          <span className="w-1 h-1 rounded-full bg-emerald-400/70" />
          Orbit-1.2 · grounded on JP-Legal-Corpus
        </div>
      </motion.div>
    </SlideWrapper>
  );
}

// ─── Animated 3-dot indicator ───────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/70"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
          transition={{
            duration: 1.0,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
