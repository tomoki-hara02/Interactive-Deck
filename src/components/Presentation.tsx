'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DeckBackground } from './backgrounds';
import TableOfContents from './TableOfContents';
import { slideRegistry } from '@/config/slides';
import { BG_COLOR } from '@/theme/colors';
import { PresentationContext } from '@/context/presentation';

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);

  const slideCount = slideRegistry.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => Math.min(prev + 1, slideCount - 1));
  }, [slideCount]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // TOC が開いているときは矢印ナビを無効化
      if (tocOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, tocOpen]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tocOpen) return;
    const midpoint = window.innerWidth / 2;
    if (e.clientX > midpoint) {
      goNext();
    } else {
      goPrev();
    }
  };

  const entry = slideRegistry[currentSlide];
  const CurrentSlideComponent = entry.Component;

  return (
    <PresentationContext.Provider value={{ currentSlide, goTo }}>
    <div
      className="relative w-screen h-screen overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: BG_COLOR }}
      onClick={handleClick}
    >
      {/* グローバル背景 */}
      <DeckBackground variant={entry.background ?? null} />

      {/* スライド本体 */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* ── 目次（左上トリガー + オーバーレイ） ── */}
      <TableOfContents
        entries={slideRegistry}
        currentIndex={currentSlide}
        onNavigate={goTo}
        isOpen={tocOpen}
        onToggle={() => setTocOpen((v) => !v)}
      />

      {/* Slide number indicator */}
      <div className="fixed bottom-8 right-8 z-20 flex items-center gap-3">
        {slideRegistry.map((s, i) => (
          <button
            key={s.id}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}: ${s.id}`}
          />
        ))}
        <span className="ml-2 text-xs text-white/30 font-mono tabular-nums">
          {currentSlide + 1} / {slideCount}
        </span>
      </div>

      {/* Navigation hint arrows */}
      {currentSlide > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-200"
          aria-label="Previous slide"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {currentSlide < slideCount - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-200"
          aria-label="Next slide"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
    </PresentationContext.Provider>
  );
}
