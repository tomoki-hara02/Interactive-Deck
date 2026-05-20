'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// 判断ツリー（決定フロー）スライド。
// 「どう選ぶか？」「条件付きで分岐する処理」を SVG で図解するときに便利。

// TODO: 判断ツリーの内容を書き換え（viewBox 500×300 内）
const Q_ROOT  = { x: 200, y: 40, w: 100, h: 50, title: '条件 Q1', sub: '要件は満たすか？' };
const Q_LEFT  = { x:  80, y: 140, w: 100, h: 45, title: '条件 Q2', sub: '予算は OK？', accent: '#c8a8ff' };
const Q_RIGHT = { x: 320, y: 140, w: 100, h: 45, title: '条件 Q3', sub: '代替案あり？', accent: '#ffaacc' };
const LEAVES = [
  { x:  20, label: '採用 A', accent: '#88bbff' },
  { x: 140, label: '採用 B', accent: '#c8a8ff' },
  { x: 260, label: '保留',    accent: '#ffaacc' },
  { x: 380, label: '却下',    accent: '#FF6B9D' },
];

export default function Slide35() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 md:gap-10 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Decision Flow
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {/* TODO: 判断フローのメイン見出し */}
            どう選ぶかの分岐
          </h2>
        </div>

        {/* フロー */}
        <div
          className="relative w-full"
          style={{ aspectRatio: '5 / 3', maxHeight: 'min(58vh, 480px)' }}
        >
          <svg
            viewBox="0 0 500 300"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Edges: Root → Q_LEFT / Q_RIGHT */}
            <motion.path
              d="M 250 90 L 130 140"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.path
              d="M 250 90 L 370 140"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            {/* Edges: Q_LEFT → leaves */}
            <motion.path
              d="M 130 185 L 70 240"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
            <motion.path
              d="M 130 185 L 190 240"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
            {/* Edges: Q_RIGHT → leaves */}
            <motion.path
              d="M 370 185 L 310 240"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
            <motion.path
              d="M 370 185 L 430 240"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />

            {/* Edge labels (Yes / No) */}
            <text x={180} y={110} fill="#c8a8ff" fontSize={9} textAnchor="middle">Yes</text>
            <text x={320} y={110} fill="#ffaacc" fontSize={9} textAnchor="middle">No</text>

            {/* Root node */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <rect
                x={Q_ROOT.x} y={Q_ROOT.y} width={Q_ROOT.w} height={Q_ROOT.h}
                rx={8}
                fill="rgba(136,187,255,0.10)"
                stroke="#88bbff"
                strokeWidth={1.2}
              />
              <text x={Q_ROOT.x + Q_ROOT.w / 2} y={Q_ROOT.y + 22} fill="white" fontSize={11} textAnchor="middle" fontWeight={600}>
                {Q_ROOT.title}
              </text>
              <text x={Q_ROOT.x + Q_ROOT.w / 2} y={Q_ROOT.y + 38} fill="rgba(255,255,255,0.55)" fontSize={9} textAnchor="middle">
                {Q_ROOT.sub}
              </text>
            </motion.g>

            {/* Q_LEFT / Q_RIGHT */}
            {[Q_LEFT, Q_RIGHT].map((q, i) => (
              <motion.g
                key={q.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
              >
                <rect
                  x={q.x} y={q.y} width={q.w} height={q.h}
                  rx={8}
                  fill={`${q.accent}1c`}
                  stroke={q.accent}
                  strokeWidth={1.2}
                />
                <text x={q.x + q.w / 2} y={q.y + 20} fill="white" fontSize={11} textAnchor="middle" fontWeight={600}>
                  {q.title}
                </text>
                <text x={q.x + q.w / 2} y={q.y + 35} fill="rgba(255,255,255,0.55)" fontSize={9} textAnchor="middle">
                  {q.sub}
                </text>
              </motion.g>
            ))}

            {/* Leaf outcomes */}
            {LEAVES.map((leaf, i) => (
              <motion.g
                key={leaf.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.08 }}
              >
                <rect
                  x={leaf.x} y={240} width={100} height={40}
                  rx={20}
                  fill={`${leaf.accent}14`}
                  stroke={leaf.accent}
                  strokeWidth={1.2}
                />
                <text
                  x={leaf.x + 50}
                  y={264}
                  fill={leaf.accent}
                  fontSize={11}
                  textAnchor="middle"
                  fontWeight={600}
                >
                  {leaf.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: フローに関する補足 */}
          ※ 各分岐の質問内容と結果ノードを書き換えて使ってください。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
