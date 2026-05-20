'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASE_IN_OUT } from '@/theme/motion';

export interface SlideFooterNoteProps {
  children: ReactNode;
  /** 出典マーカーを自動で付ける（既定: true） */
  withAsterisk?: boolean;
  delay?: number;
  className?: string;
}

/**
 * スライド下部に出す注釈テキスト。
 * 多くのスライドで `<p className="text-xs text-white/30 tracking-wide">※ ...</p>`
 * を書いていたものを統一。
 *
 *   <SlideFooterNote>出典: …</SlideFooterNote>
 *   <SlideFooterNote withAsterisk={false}>カスタムテキスト</SlideFooterNote>
 */
export default function SlideFooterNote({
  children,
  withAsterisk = true,
  delay = 0.4,
  className,
}: SlideFooterNoteProps) {
  return (
    <motion.p
      className={`text-xs text-white/30 tracking-wide ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.fast, ease: EASE_IN_OUT, delay }}
    >
      {withAsterisk ? '※ ' : ''}
      {children}
    </motion.p>
  );
}
