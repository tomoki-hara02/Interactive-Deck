'use client';

import { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface GlassCardProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** "default" = bg-white/[0.04] / "muted" = bg-white/[0.02] / "highlight" = bg-white/[0.08] */
  variant?: 'default' | 'muted' | 'highlight';
  blur?: boolean;
  padded?: boolean;
  className?: string;
}

const VARIANT_BG: Record<NonNullable<GlassCardProps['variant']>, string> = {
  default: 'bg-white/[0.04]',
  muted: 'bg-white/[0.02]',
  highlight: 'bg-white/[0.08]',
};

/**
 * デッキ全体で頻出する "ガラスカード" 風 div。
 * `rounded-2xl border border-white/10 bg-white/[0.04]` の組み合わせを集約。
 *
 *   <GlassCard padded>
 *     <h3>カード見出し</h3>
 *     <p>本文…</p>
 *   </GlassCard>
 */
export default function GlassCard({
  children,
  variant = 'default',
  blur = false,
  padded = true,
  className,
  ...rest
}: GlassCardProps) {
  const classes = [
    'rounded-2xl border border-white/10',
    VARIANT_BG[variant],
    blur ? 'backdrop-blur-sm' : '',
    padded ? 'p-5 md:p-6' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div className={classes} {...rest}>
      {children}
    </motion.div>
  );
}
