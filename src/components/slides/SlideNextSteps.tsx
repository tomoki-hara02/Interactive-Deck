'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// チェックリスト型の Next Steps スライド。
// セミナーで学んだことを「明日から何をするか」に落とし込むときに便利。
// 期限ピル（when）で、いつまでにやるかも視覚化。

// TODO: アクション項目を書き換え
const ACTIONS = [
  {
    label: '今日学んだことを 1 つ、明日のミーティングで共有する',
    when: 'Tomorrow',
  },
  {
    label: '配布資料を読み、気になる項目に印をつける',
    when: 'This week',
  },
  {
    label: 'チームメンバーに 1 つ、相談を持ちかけてみる',
    when: 'This week',
  },
  {
    label: '次回までに小さな実験を 1 つ実行する',
    when: '2 weeks',
  },
];

export default function SlideNextSteps() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Next Steps · Action Items
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: メイン見出し */}
            このあとの {ACTIONS.length} つのアクション
          </h2>
        </div>

        {/* チェックリスト */}
        <div className="flex flex-col gap-3">
          {ACTIONS.map((a, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 p-4 md:p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.06] transition-colors"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
            >
              {/* チェックボックス */}
              <div className="shrink-0 w-6 h-6 rounded-md border-2 border-white/30 mt-0.5" />

              {/* ラベル + 期限ピル */}
              <div className="flex-1 flex items-center justify-between gap-4 flex-wrap">
                <span className="text-base md:text-lg text-white/85 leading-snug">
                  {a.label}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#88bbff] bg-[#88bbff15] px-2.5 py-1 rounded-full border border-[#88bbff44]">
                  {a.when}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 補足 */}
          ※ 1 つでも実行してみると、明日が変わります。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
