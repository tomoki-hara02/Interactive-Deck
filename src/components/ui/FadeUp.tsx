'use client';

import { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { FADE_UP } from '@/theme/motion';

export interface FadeUpProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'> {
  children: ReactNode;
  delay?: number;
  /** 移動距離（既定: 20px） */
  distance?: number;
  /** アニメーション時間（秒、既定: 0.55） */
  duration?: number;
  className?: string;
}

/**
 * `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` パターンを
 * シュガー化。37 スライドで重複していたものを 1 行で書けるように。
 *
 *   <FadeUp delay={0.2}>
 *     <h2>Title</h2>
 *   </FadeUp>
 */
export default function FadeUp({
  children,
  delay = 0,
  distance = 20,
  duration,
  className,
  ...rest
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ...FADE_UP.transition,
        delay,
        ...(duration ? { duration } : {}),
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
