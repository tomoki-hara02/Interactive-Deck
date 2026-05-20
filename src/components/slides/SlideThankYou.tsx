'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// セミナーのエンディング・スライド。最後の感謝メッセージ＋登壇者・ハッシュタグ。
// Slide20（Q&A）の後ろや、Q&A 後の本当の締めとして使うのがおすすめ。

// TODO: 感謝メッセージと登壇者情報
const ENDING = {
  big: 'Thank You',
  jp: 'ありがとうございました',
  speaker: 'Speaker Name',
  role: 'Role · Affiliation',
  hashtag: '#seminar2026',
};

export default function SlideThankYou() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center text-center gap-7 md:gap-8 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* 上部の小さなラベル */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-[#7B5EA7]" />
          <div className="w-2 h-2 rounded-full bg-[#4F8EF7]" />
          <div className="w-2 h-2 rounded-full bg-[#FF6B9D]" />
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40 ml-2">
            The End
          </span>
        </motion.div>

        {/* 巨大な感謝の文字 */}
        <motion.h1
          className="font-bold tracking-tight leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 13vw, 11rem)',
            background:
              'linear-gradient(135deg, #c8a8ff 0%, #88bbff 50%, #ffaacc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 40px rgba(136,187,255,0.30))',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          {ENDING.big}
        </motion.h1>

        {/* 日本語の表記 */}
        <motion.p
          className="text-2xl md:text-3xl text-white/75 font-light tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {ENDING.jp}
        </motion.p>

        {/* 装飾線 */}
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        />

        {/* 登壇者 */}
        <motion.div
          className="flex flex-col gap-1 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <p className="text-sm text-white">{ENDING.speaker}</p>
          <p className="text-xs text-white/40 tracking-wider">{ENDING.role}</p>
          <p className="text-xs text-white/30 tracking-widest mt-3 font-mono">
            {ENDING.hashtag}
          </p>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
