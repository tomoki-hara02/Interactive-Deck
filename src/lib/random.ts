/**
 * Deterministic seeded pseudo-random generator (mulberry32).
 *
 * React 19 / Next.js 16 では `react-hooks/purity` ルールにより
 * `useMemo` / `useState` の初期化など render 中に `Math.random()` を
 * 呼び出すことが禁止される（再 render で結果が変わると不安定なため）。
 *
 * このユーティリティはシードを渡せば毎回同じ系列を返すため、
 * Three.js のパーティクル初期化のように "毎フレーム同じ初期配置で良い" 用途に使える。
 */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
