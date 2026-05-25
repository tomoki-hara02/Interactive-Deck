'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// ─── データ型 ──────────────────────────────────────────────────────────
interface WheelCard {
  id: string;
  /** カード内に大きく描画する頭文字 */
  initial?: string;
  /** カード下部の大きい見出し */
  name: string;
  /** カード下部の小見出し */
  subtitle: string;
  /** カードの主色 */
  accent: string;
  /** カード背景のグラデーション 2 色 */
  gradient: [string, string];
}

// ─── テンプレ用ダミーカスト ─────────────────────────────────────────────
// TODO: セミナーで紹介したい人物 / 事例 / 章に置き換えて使ってください。
const CARDS: WheelCard[] = [
  { id: 'fra',    name: 'FRA',    subtitle: 'THE BLONDE',       accent: '#f9d56e', gradient: ['#f9d56e', '#e94560'] },
  { id: 'mela',   name: 'MELA',   subtitle: 'THE CHICA MALA',   accent: '#48cae4', gradient: ['#48cae4', '#3a86ff'] },
  { id: 'cri',    name: 'CRI',    subtitle: 'THE FINANCIALIST', accent: '#c77dff', gradient: ['#c77dff', '#7209b7'] },
  { id: 'seobby', name: 'SEOBBY', subtitle: 'THE METALHEAD',    accent: '#fb8500', gradient: ['#fb8500', '#dc2f02'] },
  { id: 'leo',    name: 'LEO',    subtitle: 'THE CODER',        accent: '#06ffa5', gradient: ['#06ffa5', '#00b4d8'] },
  { id: 'nico',   name: 'NICO',   subtitle: 'THE DREAMER',      accent: '#ff006e', gradient: ['#ff006e', '#8338ec'] },
  { id: 'sam',    name: 'SAM',    subtitle: 'THE STRATEGIST',   accent: '#ffbe0b', gradient: ['#ffbe0b', '#fb5607'] },
  { id: 'ava',    name: 'AVA',    subtitle: 'THE WRITER',       accent: '#a8dadc', gradient: ['#a8dadc', '#457b9d'] },
  { id: 'tom',    name: 'TOM',    subtitle: 'THE BUILDER',      accent: '#90e0ef', gradient: ['#90e0ef', '#0077b6'] },
];

// ─── ホイール幾何 ───────────────────────────────────────────────────────
const CARD_W = 220;
const CARD_H = 320;
/** 仮想ホイールの半径。大きいほど弧がゆるく＝水平に並んで見える */
const RADIUS = 1800;
/** カード間の角度差（度）。fullCycle = n * STEP_DEG が半周(180°)未満になるよう調整 */
const STEP_DEG = 16;
/**
 * これより遠いカードは描画しない。
 * fullCycle/2 より小さくして、ラップ（テレポート）が不可視域で起きるよう保証する。
 */
const VISIBLE_RANGE_DEG = 65;
/** マウスホイール感度 */
const WHEEL_SENSITIVITY = 0.045;

export default function CardWheel() {
  /**
   * 観覧車の回転角度（度）。クランプなし → 無限スクロール。
   * angle が増える = ホイールが反時計回り（カードが右 → 左へ流れる）
   */
  const [angle, setAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const n = CARDS.length;
  /** ホイール 1 周の角度 */
  const fullCycle = n * STEP_DEG;
  /** 各カードのホイール上の基準位置（中央カードを 0° 基準） */
  const centerOffset = (n - 1) / 2;

  // ─── 入力ハンドラ（クランプなし）────────────────────────────────────
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    setAngle((a) => a + e.deltaY * WHEEL_SENSITIVITY);
  }, []);

  const touchY = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchY.current == null) return;
    const dy = touchY.current - e.touches[0].clientY;
    touchY.current = e.touches[0].clientY;
    setAngle((a) => a + dy * 0.16);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) => {
      if (!el.matches(':hover')) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setAngle((a) => a + STEP_DEG);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setAngle((a) => a - STEP_DEG);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ─── 無限循環：各カードの「ラッパー空間での最適角度」を計算 ──────────
  //
  // ホイールラッパーは rotate(-angle) で回転している。
  // カード i の naturalAngle = (i - centerOffset) * STEP_DEG（固定の基準位置）。
  //
  // スクリーン上の見かけ角 = wrapperAngle - angle。
  // これが (-fullCycle/2, +fullCycle/2) に収まる整数 k を選ぶ：
  //   wrapperAngle = naturalAngle + k * fullCycle,  k = round((angle - naturalAngle) / fullCycle)
  //
  // |screenAngle| > VISIBLE_RANGE_DEG のときカードは不可視。
  // VISIBLE_RANGE_DEG < fullCycle/2 を満たすので、ラップ（k の変化）は
  // 常に不可視域で起き、ちらつきがない。
  function computeWrapperAngle(i: number): number {
    const natural = (i - centerOffset) * STEP_DEG;
    const k = Math.round((angle - natural) / fullCycle);
    return natural + k * fullCycle;
  }

  // ─── 現在中央のカード ────────────────────────────────────────────
  const rawCenter = centerOffset - angle / STEP_DEG;
  const currentIdx = ((Math.round(rawCenter) % n) + n) % n;
  const currentCard = CARDS[currentIdx];

  // 進捗バー用（0〜100%、サイクルごとに 0 に戻る）
  const cyclePos = ((rawCenter % n) + n) % n;
  const progressPercent = (cyclePos / n) * 100;

  return (
    <SlideWrapper>
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* ─── トップナビ ──────────────────────────────────────── */}
        <motion.div
          className="absolute top-8 inset-x-0 z-30 pointer-events-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-10">
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">Members</span>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">
                THE&nbsp;CAST
              </h2>
              <span className="text-[8px] tracking-[0.32em] uppercase text-white/30 mt-1">
                SCROLL TO TURN THE WHEEL
              </span>
            </div>
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">Profiles</span>
          </div>
        </motion.div>

        {/* ─── 左説明 ──────────────────────────────────────────── */}
        <motion.p
          className="absolute top-20 left-10 max-w-[180px] text-[11px] leading-relaxed text-white/50 uppercase tracking-wider z-30 pointer-events-none"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          An interactive cast.
          <br />
          Each character lives a
          <br />
          story of its own.
        </motion.p>

        {/* ─── 右説明 ──────────────────────────────────────────── */}
        <motion.p
          className="absolute top-20 right-10 max-w-[180px] text-[11px] leading-relaxed text-white/50 uppercase tracking-wider text-right z-30 pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {n} chapters.
          <br />
          Wheel loops forever.
          <br />
          Keep scrolling.
        </motion.p>

        {/* ─── 観覧車本体 ──────────────────────────────────────── */}
        {/*
          アンカーを top:50% から RADIUS+60px 下に置く。
          カードは RADIUS 上方に配置されるので、
          画面上のカード中心 = top:50% + 60px（中段よりやや下）になる。
        */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 0,
            height: 0,
            transform: `translate(-50%, ${RADIUS + 60}px)`,
          }}
        >
          {/* ラッパーを反時計回りに回す */}
          <motion.div
            style={{ transformOrigin: '50% 50%' }}
            animate={{ rotate: -angle }}
            transition={{ type: 'spring', stiffness: 110, damping: 22 }}
          >
            {CARDS.map((card, i) => {
              const wrapperAngle = computeWrapperAngle(i);
              const screenAngle = wrapperAngle - angle;
              const dist = Math.abs(screenAngle);

              const visibility =
                dist > VISIBLE_RANGE_DEG
                  ? 0
                  : Math.max(0, 1 - dist / VISIBLE_RANGE_DEG);
              const scale = 0.78 + 0.22 * visibility;
              const isActive = i === currentIdx;

              return (
                <div
                  key={card.id}
                  className="absolute"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    left: -CARD_W / 2,
                    top: -CARD_H / 2,
                    transformOrigin: '50% 50%',
                    // 円周上に配置：wrapperAngle 分だけ回転して RADIUS 上方へ
                    transform: `rotate(${wrapperAngle}deg) translateY(-${RADIUS}px)`,
                  }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{
                      opacity: visibility,
                      filter: isActive ? 'none' : `saturate(${0.65 + 0.35 * visibility})`,
                    }}
                    animate={{ scale }}
                    transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                  >
                    {/* ─ カード本体 ─ */}
                    <div
                      className="absolute inset-0 rounded-md overflow-hidden"
                      style={{
                        background: `linear-gradient(155deg, ${card.gradient[0]} 0%, ${card.gradient[1]} 100%)`,
                        boxShadow: isActive
                          ? `0 32px 90px rgba(0,0,0,0.72), 0 0 0 1px ${card.accent}AA, 0 0 80px ${card.accent}33`
                          : '0 14px 44px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* 光と影 */}
                      <div
                        className="absolute inset-0 mix-blend-overlay opacity-60 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle at 28% 28%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(circle at 72% 78%, rgba(0,0,0,0.45), transparent 65%)',
                        }}
                      />
                      {/* ノイズ風スクリーン */}
                      <div
                        className="absolute inset-0 mix-blend-soft-light pointer-events-none"
                        style={{
                          background:
                            'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 6px)',
                          opacity: 0.6,
                        }}
                      />

                      {/* 巨大イニシャル */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span
                          className="font-black select-none"
                          style={{
                            fontSize: 200,
                            color: 'rgba(255,255,255,0.9)',
                            mixBlendMode: 'overlay',
                            lineHeight: 1,
                            letterSpacing: '-0.06em',
                          }}
                        >
                          {card.initial ?? card.name.charAt(0)}
                        </span>
                      </div>

                      {/* 角番号 */}
                      <span className="absolute top-3 left-3 text-[10px] font-mono text-white/85 tracking-widest">
                        N°{String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="absolute bottom-3 right-3 text-[8px] font-mono uppercase tracking-[0.32em] text-white/60">
                        Chapter
                      </span>

                      {/* 下辺アクセントライン */}
                      <div
                        className="absolute left-0 right-0 bottom-0 h-[3px]"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                          opacity: isActive ? 1 : 0.6,
                        }}
                      />
                    </div>

                    {/* ─ カード下のラベル（カードと一緒に傾く） ─ */}
                    <div className="absolute -bottom-16 left-0 right-0 text-center pointer-events-none">
                      <div
                        className="text-base font-extrabold tracking-[0.18em] leading-none"
                        style={{
                          color: isActive
                            ? '#ffffff'
                            : `rgba(255,255,255,${0.4 + 0.5 * visibility})`,
                        }}
                      >
                        {card.name}
                      </div>
                      <div
                        className="text-[9px] tracking-[0.28em] uppercase mt-2"
                        style={{
                          color: isActive
                            ? card.accent
                            : `rgba(255,255,255,${0.25 + 0.35 * visibility})`,
                        }}
                      >
                        {card.subtitle}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ─── 下部：進捗バー + 現在カード ───────────────────────── */}
        <motion.div
          className="absolute bottom-8 inset-x-0 z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-[9px] tracking-[0.32em] uppercase text-white/30">
              Scroll · Swipe · Arrow Keys · Loops Forever
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-white/45 tabular-nums">
              <motion.span
                key={`num-${currentIdx}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: currentCard.accent }}
                className="font-bold"
              >
                {String(currentIdx + 1).padStart(2, '0')}
              </motion.span>
              <div className="relative w-48 h-px bg-white/12">
                <motion.div
                  className="absolute top-0 left-0 h-full"
                  style={{ backgroundColor: currentCard.accent }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                />
              </div>
              <span>{String(n).padStart(2, '0')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
