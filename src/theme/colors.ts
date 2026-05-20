/**
 * Deck-wide color palette.
 *
 * すべてのスライド・背景で同じトーンを使うための単一ソース。
 * インライン `style={{ color: '#xxxxxx' }}` を書くより、ここを参照することで
 * ブランドカラーを一括変更できます。
 *
 * 使い方:
 *   import { ACCENTS, withAlpha, BG_COLOR } from '@/theme/colors';
 *   <div style={{ color: ACCENTS.purple }}>...</div>
 *   <div style={{ background: withAlpha(ACCENTS.blue, 0.2) }}>...</div>
 */

export const BG_COLOR = '#0a0a0f' as const;

export const ACCENTS = {
  // メイン3色（強め）
  purple: '#7B5EA7',
  blue: '#4F8EF7',
  pink: '#FF6B9D',
  // 派生3色（淡め・テキスト/グロー向き）
  lightPurple: '#c8a8ff',
  lightBlue: '#88bbff',
  lightPink: '#ffaacc',
  // 補助色（バーグラフ等で使用）
  green: '#9ee0a8',
  amber: '#f7c46c',
} as const;

export type AccentName = keyof typeof ACCENTS;
export type AccentHex = (typeof ACCENTS)[AccentName];

export const ACCENT_LIST: AccentHex[] = [
  ACCENTS.purple,
  ACCENTS.blue,
  ACCENTS.pink,
];

export const LIGHT_ACCENT_LIST: AccentHex[] = [
  ACCENTS.lightPurple,
  ACCENTS.lightBlue,
  ACCENTS.lightPink,
];

/**
 * `#RRGGBB` + 0–1 アルファ → `#RRGGBBAA`。
 * Tailwind の `bg-white/10` 相当を任意色で書くためのヘルパー。
 */
export function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const a = Math.max(0, Math.min(1, alpha));
  const hh = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${clean}${hh}`;
}
