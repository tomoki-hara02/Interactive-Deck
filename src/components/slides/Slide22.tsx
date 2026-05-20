'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: 引用文・著者・所属
const QUOTE = {
  body: '世界が変わるのではない。視点が変わったとき、世界の見え方が変わるのだ。',
  author: 'Author Name',
  role: 'Role · Affiliation',
};

export default function Slide22() {
  return (
    <SlideWrapper>
      <motion.div
        className="relative flex flex-col gap-8 md:gap-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* 装飾的な引用符 */}
        <motion.div
          className="text-[120px] md:text-[160px] leading-[0.7] font-serif select-none"
          style={{
            background:
              'linear-gradient(135deg, #c8a8ff 0%, #88bbff 50%, #ffaacc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          “
        </motion.div>

        {/* 引用本文 */}
        <motion.p
          className="text-3xl md:text-5xl font-light text-white leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {QUOTE.body}
        </motion.p>

        {/* 装飾線 */}
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-[#7B5EA7] via-[#4F8EF7] to-[#FF6B9D]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />

        {/* 著者 */}
        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-base md:text-lg text-white font-medium">{QUOTE.author}</p>
          <p className="text-xs md:text-sm text-white/40 tracking-wider">{QUOTE.role}</p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
