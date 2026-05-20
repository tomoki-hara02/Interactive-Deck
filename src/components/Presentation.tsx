'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Slide01 from './slides/Slide01';
import Slide02 from './slides/Slide02';
import Slide03 from './slides/Slide03';
import Slide04 from './slides/Slide04';
import Slide05 from './slides/Slide05';
import Slide06 from './slides/Slide06';
import Slide07 from './slides/Slide07';
import Slide08 from './slides/Slide08';
import Slide09 from './slides/Slide09';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';
import Slide16 from './slides/Slide16';
import Slide17 from './slides/Slide17';
import Slide18 from './slides/Slide18';
import Slide19 from './slides/Slide19';
import Slide20 from './slides/Slide20';

const ParticleMorphBackground = dynamic(
  () => import('./ParticleMorphBackground'),
  { ssr: false }
);

const slides = [
  Slide01, Slide02, Slide03, Slide04, Slide05,
  Slide06, Slide07, Slide08, Slide09, Slide10,
  Slide11, Slide12, Slide13, Slide14, Slide15,
  Slide16, Slide17, Slide18, Slide19, Slide20,
];

// パーティクル背景を非表示にするスライドのインデックス
// 表示しないもの:
//   3 = Slide04 (三角形)        — グロー干渉
//   4 = Slide05 (条文)           — 可読性
//   6 = Slide07 (ナレッジグラフ) — SVGノードと干渉
//   8 = Slide09 (パーティクル文字) — 自前Canvas
//  11 = Slide12 (Before/After)  — 比較の見やすさ
//  12 = Slide13 (マトリクス)    — チャート可読性
//  14 = Slide15 (オービット)    — 自前で派手な公転演出
//  17 = Slide18 (バーチャート)  — 数字可読性
//  18 = Slide19 (3Dキューブ)    — 自前Three.js
const SLIDES_WITHOUT_BG = new Set([3, 4, 6, 8, 11, 12, 14, 17, 18]);

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const midpoint = window.innerWidth / 2;
    if (e.clientX > midpoint) {
      goNext();
    } else {
      goPrev();
    }
  };

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div
      className="relative w-screen h-screen overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: '#0a0a0f' }}
      onClick={handleClick}
    >
      <motion.div
        animate={{ opacity: SLIDES_WITHOUT_BG.has(currentSlide) ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <ParticleMorphBackground />
      </motion.div>

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

      {/* Slide number indicator */}
      <div className="fixed bottom-8 right-8 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setDirection(i > currentSlide ? 1 : -1);
              setCurrentSlide(i);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
        <span className="ml-2 text-xs text-white/30 font-mono tabular-nums">
          {currentSlide + 1} / {slides.length}
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
      {currentSlide < slides.length - 1 && (
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
  );
}
