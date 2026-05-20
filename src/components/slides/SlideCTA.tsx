'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

export default function SlideCTA() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-medium tracking-[0.2em] text-white/40 uppercase">
            {/* TODO: 前置きの一行 */}
            Ready to begin?
          </span>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-white">
            {/* TODO: 行動を促す大見出し */}
            Let&apos;s get started
          </h2>
        </div>

        <motion.button
          className="mt-4 px-10 py-4 rounded-full bg-gradient-to-r from-[#7B5EA7] to-[#4F8EF7] text-white font-semibold text-lg tracking-wide shadow-lg shadow-[#4F8EF7]/20 hover:shadow-[#4F8EF7]/40 transition-shadow duration-300"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* TODO: CTA のラベル */}
          Primary Action
        </motion.button>

        <p className="text-sm text-white/30">
          {/* TODO: ボタン下の補足説明 */}
          A short reassurance line goes here
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
