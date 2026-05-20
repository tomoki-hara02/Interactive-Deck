'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// ─── Triangle geometry ──────────────────────────────────────────────────────
// viewBox は両側に法律名ラベル分の余白を確保した横長サイズ
const S  = 280;                             // side length (SVG units)
const H  = (S * Math.sqrt(3)) / 2;         // height
const VW = 760, VH = 540;                  // viewBox size
const CX = VW / 2, CY = VH / 2 + 10;      // center

const vT = { x: CX,         y: CY - (H * 2) / 3 };   // top
const vR = { x: CX + S / 2, y: CY + H / 3 };          // bottom-right
const vL = { x: CX - S / 2, y: CY + H / 3 };          // bottom-left

// Clockwise path: top → right → left → top
const PATH = `M${vT.x},${vT.y} L${vR.x},${vR.y} L${vL.x},${vL.y} Z`;
const PERI  = S * 3;   // total perimeter
// 一辺の半分 = S/2、周長は S*3 なので 1/6 で「半辺ぶん」になる
const SEG_LEN = PERI / 6;
const SEG_W = SEG_LEN; // wide glow segment
const SEG_C = SEG_LEN; // core glow segment

// The glow cycle is 4s. Each edge = 4/3 ≈ 1.33s.
// Vertex pulse peaks: top=0s, right=1.33s, left=2.67s
const CYCLE = 4;

// ─── Law node definitions ───────────────────────────────────────────────────
const NODES = [
  {
    v:     vT,
    law:   '著作権法',
    en:    'Copyright Law',
    sub:   'コンテンツ・創作物の知的財産を保護',
    color: '#c4aeff',
    anchor: 'middle' as const,
    lx: 0, ly: -34,           // label offset from vertex
    delay: 0,
  },
  {
    v:     vR,
    law:   '不正競争防止法',
    en:    'Unfair Competition Law',
    sub:   '営業秘密・ブランドを競争上の不正から保護',
    color: '#88bbff',
    anchor: 'start' as const,
    lx: 22, ly: 4,
    delay: CYCLE / 3,
  },
  {
    v:     vL,
    law:   '個人情報保護法',
    en:    'Personal Information Law',
    sub:   '個人データ取扱いとプライバシーを規律',
    color: '#ffaacc',
    anchor: 'end' as const,
    lx: -22, ly: 4,
    delay: (CYCLE * 2) / 3,
  },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function Slide04() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-4xl px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.05 }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs tracking-[0.22em] uppercase text-white/35">
            Legal Framework
          </span>
          <h2 className="text-5xl font-bold tracking-tight text-white">
            3つの重要法規
          </h2>
        </div>

        {/* SVG Triangle */}
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="w-full max-w-[760px]"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Wide soft glow filter */}
            <filter id="glow-edge" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Tight core glow */}
            <filter id="glow-core" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Vertex dot glow */}
            <filter id="glow-dot" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Guide line — thin white path the glow travels along ── */}
          <path
            d={PATH}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1}
            fill="none"
          />

          {/* ── Traveling glow — wide, soft outer layer ── */}
          <motion.path
            d={PATH}
            stroke="#6aaaff"
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${SEG_W} ${PERI - SEG_W}`}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -PERI }}
            transition={{ duration: CYCLE, repeat: Infinity, ease: 'linear' }}
            filter="url(#glow-edge)"
            opacity={0.22}
          />

          {/* ── Traveling glow — narrow bright core ── */}
          <motion.path
            d={PATH}
            stroke="#ccecff"
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${SEG_C} ${PERI - SEG_C}`}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -PERI }}
            transition={{ duration: CYCLE, repeat: Infinity, ease: 'linear' }}
            filter="url(#glow-core)"
          />

          {/* ── Vertex nodes ── */}
          {NODES.map((node) => (
            <g key={node.law}>
              {/* Ripple ring — expands outward as glow arrives */}
              <motion.circle
                cx={node.v.x}
                cy={node.v.y}
                r={7}
                fill="none"
                stroke={node.color}
                strokeWidth={1.5}
                initial={{ r: 7, opacity: 0.7 }}
                animate={{ r: [7, 20], opacity: [0.8, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatDelay: CYCLE - 1.4,
                  ease: 'easeOut',
                  delay: node.delay,
                }}
              />

              {/* Solid center dot */}
              <motion.circle
                cx={node.v.x}
                cy={node.v.y}
                r={5}
                fill={node.color}
                filter="url(#glow-dot)"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: CYCLE,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: node.delay,
                }}
              />

              {/* Law name */}
              <text
                x={node.v.x + node.lx}
                y={node.v.y + node.ly}
                textAnchor={node.anchor}
                fill={node.color}
                fontSize={15}
                fontWeight="700"
                letterSpacing="0.02em"
                fontFamily="sans-serif"
              >
                {node.law}
              </text>

              {/* English subtitle */}
              <text
                x={node.v.x + node.lx}
                y={node.v.y + node.ly + 18}
                textAnchor={node.anchor}
                fill="rgba(255,255,255,0.32)"
                fontSize={10}
                fontFamily="sans-serif"
                letterSpacing="0.04em"
              >
                {node.en}
              </text>
            </g>
          ))}

          {/* ── Center label ── */}
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            fill="rgba(255,255,255,0.18)"
            fontSize={11}
            letterSpacing="0.18em"
            fontFamily="sans-serif"
          >
            ORBIT
          </text>
          <text
            x={CX}
            y={CY + 12}
            textAnchor="middle"
            fill="rgba(255,255,255,0.10)"
            fontSize={9}
            letterSpacing="0.12em"
            fontFamily="sans-serif"
          >
            LEGAL AI
          </text>
        </svg>

        {/* Footer note */}
        <p className="text-center text-xs text-white/30 tracking-wide">
          AIが法的文書を処理する際に交差する 3 つの重要な法律領域
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
