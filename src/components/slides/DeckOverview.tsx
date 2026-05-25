'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';
import { slideRegistry, type SlideEntry } from '@/config/slides';
import { usePresentationContext } from '@/context/presentation';

// ─── 設定 ───────────────────────────────────────────────────────────────────
// TODO: セミナーで紹介したいスライドの id を順番に列挙。
//       空配列にすると slideRegistry 全件を最大 MAX_CARDS 枚まで表示。
const FEATURED_IDS: string[] = [
  'title',
  'office-intro',
  'speaker-hero',
  'feature-cards',
  'timeline',
  'metrics',
  'live-inference',
  'cube-3d',
  'qa-close',
];

const MAX_CARDS = 12;

// ─── アクセントカラー（インデックスで循環）────────────────────────────────
const ACCENTS = [
  '#c8a8ff',
  '#88bbff',
  '#ffaacc',
  '#4FACF7',
  '#7B5EA7',
  '#4F8EF7',
  '#FF6B9D',
];

// ─── カード基本サイズ ───────────────────────────────────────────────────────
// 540 → 660（+2 段階）。16:9 維持。
const CARD_W = 660;
const CARD_H = Math.round(CARD_W * 9 / 16); // 371px

// ─── 3D ファン配置パラメーター ───────────────────────────────────────────────
const STEP_X = 135;
const STEP_Y = -85;
const STEP_Z = -90;
const STEP_SCALE = 0.07;
const MIN_SCALE = 0.5;
const ROT_Y = -22;
const ROT_Z = -6;

const WHEEL_SENSITIVITY = 0.0035;

// 通常時のカード不透明度（フォーカス中はこの値を超えて 1.0 になる）
const CARD_BASE_OPACITY = 0.7;

// ─── 表示名ヘルパー ─────────────────────────────────────────────────────────
function toLabel(entry: SlideEntry): string {
  if (entry.note) return entry.note.replace(/（.*?）$/, '').trim();
  return entry.id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ─── カードレイアウト計算 ──────────────────────────────────────────────────
function getCardLayout(relPos: number, isFocused: boolean) {
  // 通り抜けたカードはフェードアウト
  const visibility =
    relPos < -0.6
      ? 0
      : relPos < 0
        ? Math.max(0, 1 + relPos / 0.6)
        : 1;

  // フォーカス中はくっきり、通常時は CARD_BASE_OPACITY で控えめ
  const opacity = isFocused ? 1 : visibility * CARD_BASE_OPACITY;

  if (isFocused) {
    return {
      x: -CARD_W / 2,
      y: -CARD_H / 2,
      z: 280,
      scale: 1.0,
      rotateY: 0,
      rotateZ: 0,
      opacity,
    };
  }

  const scale = Math.max(MIN_SCALE, 1 - relPos * STEP_SCALE);

  return {
    x: relPos * STEP_X - CARD_W / 2,
    y: relPos * STEP_Y - CARD_H / 2,
    z: relPos * STEP_Z,
    scale,
    rotateY: ROT_Y,
    rotateZ: ROT_Z,
    opacity,
  };
}

// ─── コンポーネント ──────────────────────────────────────────────────────────
export default function DeckOverview() {
  const { goTo } = usePresentationContext();
  const [progress, setProgress] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 表示するカードを解決
  const cards: { entry: SlideEntry; globalIdx: number }[] =
    FEATURED_IDS.length > 0
      ? (FEATURED_IDS
          .map((id) => {
            const globalIdx = slideRegistry.findIndex((s) => s.id === id);
            return globalIdx !== -1
              ? { entry: slideRegistry[globalIdx], globalIdx }
              : null;
          })
          .filter(Boolean) as { entry: SlideEntry; globalIdx: number }[])
      : slideRegistry.slice(0, MAX_CARDS).map((entry, globalIdx) => ({
          entry,
          globalIdx,
        }));

  const n = cards.length;
  const minP = -0.4;
  const maxP = n - 0.6;

  // ─── ホイール / タッチ / キー ─────────────────────────────────────
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.stopPropagation();
      const delta = e.deltaY * WHEEL_SENSITIVITY;
      setProgress((p) => Math.max(minP, Math.min(p + delta, maxP)));
      setFocused(null);
    },
    [minP, maxP],
  );

  const touchY = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  }, []);
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchY.current == null) return;
      const dy = touchY.current - e.touches[0].clientY;
      touchY.current = e.touches[0].clientY;
      setProgress((p) => Math.max(minP, Math.min(p + dy * 0.012, maxP)));
      setFocused(null);
    },
    [minP, maxP],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focused !== null) {
        e.preventDefault();
        setFocused(null);
        return;
      }
      if (!el.matches(':hover')) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        setProgress((p) => Math.min(p + 1, maxP));
        setFocused(null);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setProgress((p) => Math.max(p - 1, minP));
        setFocused(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [minP, maxP, focused]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setFocused(null);
  }, []);

  // ─── 現在カード（目次ハイライト用） ────────────────────────────────
  const currentIdx = Math.max(0, Math.min(n - 1, Math.round(progress)));

  return (
    <SlideWrapper>
      {/* ─── ヘッダー ────────────────────────────────────────────────── */}
      <motion.div
        className="absolute top-10 inset-x-0 flex flex-col items-center gap-1.5 z-30 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#7B5EA7]" />
          <span className="text-[10px] tracking-[0.34em] uppercase text-white/35">
            Deck Overview
          </span>
          <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#4F8EF7]" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          本日のアジェンダ
        </h2>
      </motion.div>

      {/* ─── 左サイドバー：目次 ─────────────────────────────────────── */}
      <motion.aside
        className="absolute left-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1 w-80"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-4 pl-2">
          <span className="text-[9px] tracking-[0.32em] uppercase text-white/35">
            Agenda
          </span>
          <span className="text-[9px] text-white/20 font-mono tabular-nums">
            {String(currentIdx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
        </div>

        {cards.map(({ entry, globalIdx }, i) => {
          const isCurrent = i === currentIdx;
          const isFocused = focused === i;
          const accent = ACCENTS[i % ACCENTS.length];
          // 現在カード周辺は強調を弱めに（あくまで現在 1 件をハイライト）
          const isNearby = !isCurrent && Math.abs(i - currentIdx) <= 1;

          return (
            <button
              key={entry.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setProgress(i);
                // 目次クリック時は手前に持ってくるだけ。フォーカスは別操作。
                setFocused(null);
              }}
              aria-current={isCurrent ? 'true' : undefined}
              aria-label={`スライド ${globalIdx + 1}: ${toLabel(entry)}`}
              className="group flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200"
              style={{
                backgroundColor: isCurrent
                  ? 'rgba(255,255,255,0.06)'
                  : isFocused
                    ? `${accent}14`
                    : 'transparent',
              }}
            >
              {/* 左の縦バー（現在のスライドはアクセント色でグロー） */}
              <span
                className="rounded-full transition-all duration-300 shrink-0"
                style={{
                  width: 2,
                  height: isCurrent ? 26 : isNearby ? 16 : 10,
                  backgroundColor: isCurrent
                    ? accent
                    : isNearby
                      ? 'rgba(255,255,255,0.35)'
                      : 'rgba(255,255,255,0.12)',
                  boxShadow: isCurrent ? `0 0 14px ${accent}aa` : 'none',
                }}
              />

              {/* 番号 */}
              <span
                className="text-[10px] font-mono tabular-nums w-6 shrink-0 transition-colors"
                style={{
                  color: isCurrent
                    ? 'rgba(255,255,255,0.85)'
                    : isNearby
                      ? 'rgba(255,255,255,0.4)'
                      : 'rgba(255,255,255,0.22)',
                }}
              >
                {String(globalIdx + 1).padStart(2, '0')}
              </span>

              {/* タイトル */}
              <span
                className="text-[12px] leading-tight transition-colors truncate"
                style={{
                  color: isCurrent
                    ? '#ffffff'
                    : isNearby
                      ? 'rgba(255,255,255,0.6)'
                      : 'rgba(255,255,255,0.32)',
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                {toLabel(entry)}
              </span>

              {/* 右端のドット */}
              <span
                className="ml-auto rounded-full transition-all duration-300 shrink-0"
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: isCurrent ? accent : 'transparent',
                  border: isCurrent
                    ? 'none'
                    : `1px solid ${
                        isNearby ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'
                      }`,
                }}
              />
            </button>
          );
        })}
      </motion.aside>

      {/* ─── 3D ファンエリア（右側にオフセット） ──────────────────── */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ perspective: '1700px', perspectiveOrigin: '62% 52%' }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onClick={handleBackdropClick}
      >
        {/* 中央アンカーを右寄せ（目次のスペースを左に確保） */}
        <div
          style={{
            position: 'absolute',
            left: '62%',
            top: '52%',
            transformStyle: 'preserve-3d',
          }}
        >
          {cards.map(({ entry, globalIdx }, i) => {
            const relPos = i - progress;
            const isFocused = focused === i;
            const accent = ACCENTS[i % ACCENTS.length];
            const layout = getCardLayout(relPos, isFocused);

            const interactable = relPos > -0.5 && layout.opacity > 0.05;

            return (
              <motion.button
                key={entry.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!interactable) return;
                  if (isFocused) {
                    goTo(globalIdx);
                  } else {
                    setFocused(i);
                  }
                }}
                aria-label={
                  isFocused
                    ? `スライド ${globalIdx + 1} に移動: ${toLabel(entry)}`
                    : `スライド ${globalIdx + 1} を選択: ${toLabel(entry)}`
                }
                disabled={!interactable}
                className="absolute rounded-2xl overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  // 透明度を下げる → 通常時はやや控えめなガラス感
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
                  border: `1px solid ${isFocused ? accent + 'AA' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isFocused
                    ? `0 50px 120px rgba(0,0,0,0.9), 0 0 100px ${accent}55`
                    : '0 16px 60px rgba(0,0,0,0.55)',
                  cursor: interactable ? 'pointer' : 'default',
                  pointerEvents: interactable ? 'auto' : 'none',
                }}
                animate={{
                  x: layout.x,
                  y: layout.y,
                  z: layout.z,
                  scale: layout.scale,
                  rotateY: layout.rotateY,
                  rotateZ: layout.rotateZ,
                  opacity: layout.opacity,
                  zIndex: isFocused ? 100 : 50 - Math.max(0, Math.floor(relPos)),
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 28,
                  mass: 0.7,
                }}
              >
                {/* フォーカス時グロー */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 35% 40%, ${accent}38, transparent 70%)`,
                  }}
                  animate={{ opacity: isFocused ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* 番号ウォーターマーク */}
                <span
                  className="absolute bottom-2 right-6 font-extrabold tabular-nums select-none leading-none pointer-events-none"
                  style={{
                    fontSize: 180,
                    color: accent,
                    opacity: isFocused ? 0.3 : 0.13,
                    transition: 'opacity 0.3s',
                  }}
                >
                  {String(globalIdx + 1).padStart(2, '0')}
                </span>

                {/* カード本体 */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* 上：番号 + ステータス */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] tracking-[0.32em] uppercase font-mono"
                      style={{
                        color: isFocused ? accent : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      Slide · {String(globalIdx + 1).padStart(2, '0')}
                    </span>
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                      animate={{
                        opacity: isFocused ? [1, 0.3, 1] : 0.5,
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: isFocused ? Infinity : 0,
                      }}
                    />
                  </div>

                  {/* 中：タイトル + 詳細 */}
                  <div className="flex flex-col gap-2">
                    <motion.h3
                      className="font-bold text-white leading-tight tracking-tight"
                      animate={{
                        fontSize: isFocused ? '44px' : '26px',
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {toLabel(entry)}
                    </motion.h3>
                    <motion.div
                      className="flex flex-col gap-1.5 overflow-hidden"
                      initial={false}
                      animate={{
                        opacity: isFocused ? 1 : 0,
                        height: isFocused ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-[14px] text-white/65 leading-relaxed">
                        {entry.note ?? `スライド ID: ${entry.id}`}
                      </p>
                      {entry.background && (
                        <p className="text-[10px] uppercase tracking-widest text-white/30">
                          ✦ Background: {entry.background}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* 下：アクション CTA */}
                  <motion.div
                    className="flex items-center justify-between"
                    animate={{ opacity: isFocused ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-[10px] text-white/40 tracking-wider">
                      Esc で戻る
                    </span>
                    <span
                      className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold"
                      style={{
                        backgroundColor: accent + '22',
                        color: accent,
                        border: `1px solid ${accent}66`,
                      }}
                    >
                      クリックで移動
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.div>
                </div>

                {/* 下辺アクセントライン */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none transition-all"
                  style={{
                    height: isFocused ? 4 : 2,
                    background: `linear-gradient(90deg, ${accent} 0%, ${accent}00 ${
                      isFocused ? '90%' : '55%'
                    })`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ─── 操作ヒント（下部） ──────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-3 text-[10px] text-white/25 tracking-widest pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.7 }}
      >
        <span>⇅ Scroll</span>
        <span className="text-white/15">·</span>
        <span>目次クリックで移動</span>
        <span className="text-white/15">·</span>
        <span>カードクリックで詳細</span>
      </motion.div>
    </SlideWrapper>
  );
}
