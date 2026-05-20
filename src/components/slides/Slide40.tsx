'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// 今日のキーポイント振り返り（Recap）スライド。
// 3〜5 個の要点に番号バッジを付けてカード形式で並べる。

// TODO: 今日のキーポイントを書き換え（3〜5 個推奨）
const TAKEAWAYS = [
  {
    title: '視点が変わると、選択肢が広がる',
    desc: '前提を疑うことで、見えていなかった解が現れる。',
    accent: '#c8a8ff',
  },
  {
    title: '小さく検証し、素早く学ぶ',
    desc: '完璧な計画より、早い実験。仮説と検証を回し続ける。',
    accent: '#88bbff',
  },
  {
    title: 'チームの力で速度を 2 倍に',
    desc: '一人で抱え込まない。役割と情報の流れを設計する。',
    accent: '#FF6B9D',
  },
  {
    title: '振り返りを習慣化する',
    desc: '週次のリトロが、月次・四半期の差をつくる。',
    accent: '#ffaacc',
  },
];

export default function Slide40() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 md:gap-12 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Recap · Key Takeaways
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: 振り返りのメイン見出し */}
            今日のキーポイント
          </h2>
        </div>

        {/* テイクアウェイ */}
        <div className="flex flex-col gap-4 md:gap-5">
          {TAKEAWAYS.map((t, i) => (
            <motion.div
              key={t.title}
              className="flex items-start gap-5 md:gap-6 p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              {/* 番号バッジ */}
              <div
                className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-2xl tabular-nums"
                style={{
                  background: `${t.accent}1f`,
                  border: `1px solid ${t.accent}66`,
                  color: t.accent,
                  boxShadow: `0 0 18px ${t.accent}33`,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* 本文 */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                  {t.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 補足 */}
          ※ スライド資料は後日メールで共有します。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
