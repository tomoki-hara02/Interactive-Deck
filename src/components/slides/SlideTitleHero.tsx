'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

export default function SlideTitleHero() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#7B5EA7]" />
          <div className="w-2 h-2 rounded-full bg-[#4F8EF7]" />
          <div className="w-2 h-2 rounded-full bg-[#FF6B9D]" />
        </div>

        <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-white leading-none">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-[#7B5EA7] via-[#4F8EF7] to-[#FF6B9D] bg-clip-text text-transparent">
            {/* TODO: ブランド名 / プロジェクト名 */}
            Project
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide mt-2">
          {/* TODO: サブタイトル / 一言コピー */}
          A short, punchy subtitle for your presentation
        </p>

        <motion.div
          className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
        />
      </motion.div>
    </SlideWrapper>
  );
}
