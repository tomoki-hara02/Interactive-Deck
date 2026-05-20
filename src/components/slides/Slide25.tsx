'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: 3 つの料金プランを書き換え
//   highlighted: 中央のおすすめプランを true に
const TIERS = [
  {
    name: 'Starter',
    price: '0',
    period: '/month',
    desc: '個人や検証目的の方向け',
    accent: '#c8a8ff',
    features: [
      '機能 A の基本',
      '月 100 リクエスト',
      'コミュニティサポート',
      '— Premium 機能なし',
    ],
    cta: '無料で始める',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '29',
    period: '/month',
    desc: 'チーム・継続利用向け',
    accent: '#88bbff',
    features: [
      'Starter のすべて',
      '月 100,000 リクエスト',
      'メールサポート',
      '高度な分析ダッシュボード',
    ],
    cta: 'Pro に進む',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: '大規模・カスタム要件向け',
    accent: '#ffaacc',
    features: [
      'Pro のすべて',
      '無制限のリクエスト',
      'SLA 付き優先サポート',
      '専任カスタマーサクセス',
    ],
    cta: '相談する',
    highlighted: false,
  },
];

export default function Slide25() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-10 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col items-center gap-3 text-center shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: 料金セクションのメイン見出し */}
            シンプルな 3 つのプラン
          </h2>
        </div>

        {/* 3 階層プラン */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              className={`relative flex flex-col gap-6 p-6 md:p-7 rounded-2xl border ${
                t.highlighted
                  ? 'bg-white/[0.08] border-white/20 md:scale-[1.03]'
                  : 'bg-white/[0.04] border-white/10'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.1,
                ease: 'easeOut',
              }}
              style={{
                boxShadow: t.highlighted
                  ? `0 0 40px ${t.accent}33, inset 0 0 0 1px ${t.accent}55`
                  : undefined,
              }}
            >
              {t.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase"
                  style={{ background: t.accent, color: '#1a1530' }}
                >
                  Recommended
                </div>
              )}

              {/* プラン名 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: t.accent }}
                  />
                  <span className="text-xs tracking-[0.22em] uppercase text-white/45">
                    {t.name}
                  </span>
                </div>
                <p className="text-sm text-white/55 mt-1">{t.desc}</p>
              </div>

              {/* 価格 */}
              <div className="flex items-end gap-1 leading-none">
                {t.price === 'Custom' ? (
                  <span className="text-4xl font-bold text-white">{t.price}</span>
                ) : (
                  <>
                    <span className="text-2xl text-white/50 mb-2 font-light">$</span>
                    <span className="text-6xl font-bold text-white tabular-nums">
                      {t.price}
                    </span>
                    <span className="text-sm text-white/50 mb-2">{t.period}</span>
                  </>
                )}
              </div>

              {/* 機能リスト */}
              <ul className="flex flex-col gap-2.5">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-white/70"
                  >
                    <span style={{ color: t.accent }} className="mt-0.5">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`mt-auto w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                  t.highlighted
                    ? 'hover:opacity-90'
                    : 'bg-white/5 border border-white/15 text-white hover:bg-white/10'
                }`}
                style={
                  t.highlighted
                    ? { background: t.accent, color: '#1a1530' }
                    : undefined
                }
              >
                {t.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* フッター注釈 */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 料金に関する補足注釈 */}
          ※ 表示は税抜価格・年払い割引あり
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
