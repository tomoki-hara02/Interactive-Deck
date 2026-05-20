# Interactive Deck — Template

セミナー・講演用の **インタラクティブなプレゼンテーション・テンプレート**。
Next.js + Framer Motion + Three.js で作られた 20 枚のスライドが、矢印キー・スペース・クリック・画面右下のドットで操作できます。

PowerPoint の代替・補完として、ブラウザで開けば即フルスクリーン上映できる「Web スライド」を素早く立ち上げるための雛形です。

---

## このリポジトリの使い方（2 つの方針）

### A. テンプレートリポジトリとして毎回コピー（推奨）

1. GitHub でこのリポジトリの **Settings → General → Template repository** にチェックを入れる。
2. 新しいセミナーを作るたびに「**Use this template**」から新リポジトリを作成。
3. Vercel で新リポジトリをインポートすれば、ブランチごとの公開 URL が自動発行されます。

### B. ブランチで管理

```bash
git checkout -b seminar/2026-07-my-topic
# スライドを編集
git push -u origin seminar/2026-07-my-topic
```

ブランチ単位で Vercel が Preview URL を発行します。

---

## ローカルでの起動

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く。

---

## 操作方法

| 操作 | 動作 |
|---|---|
| `→` / `Space` / 画面右半分クリック | 次のスライド |
| `←` / 画面左半分クリック | 前のスライド |
| 右下のドットをクリック | 任意のスライドへジャンプ |
| 左右の矢印アイコン | 同上 |

---

## ファイル構成

```
src/
├── app/
│   ├── layout.tsx        ← メタ情報（title, description）
│   └── page.tsx          ← Presentation を表示するだけ
├── theme/                ← 共通デザイントークン
│   ├── colors.ts         ← ACCENTS / BG_COLOR / withAlpha()
│   └── motion.ts         ← FADE_UP / FADE / POP_IN / DURATION
├── hooks/
│   └── useCountUp.ts     ← カウントアップ hook（Slide06/18/24 で共有）
├── config/
│   └── slides.ts         ← スライド順序・背景メタの「シングルソース」
└── components/
    ├── Presentation.tsx  ← レジストリを読んでスライド/背景を制御
    ├── SlideWrapper.tsx  ← 各スライドの共通レイアウト
    ├── ui/               ← スライド横断の汎用 UI
    │   ├── SlideSectionHeader.tsx  ← Eyebrow + h2 ブロック
    │   ├── SlideFooterNote.tsx     ← ※ 注釈テキスト
    │   ├── FadeUp.tsx              ← initial:0,y:20 → animate:1,0 を1行で
    │   └── GlassCard.tsx           ← ガラス風カード
    ├── backgrounds/      ← 背景レイヤーの統一窓口
    │   ├── DeckBackground.tsx      ← variant で切り替え可能な背景
    │   └── index.ts                ← `import { DeckBackground } from '@/components/backgrounds'`
    ├── ParticleMorphBackground.tsx  ← デフォルトの粒子背景（実装本体）
    ├── ParticleBackground.tsx       ← 別パターンの粒子背景（tsparticles）
    ├── EarthBackground.tsx          ← 地球の 3D 背景
    └── slides/
        ├── Slide01.tsx   ← タイトル
        ├── Slide02.tsx   ← 3 つの特徴カード
        ├── Slide03.tsx   ← CTA ボタン
        ├── Slide04.tsx   ← 3 要素の三角形（SVG アニメ）
        ├── Slide05.tsx   ← 本文を段階的にハイライト
        ├── Slide06.tsx   ← 3 つのメトリクス（カウントアップ）
        ├── Slide07.tsx   ← ナレッジグラフ
        ├── Slide08.tsx   ← LLM 風 Q&A デモ
        ├── Slide09.tsx   ← パーティクル文字モーフィング
        ├── Slide10.tsx   ← 3D の 3 カードカルーセル
        ├── Slide11.tsx   ← 横軸タイムライン
        ├── Slide12.tsx   ← Before / After 比較
        ├── Slide13.tsx   ← 2 軸マトリクス
        ├── Slide14.tsx   ← コードエディタ風
        ├── Slide15.tsx   ← オービット衛星
        ├── Slide16.tsx   ← ロゴ流＋数値バンド
        ├── Slide17.tsx   ← 5 ステップのパイプライン
        ├── Slide18.tsx   ← 横棒グラフ（カウントアップ）
        ├── Slide19.tsx   ← 3D キューブ（Three.js）
        ├── Slide20.tsx   ← Q&A クロージング
        ├── Slide21.tsx   ← ロゴパーティクル（3D 回転・発散↔収束）
        ├── Slide22.tsx   ← 引用ヒーロー（Pull Quote）
        ├── Slide23.tsx   ← 章扉（巨大番号 + チャプタータイトル）
        ├── Slide24.tsx   ← ヒーロー数字（単一の大きな数字）
        ├── Slide25.tsx   ← 料金プラン 3 階層比較
        ├── Slide26.tsx   ← Bento グリッド（4×3 混在配置）
        ├── Slide27.tsx   ← チームグリッド（アバター）
        ├── Slide28.tsx   ← ロードマップ（四半期×4）
        ├── Slide29.tsx   ← キーワードクラウド（浮遊テキスト）
        ├── Slide30.tsx   ← ワールドマップ（拠点ドット + 接続アーク）
        ├── Slide31.tsx   ← 積層アーキテクチャ図
        ├── Slide32.tsx   ← AI エージェントフロー（4 ステージ）
        ├── Slide33.tsx   ← コード Diff ビュー（+/- 行ハイライト）
        ├── Slide34.tsx   ← ターミナル デモ（逐次表示）
        ├── Slide35.tsx   ← 判断ツリー（Yes / No 分岐）
        ├── Slide36.tsx   ← 技術スタック（カテゴリ別チップ）
        ├── Slide37.tsx   ← サービスステータスボード
        ├── Slide38.tsx   ← 機能比較マトリクス（多列）
        ├── Slide39.tsx   ← Thank You（巨大グラデ感謝）
        ├── Slide40.tsx   ← Recap / Key Takeaways
        ├── Slide41.tsx   ← Next Steps / Action Items
        ├── Slide42.tsx   ← Further Reading / Resources
        ├── Slide43.tsx   ← Save the Date（次回告知）
        ├── Slide44.tsx   ← Speaker Profile（1 人詳細・アバター+経歴+ステータス）
        └── Slide45.tsx   ← Speakers Panel（2〜3 名のパネル登壇者）
```

---

## カスタマイズの手順

### 1. メタ情報を変える

`src/app/layout.tsx` の `metadata` を編集すると、ブラウザのタブ名と OGP が変わります。

### 2. スライドの中身を書き換える

各スライドファイル内の `// TODO:` コメントを目印に編集します。
よく書き換える箇所：

- スライド冒頭の `const` 定義（カード配列・タイムライン・メトリクスなど）
- 見出し `<h2>` のテキスト
- 注釈テキスト（`<p>`）

### 3. スライドを追加・削除する

スライドの順序・有無は `src/config/slides.ts` の **`slideRegistry`** に集約しています。
`Presentation.tsx` を触る必要はありません。

```tsx
// src/config/slides.ts
export const slideRegistry: SlideEntry[] = [
  { id: 'title', Component: Slide01, background: 'morph' },
  { id: 'feature-cards', Component: Slide02 },
  // ...
  { id: 'thank-you', Component: Slide39, background: 'morph' },
];
```

- **順序を変える** → 配列を並び替えるだけ
- **不要なスライドを外す** → 行を削除（ファイル本体は残して OK）
- **新しいスライドを足す** → import して `slideRegistry` に push

### 4. 背景の表示・非表示（パーティクルを呼び出す）

各エントリの `background` プロパティで、そのスライド表示中だけ背景を出せます。
**スライドごとに 1 行追加するだけ**で、Three.js の重い初期化は `dynamic({ ssr: false })` で遅延ロードされます。

```tsx
// 粒子モーフ背景を出すスライド
{ id: 'title', Component: Slide01, background: 'morph' },

// 地球 3D 背景を出すスライド
{ id: 'space-intro', Component: Slide99, background: 'earth' },

// 2D tsparticles を出すスライド
{ id: 'sparkle', Component: SlideX, background: 'particles' },

// 背景なし（既定）
{ id: 'plain', Component: Slide02 },
```

利用可能な `background` の値：

| 値 | 何が出るか | 実装 |
|---|---|---|
| `'morph'` | 球↔トーラス↔正二十面体↔ボックスのパーティクルモーフ | `ParticleMorphBackground.tsx` |
| `'earth'` | 地球 + 軌道リング + 星 | `EarthBackground.tsx` |
| `'particles'` | リンク付き 2D 粒子（tsparticles） | `ParticleBackground.tsx` |
| `null` / 未指定 | 背景なし（黒） | — |

#### スライド内に直接埋め込みたい場合

特定のスライドだけ独自に背景を持たせたい時は、コンポーネント内で直接呼べます：

```tsx
import { DeckBackground } from '@/components/backgrounds';

export default function MySlide() {
  return (
    <SlideWrapper>
      <DeckBackground variant="morph" />
      {/* スライド本体 */}
    </SlideWrapper>
  );
}
```

新しい背景パターンを足したいときは、ファイルを 1 つ作って
`src/components/backgrounds/DeckBackground.tsx` 内の `BACKGROUNDS` マップに
`dynamic(() => import(...))` を 1 行追加するだけです。

### 5. ロゴ画像（Slide21）

Slide21 は `public/logo.png` を Three.js（R3F）でパーティクル化し、
「散らばる → ロゴに収束 → 散らばる」をループしつつ 3D タンブルさせます。差し替え手順：

1. `public/logo.png` を自分のロゴ画像で上書き（透過 PNG 推奨・正方形に近い形が崩れにくい）
2. 必要に応じて `src/components/slides/Slide21.tsx` 冒頭の定数を調整
   - `LOGO_SRC` ＝ 別ファイル名にする場合
   - `PARTICLE_COUNT` ＝ 粒子数（多いほど密だが負荷上昇）
   - `CYCLE_S` ＝ 1 サイクル（収束→停止→発散→停止）の秒数
3. 動きを変えたいときは `LogoParticles` 内の `useFrame` 中の rotation を調整
   - `rotation.y = t * 0.22` ← 回転速度（rad/sec）
   - `rotation.x = Math.sin(t * 0.35) * 0.45` ← 振り幅と速さ
4. 収束/停止/発散の比率はバーテックスシェーダ中の閾値（0.20 / 0.62 / 0.82）で変えられる

### 6. テーマカラー

ブランドカラーは `src/theme/colors.ts` の **`ACCENTS`** に集約されています。
スライド側ではここを参照すれば、全スライドの色を 1 箇所で切り替えられます。

```tsx
import { ACCENTS, withAlpha } from '@/theme/colors';

<div style={{ color: ACCENTS.purple }} />
<div style={{ background: withAlpha(ACCENTS.blue, 0.2) }} />
```

| キー | HEX | 役割 |
|---|---|---|
| `ACCENTS.purple` | `#7B5EA7` | 紫（メイン） |
| `ACCENTS.blue` | `#4F8EF7` | 青（メイン） |
| `ACCENTS.pink` | `#FF6B9D` | ピンク（メイン） |
| `ACCENTS.lightPurple` | `#c8a8ff` | 紫（淡） |
| `ACCENTS.lightBlue` | `#88bbff` | 青（淡） |
| `ACCENTS.lightPink` | `#ffaacc` | ピンク（淡） |
| `ACCENTS.green` | `#9ee0a8` | 補助（成功・上昇） |
| `ACCENTS.amber` | `#f7c46c` | 補助（注意・中間） |

---

## 共有ユーティリティ・チートシート

新しいスライドを書くときに「いちいち調べなくていい」ようにまとめました。

### モーション

```tsx
import { FadeUp } from '@/components/ui';
import { FADE_UP, DURATION } from '@/theme/motion';

// コンポーネントとして
<FadeUp delay={0.2}>
  <h2>タイトル</h2>
</FadeUp>

// motion.div に展開して使う
<motion.div {...FADE_UP} transition={{ ...FADE_UP.transition, delay: 0.3 }}>
  ...
</motion.div>
```

### スライド見出し / 注釈

```tsx
import { SlideSectionHeader, SlideFooterNote, GlassCard } from '@/components/ui';

<SlideSectionHeader
  eyebrow="Section Label"
  title="数字が示す、インパクト"
  size="lg"
/>

<GlassCard padded>
  <p>カード本文</p>
</GlassCard>

<SlideFooterNote>出典: ベンチマーク 2026年5月</SlideFooterNote>
```

### カウントアップ

```tsx
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

function Metric() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const v = useCountUp(120, { duration: 1.6, start: inView });
  return <div ref={ref}>{v.toFixed(0)}</div>;
}
```

---

## デプロイ

Vercel に GitHub リポジトリを接続すれば自動デプロイされます。
`npm install` 時に `workspace:` プロトコル問題が出るため、ルートに `.npmrc` で `legacy-peer-deps=true` を入れています（編集不要）。

---

## ライセンス / 派生物

このテンプレートは自由に複製・改変して構いません。スライド配下のテキストはすべて `// TODO:` 付きのプレースホルダなので、置換するだけで新しい資料になります。
