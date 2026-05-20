'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FADE_UP } from '@/theme/motion';

export interface SlideSectionHeaderProps {
  /** 見出しの上に出す小さい uppercase ラベル（例: "Section Label"） */
  eyebrow?: string;
  /** メインの見出し（h2 相当） */
  title: ReactNode;
  /** 見出し下のサブ説明（任意） */
  description?: ReactNode;
  /** タイトルのサイズバリアント */
  size?: 'sm' | 'md' | 'lg';
  /** Framer Motion アニメーション遅延 */
  delay?: number;
  /** 中央寄せにする */
  align?: 'left' | 'center';
  className?: string;
}

const TITLE_SIZE: Record<NonNullable<SlideSectionHeaderProps['size']>, string> = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-3xl md:text-5xl',
};

/**
 * 多くのスライド冒頭で繰り返されている "Eyebrow + h2" ブロックを集約。
 *
 * 使い方:
 *   <SlideSectionHeader
 *     eyebrow="Section Label"
 *     title="数字が示す、インパクト"
 *     size="lg"
 *   />
 */
export default function SlideSectionHeader({
  eyebrow,
  title,
  description,
  size = 'md',
  delay = 0,
  align = 'left',
  className,
}: SlideSectionHeaderProps) {
  const wrap = `flex flex-col gap-2 shrink-0 ${
    align === 'center' ? 'items-center text-center' : ''
  } ${className ?? ''}`;

  return (
    <motion.div
      className={wrap}
      initial={FADE_UP.initial}
      animate={FADE_UP.animate}
      transition={{ ...FADE_UP.transition, delay }}
    >
      {eyebrow && (
        <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
          {eyebrow}
        </span>
      )}
      <h2 className={`${TITLE_SIZE[size]} font-bold tracking-tight text-white`}>
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
