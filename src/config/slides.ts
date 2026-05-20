import type { ComponentType } from 'react';
import type { DeckBackgroundVariant } from '@/components/backgrounds';

import SlideTitleHero      from '@/components/slides/SlideTitleHero';
import SlideFeatureCards   from '@/components/slides/SlideFeatureCards';
import SlideCTA            from '@/components/slides/SlideCTA';
import SlideTriangleDiagram from '@/components/slides/SlideTriangleDiagram';
import SlideTextHighlight  from '@/components/slides/SlideTextHighlight';
import SlideMetrics        from '@/components/slides/SlideMetrics';
import SlideKnowledgeGraph from '@/components/slides/SlideKnowledgeGraph';
import SlideChatDemo       from '@/components/slides/SlideChatDemo';
import SlideParticleText   from '@/components/slides/SlideParticleText';
import SlideCardCarousel   from '@/components/slides/SlideCardCarousel';
import SlideTimeline       from '@/components/slides/SlideTimeline';
import SlideBeforeAfter    from '@/components/slides/SlideBeforeAfter';
import SlideTwoAxisMatrix  from '@/components/slides/SlideTwoAxisMatrix';
import SlideCodeEditor     from '@/components/slides/SlideCodeEditor';
import SlideOrbitDiagram   from '@/components/slides/SlideOrbitDiagram';
import SlideLogoBand       from '@/components/slides/SlideLogoBand';
import SlidePipeline       from '@/components/slides/SlidePipeline';
import SlideBarChart       from '@/components/slides/SlideBarChart';
import SlideCube3D         from '@/components/slides/SlideCube3D';
import SlideQAClosing      from '@/components/slides/SlideQAClosing';
import SlideLogoParticles  from '@/components/slides/SlideLogoParticles';
import SlidePullQuote      from '@/components/slides/SlidePullQuote';
import SlideChapterDivider from '@/components/slides/SlideChapterDivider';
import SlideHeroStat       from '@/components/slides/SlideHeroStat';
import SlidePricingTiers   from '@/components/slides/SlidePricingTiers';
import SlideBentoGrid      from '@/components/slides/SlideBentoGrid';
import SlideTeamGrid       from '@/components/slides/SlideTeamGrid';
import SlideRoadmap        from '@/components/slides/SlideRoadmap';
import SlideKeywordCloud   from '@/components/slides/SlideKeywordCloud';
import SlideWorldMap       from '@/components/slides/SlideWorldMap';
import SlideLayeredArch    from '@/components/slides/SlideLayeredArch';
import SlideAgentFlow      from '@/components/slides/SlideAgentFlow';
import SlideCodeDiff       from '@/components/slides/SlideCodeDiff';
import SlideTerminalDemo   from '@/components/slides/SlideTerminalDemo';
import SlideDecisionTree   from '@/components/slides/SlideDecisionTree';
import SlideTechStack      from '@/components/slides/SlideTechStack';
import SlideStatusDashboard from '@/components/slides/SlideStatusDashboard';
import SlideFeatureMatrix  from '@/components/slides/SlideFeatureMatrix';
import SlideThankYou       from '@/components/slides/SlideThankYou';
import SlideRecap          from '@/components/slides/SlideRecap';
import SlideNextSteps      from '@/components/slides/SlideNextSteps';
import SlideFurtherReading from '@/components/slides/SlideFurtherReading';
import SlideSaveTheDate    from '@/components/slides/SlideSaveTheDate';
import SlideSpeakerProfile from '@/components/slides/SlideSpeakerProfile';
import SlideSpeakersPanel  from '@/components/slides/SlideSpeakersPanel';

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
  { id: 'title',            Component: SlideTitleHero,      background: 'morph', note: 'タイトル' },
  { id: 'logo-particles',   Component: SlideLogoParticles,  note: 'ロゴパーティクル' },
  { id: 'feature-cards',    Component: SlideFeatureCards },
  { id: 'cta',              Component: SlideCTA },
  { id: 'triangle',         Component: SlideTriangleDiagram },
  { id: 'highlight',        Component: SlideTextHighlight },
  { id: 'metrics',          Component: SlideMetrics },
  { id: 'graph',            Component: SlideKnowledgeGraph },
  { id: 'llm-qa',           Component: SlideChatDemo },
  { id: 'particle-text',    Component: SlideParticleText },
  { id: 'card-carousel',    Component: SlideCardCarousel },
  { id: 'timeline',         Component: SlideTimeline },
  { id: 'before-after',     Component: SlideBeforeAfter },
  { id: 'matrix',           Component: SlideTwoAxisMatrix },
  { id: 'code-editor',      Component: SlideCodeEditor },
  { id: 'orbit',            Component: SlideOrbitDiagram },
  { id: 'logo-band',        Component: SlideLogoBand },
  { id: 'pipeline',         Component: SlidePipeline },
  { id: 'bar-chart',        Component: SlideBarChart },
  { id: 'cube-3d',          Component: SlideCube3D },
  { id: 'qa-close',         Component: SlideQAClosing,      background: 'morph', note: 'Q&A 締め' },

  // 追加された素材スライド
  { id: 'pull-quote',       Component: SlidePullQuote },
  { id: 'chapter-divider',  Component: SlideChapterDivider },
  { id: 'hero-stat',        Component: SlideHeroStat },
  { id: 'pricing-tiers',    Component: SlidePricingTiers },
  { id: 'bento-grid',       Component: SlideBentoGrid },
  { id: 'team-grid',        Component: SlideTeamGrid },
  { id: 'roadmap',          Component: SlideRoadmap },
  { id: 'keyword-cloud',    Component: SlideKeywordCloud },
  { id: 'world-map',        Component: SlideWorldMap },
  { id: 'architecture',     Component: SlideLayeredArch },

  // Cursor 視点で便利な dev-tool 系
  { id: 'agent-flow',       Component: SlideAgentFlow },
  { id: 'code-diff',        Component: SlideCodeDiff },
  { id: 'terminal-demo',    Component: SlideTerminalDemo },
  { id: 'decision-tree',    Component: SlideDecisionTree },
  { id: 'tech-stack',       Component: SlideTechStack },
  { id: 'status-dashboard', Component: SlideStatusDashboard },
  { id: 'feature-matrix',   Component: SlideFeatureMatrix },

  // セミナーのエンディング系
  { id: 'thank-you',        Component: SlideThankYou,       background: 'morph', note: 'Thank You' },
  { id: 'recap',            Component: SlideRecap },
  { id: 'next-steps',       Component: SlideNextSteps },
  { id: 'further-reading',  Component: SlideFurtherReading },
  { id: 'save-the-date',    Component: SlideSaveTheDate },

  // 講師紹介
  { id: 'speaker-profile',  Component: SlideSpeakerProfile },
  { id: 'speakers-panel',   Component: SlideSpeakersPanel },
];

export type SlideId = (typeof slideRegistry)[number]['id'];
