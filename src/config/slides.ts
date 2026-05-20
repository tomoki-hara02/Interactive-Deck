import type { ComponentType } from 'react';
import type { DeckBackgroundVariant } from '@/components/backgrounds';

import Slide01 from '@/components/slides/Slide01';
import Slide02 from '@/components/slides/Slide02';
import Slide03 from '@/components/slides/Slide03';
import Slide04 from '@/components/slides/Slide04';
import Slide05 from '@/components/slides/Slide05';
import Slide06 from '@/components/slides/Slide06';
import Slide07 from '@/components/slides/Slide07';
import Slide08 from '@/components/slides/Slide08';
import Slide09 from '@/components/slides/Slide09';
import Slide10 from '@/components/slides/Slide10';
import Slide11 from '@/components/slides/Slide11';
import Slide12 from '@/components/slides/Slide12';
import Slide13 from '@/components/slides/Slide13';
import Slide14 from '@/components/slides/Slide14';
import Slide15 from '@/components/slides/Slide15';
import Slide16 from '@/components/slides/Slide16';
import Slide17 from '@/components/slides/Slide17';
import Slide18 from '@/components/slides/Slide18';
import Slide19 from '@/components/slides/Slide19';
import Slide20 from '@/components/slides/Slide20';
import Slide21 from '@/components/slides/Slide21';
import Slide22 from '@/components/slides/Slide22';
import Slide23 from '@/components/slides/Slide23';
import Slide24 from '@/components/slides/Slide24';
import Slide25 from '@/components/slides/Slide25';
import Slide26 from '@/components/slides/Slide26';
import Slide27 from '@/components/slides/Slide27';
import Slide28 from '@/components/slides/Slide28';
import Slide29 from '@/components/slides/Slide29';
import Slide30 from '@/components/slides/Slide30';
import Slide31 from '@/components/slides/Slide31';
import Slide32 from '@/components/slides/Slide32';
import Slide33 from '@/components/slides/Slide33';
import Slide34 from '@/components/slides/Slide34';
import Slide35 from '@/components/slides/Slide35';
import Slide36 from '@/components/slides/Slide36';
import Slide37 from '@/components/slides/Slide37';
import Slide38 from '@/components/slides/Slide38';
import Slide39 from '@/components/slides/Slide39';
import Slide40 from '@/components/slides/Slide40';
import Slide41 from '@/components/slides/Slide41';
import Slide42 from '@/components/slides/Slide42';
import Slide43 from '@/components/slides/Slide43';
import Slide44 from '@/components/slides/Slide44';
import Slide45 from '@/components/slides/Slide45';

export interface SlideEntry {
  /** 一意の slug。URL ハッシュやアナリティクス用 */
  id: string;
  /** スライドコンポーネント */
  Component: ComponentType;
  /**
   * 表示する背景。`undefined`/`null` のときは背景なし（黒）。
   * 値はメタデータとして Presentation.tsx の `<DeckBackground />` が読みます。
   */
  background?: DeckBackgroundVariant | null;
  /** 開発者向けのラベル（IDE のホバーで見える） */
  note?: string;
}

/**
 * スライド全体の **シングルソース** です。
 *
 * - 順序を変えたいときはここを並び替えるだけ
 * - 背景を出したいスライドは `background: 'morph'` などを付ける
 * - 新しいスライドを追加するときは末尾に push（あるいは挿入）
 *
 * `Presentation.tsx` 側にロジックを書き散らさず、このファイルだけ見れば
 * 「何が・どんな順で・どんな背景で出るか」が分かるようにしてあります。
 */
export const slideRegistry: SlideEntry[] = [
  { id: 'title', Component: Slide01, background: 'morph', note: 'タイトル' },
  { id: 'logo-particles', Component: Slide21, note: 'ロゴパーティクル' },
  { id: 'feature-cards', Component: Slide02 },
  { id: 'cta', Component: Slide03 },
  { id: 'triangle', Component: Slide04 },
  { id: 'highlight', Component: Slide05 },
  { id: 'metrics', Component: Slide06 },
  { id: 'graph', Component: Slide07 },
  { id: 'llm-qa', Component: Slide08 },
  { id: 'particle-text', Component: Slide09 },
  { id: 'card-carousel', Component: Slide10 },
  { id: 'timeline', Component: Slide11 },
  { id: 'before-after', Component: Slide12 },
  { id: 'matrix', Component: Slide13 },
  { id: 'code-editor', Component: Slide14 },
  { id: 'orbit', Component: Slide15 },
  { id: 'logo-band', Component: Slide16 },
  { id: 'pipeline', Component: Slide17 },
  { id: 'bar-chart', Component: Slide18 },
  { id: 'cube-3d', Component: Slide19 },
  { id: 'qa-close', Component: Slide20, background: 'morph', note: 'Q&A 締め' },

  // 追加された素材スライド
  { id: 'pull-quote', Component: Slide22 },
  { id: 'chapter-divider', Component: Slide23 },
  { id: 'hero-stat', Component: Slide24 },
  { id: 'pricing-tiers', Component: Slide25 },
  { id: 'bento-grid', Component: Slide26 },
  { id: 'team-grid', Component: Slide27 },
  { id: 'roadmap', Component: Slide28 },
  { id: 'keyword-cloud', Component: Slide29 },
  { id: 'world-map', Component: Slide30 },
  { id: 'architecture', Component: Slide31 },

  // Cursor 視点で便利な dev-tool 系
  { id: 'agent-flow', Component: Slide32 },
  { id: 'code-diff', Component: Slide33 },
  { id: 'terminal-demo', Component: Slide34 },
  { id: 'decision-tree', Component: Slide35 },
  { id: 'tech-stack', Component: Slide36 },
  { id: 'status-dashboard', Component: Slide37 },
  { id: 'feature-matrix', Component: Slide38 },

  // セミナーのエンディング系
  { id: 'thank-you', Component: Slide39, background: 'morph', note: 'Thank You' },
  { id: 'recap', Component: Slide40 },
  { id: 'next-steps', Component: Slide41 },
  { id: 'further-reading', Component: Slide42 },
  { id: 'save-the-date', Component: Slide43 },

  // 講師紹介
  { id: 'speaker-profile', Component: Slide44 },
  { id: 'speakers-panel', Component: Slide45 },
];

export type SlideId = (typeof slideRegistry)[number]['id'];
