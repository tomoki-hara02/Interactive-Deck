'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

const VW = 720;
const VH = 520;
const CX = VW / 2;
const CY = VH / 2 + 10;

// ─── Node definitions ───────────────────────────────────────────────────────
type Node = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  r: number;
  hub?: boolean;
};

const NODES: Node[] = [
  // Center hub
  { id: 'core', label: 'Orbit AI', x: CX, y: CY, r: 36, hub: true },
  // Primary laws
  { id: 'cr',   label: '著作権法',         sub: 'Copyright',   x: CX,        y: CY - 170, r: 26 },
  { id: 'pi',   label: '個人情報保護法',   sub: 'PIPL',        x: CX - 250,  y: CY - 50,  r: 26 },
  { id: 'uc',   label: '不正競争防止法',   sub: 'Unfair Comp.', x: CX + 250,  y: CY - 50,  r: 26 },
  // Secondary
  { id: 'ai',   label: 'AI法',             sub: '2026', x: CX - 180,  y: CY + 130, r: 20 },
  { id: 'iso',  label: 'ISO/IEC 42001',    sub: 'AI Mgmt',    x: CX + 180,  y: CY + 130, r: 20 },
  { id: 'gdpr', label: 'GDPR',             sub: 'EU',         x: CX,        y: CY + 200, r: 20 },
];

// ─── Edge definitions ───────────────────────────────────────────────────────
type Edge = { from: string; to: string };

const EDGES: Edge[] = [
  // Hub → primary
  { from: 'core', to: 'cr' },
  { from: 'core', to: 'pi' },
  { from: 'core', to: 'uc' },
  // Hub → secondary
  { from: 'core', to: 'ai' },
  { from: 'core', to: 'iso' },
  { from: 'core', to: 'gdpr' },
  // Cross-links
  { from: 'cr',  to: 'ai' },
  { from: 'pi',  to: 'gdpr' },
  { from: 'pi',  to: 'ai' },
  { from: 'uc',  to: 'iso' },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function Slide07() {
  const byId = useMemo(
    () => Object.fromEntries(NODES.map((n) => [n.id, n])),
    []
  );

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-start gap-6 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* Header */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Knowledge Graph
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Orbit が織りなす法令ネットワーク
          </h2>
        </div>

        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="g7-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="g7-soft" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="g7-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#88bbff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4F8EF7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Edges ── */}
          {EDGES.map((e, i) => {
            const a = byId[e.from];
            const b = byId[e.to];
            const length = Math.hypot(b.x - a.x, b.y - a.y);
            const delay = 0.4 + i * 0.08;
            return (
              <g key={`${e.from}-${e.to}`}>
                {/* Static dim line */}
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                />
                {/* Animated traveling pulse */}
                <motion.line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#88bbff"
                  strokeWidth={1.5}
                  strokeDasharray={`${length * 0.18} ${length}`}
                  initial={{ strokeDashoffset: length }}
                  animate={{ strokeDashoffset: -length }}
                  transition={{
                    duration: 3.5,
                    delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  filter="url(#g7-glow)"
                  opacity={0.85}
                />
              </g>
            );
          })}

          {/* ── Nodes ── */}
          {NODES.map((n, i) => (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
            >
              {/* Outer halo */}
              {n.hub && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r + 22}
                  fill="url(#g7-core-grad)"
                  opacity={0.55}
                />
              )}

              {/* Pulsing ring */}
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="none"
                stroke={n.hub ? '#88bbff' : 'rgba(200,180,255,0.4)'}
                strokeWidth={n.hub ? 1.4 : 1}
                animate={{ r: [n.r, n.r + 7], opacity: [0.7, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: i * 0.18,
                }}
              />

              {/* Solid disk */}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={n.hub ? '#0e1838' : 'rgba(15,20,40,0.85)'}
                stroke={n.hub ? '#88bbff' : 'rgba(255,255,255,0.18)'}
                strokeWidth={n.hub ? 1.6 : 1}
                filter={n.hub ? 'url(#g7-soft)' : undefined}
              />

              {/* Inner dot */}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.hub ? 4 : 2.5}
                fill={n.hub ? '#ffffff' : '#c8a8ff'}
              />

              {/* Label */}
              <text
                x={n.x}
                y={n.y + n.r + 18}
                textAnchor="middle"
                fill={n.hub ? '#ffffff' : 'rgba(255,255,255,0.85)'}
                fontSize={n.hub ? 14 : 11}
                fontWeight={n.hub ? 700 : 500}
                fontFamily="sans-serif"
                letterSpacing="0.02em"
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={n.x}
                  y={n.y + n.r + 32}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.3)"
                  fontSize={9}
                  fontFamily="sans-serif"
                  letterSpacing="0.06em"
                >
                  {n.sub}
                </text>
              )}
            </motion.g>
          ))}
        </svg>

        <p className="text-xs text-white/30 tracking-wide self-center">
          交差する法令を一つのナレッジ・グラフとして扱うことで、AI は文脈横断の推論を可能にする
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
