'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SlideEntry } from '@/config/slides';

// ─── helpers ──────────────────────────────────────────────────────────────────

/**
 * コンポーネント関数名（PascalCase）を読みやすい表示名に変換。
 *   "LiveInference"  → "Live Inference"
 *   "QAClosing"      → "QA Closing"
 *   "Cube3D"         → "Cube 3D"
 *   "CTA"            → "CTA"
 */
function displayName(entry: SlideEntry): string {
  const raw =
    (entry.Component as { displayName?: string }).displayName ??
    entry.Component.name ??
    entry.id;
  return raw
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')   // "liveI" → "live I"
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // "QACl" → "QA Cl"
    .trim();
}

// ─── category labels（slideRegistry の section コメントに対応）────────────────

interface CategoryBoundary {
  fromIndex: number;
  label: string;
}

const CATEGORIES: CategoryBoundary[] = [
  { fromIndex: 0,  label: 'Core Slides' },
  { fromIndex: 21, label: 'Extra Materials' },
  { fromIndex: 31, label: 'Dev Tools' },
  { fromIndex: 38, label: 'Endings' },
  { fromIndex: 43, label: 'Speaker Intro' },
];

function categoryAt(index: number): string | null {
  // 境界の最初だけラベルを返す
  const found = CATEGORIES.find((c) => c.fromIndex === index);
  return found ? found.label : null;
}

// ─── props ────────────────────────────────────────────────────────────────────

interface TableOfContentsProps {
  entries: SlideEntry[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// ─── TOC overlay ──────────────────────────────────────────────────────────────

export default function TableOfContents({
  entries,
  currentIndex,
  onNavigate,
  isOpen,
  onToggle,
}: TableOfContentsProps) {
  // Escape でパネルを閉じる
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onToggle();
    },
    [isOpen, onToggle]
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <>
      {/* ── Trigger button（左上固定）── */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label="目次を開く"
        className={`fixed top-6 left-6 z-30 flex items-center gap-2 px-3 py-2 rounded-xl
          border transition-all duration-200 text-xs font-medium tracking-wide
          ${
            isOpen
              ? 'bg-white/10 border-white/30 text-white'
              : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 hover:border-white/20'
          }`}
      >
        {/* Grid icon */}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="9" y="1" width="6" height="6" rx="1" />
          <rect x="1" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
        </svg>
        <span className="hidden sm:inline">目次</span>
      </button>

      {/* ── Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景ブラー幕 */}
            <motion.div
              key="toc-backdrop"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            />

            {/* パネル本体 */}
            <motion.div
              key="toc-panel"
              className="fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col"
              style={{ maxWidth: 960, margin: '0 auto' }}
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold tracking-tight text-lg">
                    Template Slides
                  </span>
                  <span className="text-[11px] text-white/30 font-mono">
                    {entries.length} slides
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="閉じる"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* スクロール領域 */}
              <div className="flex-1 overflow-y-auto px-6 pb-8 scrollbar-thin">
                {CATEGORIES.map((cat, ci) => {
                  const catEntries = entries.slice(
                    cat.fromIndex,
                    CATEGORIES[ci + 1]?.fromIndex ?? entries.length
                  );
                  return (
                    <section key={cat.label} className="mb-8">
                      <p className="text-[10px] tracking-[0.28em] uppercase text-white/30 mb-3">
                        {cat.label}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {catEntries.map((entry, localIdx) => {
                          const globalIdx = cat.fromIndex + localIdx;
                          const isCurrent = globalIdx === currentIndex;
                          const name = displayName(entry);
                          return (
                            <button
                              key={entry.id}
                              onClick={() => {
                                onNavigate(globalIdx);
                                onToggle();
                              }}
                              className={`group relative flex flex-col items-start gap-1.5 p-3 rounded-xl
                                border text-left transition-all duration-150
                                ${
                                  isCurrent
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/[0.03] border-white/8 text-white/60 hover:bg-white/[0.07] hover:border-white/20 hover:text-white/90'
                                }`}
                            >
                              {/* 現在のスライド印 */}
                              {isCurrent && (
                                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-white" />
                              )}

                              {/* 番号 */}
                              <span className={`text-[10px] font-mono tabular-nums ${isCurrent ? 'text-white/50' : 'text-white/25'}`}>
                                {String(globalIdx + 1).padStart(2, '0')}
                              </span>

                              {/* コンポーネント名 */}
                              <span className="text-[13px] font-medium leading-snug">
                                {name}
                              </span>

                              {/* 背景アイコン（背景付きスライドに表示） */}
                              {entry.background && (
                                <span className="text-[9px] tracking-wide text-white/25 uppercase">
                                  ✦ {entry.background}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
