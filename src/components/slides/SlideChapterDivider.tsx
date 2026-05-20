'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: チャプター情報を書き換え
const CHAPTER = {
  number: '03',
  label: 'Chapter',
  title: '次のフェーズへ',
  subtitle:
    '前のセクションで得た示唆を踏まえて、ここからは実装の話に移ります。',
};

export default function SlideChapterDivider() {
  return (
    <SlideWrapper>
      <motion.div
        className="relative flex flex-col md:flex-row items-start md:items-end gap-10 md:gap-16 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* 巨大な番号 */}
        <motion.span
          className="block font-extrabold tracking-tighter leading-[0.85] select-none shrink-0"
          style={{
            fontSize: 'clamp(8rem, 22vw, 20rem)',
            background:
              'linear-gradient(160deg, #c8a8ff 0%, #4F8EF7 55%, #FF6B9D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {CHAPTER.number}
        </motion.span>

        {/* 右側のテキスト */}
        <motion.div
          className="flex flex-col gap-4 md:pb-10 max-w-md"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              {CHAPTER.label}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            {CHAPTER.title}
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed">
            {CHAPTER.subtitle}
          </p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
