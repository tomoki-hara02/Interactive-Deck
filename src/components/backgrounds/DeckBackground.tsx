'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * デッキ用の背景レイヤー集約コンポーネント。
 *
 * - 重い 3D / tsparticles は `dynamic({ ssr: false })` で遅延ロード
 * - `variant` を切り替えるだけで背景を差し替えられる
 * - `variant === null` のとき何も描画しない（フェードアウト）
 *
 * 使い方（グローバル）:
 *   <DeckBackground variant="morph" />
 *
 * 使い方（特定スライドだけ別の背景）:
 *   <DeckBackground variant="earth" />
 *
 * 新しい背景を追加するときは `BACKGROUNDS` に `dynamic(() => import(...))` を増やすだけ。
 */

const BACKGROUNDS = {
  /** デフォルトの粒子モーフ（球↔トーラス↔正二十面体↔ボックス） */
  morph: dynamic(() => import('../ParticleMorphBackground'), { ssr: false }),
  /** 2D のリンク付き粒子（tsparticles） */
  particles: dynamic(() => import('../ParticleBackground'), { ssr: false }),
  /** 地球 + 軌道リング 3D */
  earth: dynamic(() => import('../EarthBackground'), { ssr: false }),
} as const;

export type DeckBackgroundVariant = keyof typeof BACKGROUNDS;

export interface DeckBackgroundProps {
  /** どの背景を出すか。`null` で非表示 */
  variant?: DeckBackgroundVariant | null;
  /** フェードイン/アウトの秒数 */
  fadeDuration?: number;
}

export default function DeckBackground({
  variant,
  fadeDuration = 0.5,
}: DeckBackgroundProps) {
  const Component = useMemo(
    () => (variant ? BACKGROUNDS[variant] : null),
    [variant]
  );

  return (
    <AnimatePresence mode="wait">
      {Component && (
        <motion.div
          key={variant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeDuration, ease: 'easeInOut' }}
          className="fixed inset-0 z-0 pointer-events-none"
        >
          <Component />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
