/**
 * Deck-wide Framer Motion presets.
 *
 * 多くのスライドで `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
 * を繰り返しているため、ここに集約。
 *
 * 使い方:
 *   import { FADE_UP, EASE_IN_OUT } from '@/theme/motion';
 *   <motion.div {...FADE_UP} transition={{ ...FADE_UP.transition, delay: 0.2 }} />
 *
 *   // もしくは <FadeUp> コンポーネントを使う:
 *   import { FadeUp } from '@/components/ui';
 *   <FadeUp delay={0.2}>...</FadeUp>
 */

export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.8,
} as const;

/** 下から上へフェードイン */
export const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.base, ease: EASE_IN_OUT },
} as const;

/** 上から下へフェードイン */
export const FADE_DOWN = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.base, ease: EASE_IN_OUT },
} as const;

/** 横スライド（左→右） */
export const FADE_RIGHT = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: DURATION.base, ease: EASE_IN_OUT },
} as const;

/** opacity だけ */
export const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.base, ease: EASE_IN_OUT },
} as const;

/** スケール + opacity（カード登場用） */
export const POP_IN = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: DURATION.base, ease: EASE_OUT },
} as const;
