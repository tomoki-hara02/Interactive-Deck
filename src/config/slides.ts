import type { ComponentType } from 'react';
import type { DeckBackgroundVariant } from '@/components/backgrounds';

import TitleHero       from '@/components/slides/TitleHero';
import FeatureCards    from '@/components/slides/FeatureCards';
import CTA             from '@/components/slides/CTA';
import TriangleDiagram from '@/components/slides/TriangleDiagram';
import TextHighlight   from '@/components/slides/TextHighlight';
import Metrics         from '@/components/slides/Metrics';
import KnowledgeGraph  from '@/components/slides/KnowledgeGraph';
import LiveInference   from '@/components/slides/LiveInference';
import ParticleText    from '@/components/slides/ParticleText';
import CardCarousel    from '@/components/slides/CardCarousel';
import Timeline        from '@/components/slides/Timeline';
import BeforeAfter     from '@/components/slides/BeforeAfter';
import TwoAxisMatrix   from '@/components/slides/TwoAxisMatrix';
import CodeEditor      from '@/components/slides/CodeEditor';
import OrbitDiagram    from '@/components/slides/OrbitDiagram';
import LogoBand        from '@/components/slides/LogoBand';
import Pipeline        from '@/components/slides/Pipeline';
import BarChart        from '@/components/slides/BarChart';
import Cube3D          from '@/components/slides/Cube3D';
import QAClosing       from '@/components/slides/QAClosing';
import LogoParticles   from '@/components/slides/LogoParticles';
import PullQuote       from '@/components/slides/PullQuote';
import ChapterDivider  from '@/components/slides/ChapterDivider';
import HeroStat        from '@/components/slides/HeroStat';
import PricingTiers    from '@/components/slides/PricingTiers';
import BentoGrid       from '@/components/slides/BentoGrid';
import TeamGrid        from '@/components/slides/TeamGrid';
import Roadmap         from '@/components/slides/Roadmap';
import KeywordCloud    from '@/components/slides/KeywordCloud';
import WorldMap        from '@/components/slides/WorldMap';
import LayeredArch     from '@/components/slides/LayeredArch';
import AgentFlow       from '@/components/slides/AgentFlow';
import CodeDiff        from '@/components/slides/CodeDiff';
import TerminalDemo    from '@/components/slides/TerminalDemo';
import DecisionTree    from '@/components/slides/DecisionTree';
import TechStack       from '@/components/slides/TechStack';
import StatusDashboard from '@/components/slides/StatusDashboard';
import FeatureMatrix   from '@/components/slides/FeatureMatrix';
import ThankYou        from '@/components/slides/ThankYou';
import Recap           from '@/components/slides/Recap';
import NextSteps       from '@/components/slides/NextSteps';
import FurtherReading  from '@/components/slides/FurtherReading';
import SaveTheDate     from '@/components/slides/SaveTheDate';
import SpeakerProfile  from '@/components/slides/SpeakerProfile';
import SpeakersPanel   from '@/components/slides/SpeakersPanel';

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
  { id: 'title',            Component: TitleHero,      background: 'morph', note: 'タイトル' },
  { id: 'logo-particles',   Component: LogoParticles,  note: 'ロゴパーティクル' },
  { id: 'feature-cards',    Component: FeatureCards },
  { id: 'cta',              Component: CTA },
  { id: 'triangle',         Component: TriangleDiagram },
  { id: 'highlight',        Component: TextHighlight },
  { id: 'metrics',          Component: Metrics },
  { id: 'graph',            Component: KnowledgeGraph },
  { id: 'live-inference',   Component: LiveInference },
  { id: 'particle-text',    Component: ParticleText },
  { id: 'card-carousel',    Component: CardCarousel },
  { id: 'timeline',         Component: Timeline },
  { id: 'before-after',     Component: BeforeAfter },
  { id: 'matrix',           Component: TwoAxisMatrix },
  { id: 'code-editor',      Component: CodeEditor },
  { id: 'orbit',            Component: OrbitDiagram },
  { id: 'logo-band',        Component: LogoBand },
  { id: 'pipeline',         Component: Pipeline },
  { id: 'bar-chart',        Component: BarChart },
  { id: 'cube-3d',          Component: Cube3D },
  { id: 'qa-close',         Component: QAClosing,      background: 'morph', note: 'Q&A 締め' },

  // 追加された素材スライド
  { id: 'pull-quote',       Component: PullQuote },
  { id: 'chapter-divider',  Component: ChapterDivider },
  { id: 'hero-stat',        Component: HeroStat },
  { id: 'pricing-tiers',    Component: PricingTiers },
  { id: 'bento-grid',       Component: BentoGrid },
  { id: 'team-grid',        Component: TeamGrid },
  { id: 'roadmap',          Component: Roadmap },
  { id: 'keyword-cloud',    Component: KeywordCloud },
  { id: 'world-map',        Component: WorldMap },
  { id: 'architecture',     Component: LayeredArch },

  // Cursor 視点で便利な dev-tool 系
  { id: 'agent-flow',       Component: AgentFlow },
  { id: 'code-diff',        Component: CodeDiff },
  { id: 'terminal-demo',    Component: TerminalDemo },
  { id: 'decision-tree',    Component: DecisionTree },
  { id: 'tech-stack',       Component: TechStack },
  { id: 'status-dashboard', Component: StatusDashboard },
  { id: 'feature-matrix',   Component: FeatureMatrix },

  // セミナーのエンディング系
  { id: 'thank-you',        Component: ThankYou,       background: 'morph', note: 'Thank You' },
  { id: 'recap',            Component: Recap },
  { id: 'next-steps',       Component: NextSteps },
  { id: 'further-reading',  Component: FurtherReading },
  { id: 'save-the-date',    Component: SaveTheDate },

  // 講師紹介
  { id: 'speaker-profile',  Component: SpeakerProfile },
  { id: 'speakers-panel',   Component: SpeakersPanel },
];

export type SlideId = (typeof slideRegistry)[number]['id'];
