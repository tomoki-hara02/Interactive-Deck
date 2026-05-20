'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// ターミナル風の逐次表示スライド。
// セットアップ手順や CLI デモを「動いている感」つきで見せたいときに便利。

type Line = {
  type: 'cmd' | 'out' | 'success' | 'comment';
  text: string;
};

// TODO: 表示する行を書き換え
//   cmd     = $ プロンプト付きで表示
//   out     = 標準出力（白）
//   success = 完了行（青）
//   comment = コメント（# 始まり・グレー）
const LINES: Line[] = [
  { type: 'cmd',     text: 'npm create next-app@latest my-app' },
  { type: 'out',     text: 'Creating a new Next.js app in my-app...' },
  { type: 'success', text: '✓ Project created in 8.3s' },
  { type: 'cmd',     text: 'cd my-app && npm install framer-motion' },
  { type: 'out',     text: 'added 4 packages in 1.2s' },
  { type: 'cmd',     text: 'npm run dev' },
  { type: 'out',     text: '▲ Next.js 15.x — Ready in 1.4s' },
  { type: 'comment', text: '# ブラウザで http://localhost:3000 を開く' },
];

// TODO: 行が次々に出現する間隔（ms）
const STEP_MS = 480;

export default function SlideTerminalDemo() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Command Line · Demo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {/* TODO: ターミナルセクションのメイン見出し */}
            数行のコマンドで、すぐ動く
          </h2>
        </div>

        {/* ターミナル */}
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a10] shadow-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* タイトルバー */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.025]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B9D]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffaacc]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#88bbff]" />
            </div>
            <span className="text-xs text-white/40 font-mono ml-3">
              {/* TODO */} ~/projects · zsh
            </span>
          </div>

          {/* 本文 */}
          <div
            className="p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-auto"
            style={{ maxHeight: 'min(55vh, 460px)' }}
          >
            {LINES.slice(0, shown).map((line, i) => {
              if (line.type === 'cmd') {
                return (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#88bbff]">$</span>
                    <span className="text-white/90">{line.text}</span>
                  </div>
                );
              }
              if (line.type === 'success') {
                return (
                  <div key={i} className="text-[#88bbff] pl-4">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'comment') {
                return (
                  <div key={i} className="text-white/35 italic mt-2">
                    {line.text}
                  </div>
                );
              }
              return (
                <div key={i} className="text-white/60 pl-4">
                  {line.text}
                </div>
              );
            })}

            {/* 末尾のカーソル */}
            {shown >= LINES.length && (
              <div className="flex items-start gap-2 mt-1">
                <span className="text-[#88bbff]">$</span>
                <motion.span
                  className="inline-block w-2 h-4 bg-white/60"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: ターミナルに関する補足 */}
          ※ コマンドは zsh / Node 20+ を想定しています。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
