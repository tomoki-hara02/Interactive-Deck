'use client';

import { useEffect, useState } from 'react';

export interface UseCountUpOptions {
  /** カウントアップにかける時間（秒） */
  duration?: number;
  /** スタートトリガー。`false` の間は 0 のまま */
  start?: boolean;
  /** イージングの強さ。3 = 標準、4 = よりキビキビ */
  easePower?: number;
}

/**
 * 0 → target にイージングしながらカウントアップする hook。
 *
 * Slide06 / Slide18 / Slide24 で別個に定義されていた重複を 1 つに統合。
 *
 * 使い方:
 *   const ref = useRef<HTMLDivElement>(null);
 *   const inView = useInView(ref, { once: true, amount: 0.4 });
 *   const v = useCountUp(120, { start: inView });
 *   ...
 *   <span>{v.toFixed(0)}</span>
 */
export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
): number {
  const { duration = 1.6, start = true, easePower = 3 } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, easePower);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, easePower]);

  return value;
}
