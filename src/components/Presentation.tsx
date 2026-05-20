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
import Slide21 from './slides/Slide21';
import Slide22 from './slides/Slide22';
import Slide23 from './slides/Slide23';
import Slide24 from './slides/Slide24';
import Slide25 from './slides/Slide25';
import Slide26 from './slides/Slide26';
import Slide27 from './slides/Slide27';
import Slide28 from './slides/Slide28';
import Slide29 from './slides/Slide29';
import Slide30 from './slides/Slide30';
import Slide31 from './slides/Slide31';
import Slide32 from './slides/Slide32';
import Slide33 from './slides/Slide33';
import Slide34 from './slides/Slide34';
import Slide35 from './slides/Slide35';
import Slide36 from './slides/Slide36';
import Slide37 from './slides/Slide37';
import Slide38 from './slides/Slide38';
import Slide39 from './slides/Slide39';
import Slide40 from './slides/Slide40';
import Slide41 from './slides/Slide41';
import Slide42 from './slides/Slide42';
import Slide43 from './slides/Slide43';
import Slide44 from './slides/Slide44';
import Slide45 from './slides/Slide45';

const ParticleMorphBackground = dynamic(
  () => import('./ParticleMorphBackground'),
  { ssr: false }
);

const slides = [
  Slide01, Slide21, Slide02, Slide03, Slide04, Slide05,
  Slide06, Slide07, Slide08, Slide09, Slide10,
  Slide11, Slide12, Slide13, Slide14, Slide15,
  Slide16, Slide17, Slide18, Slide19, Slide20,
  // 追加された素材スライド（順序は自由に並べ替え可）
  Slide22, // 引用ヒーロー
  Slide23, // 章扉・巨大番号
  Slide24, // ヒーロー数字
  Slide25, // 料金プラン 3 階層
  Slide26, // Bento グリッド
  Slide27, // チームグリッド
  Slide28, // ロードマップ（4Q）
  Slide29, // キーワードクラウド
  Slide30, // ワールドマップ
  Slide31, // 積層アーキテクチャ
  // Cursor 視点で便利な dev-tool 系
  Slide32, // AI エージェント フロー
  Slide33, // コード Diff ビュー
  Slide34, // ターミナル デモ
  Slide35, // 判断ツリー
  Slide36, // 技術スタック
  Slide37, // ステータス ダッシュボード
  Slide38, // 機能比較マトリクス
  // セミナーのエンディング系
  Slide39, // Thank You（大きな感謝）
  Slide40, // Recap / Key Takeaways
  Slide41, // Next Steps / Action Items
  Slide42, // Further Reading
  Slide43, // Save the Date
  // 講師紹介系
  Slide44, // Speaker Profile（1 人詳細）
  Slide45, // Speakers Panel（2〜3 人）
];

// パーティクル背景を「表示する」スライドのインデックス (0 始まり)
// 原則 OFF。アトモスフィアが欲しいスライドだけ明示的にこの set に追加してください。
//   0  = Slide01 (タイトル)       — オープニングの空気感
//  20  = Slide20 (Q&A)           — Q&A の余韻
//  38  = Slide39 (Thank You)      — 大きな感謝メッセージのバックドロップ
// TODO: 背景パーティクルを表示したいスライドのインデックスをここに追加
const SLIDES_WITH_BG = new Set<number>([0, 20, 38]);

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
        animate={{ opacity: SLIDES_WITH_BG.has(currentSlide) ? 1 : 0 }}
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
