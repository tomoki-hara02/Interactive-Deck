'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// Save the Date / 次回イベント告知スライド。
// カレンダー型の日付ブロック + 詳細情報のカード構成。

// TODO: 次回イベント情報を書き換え
const EVENT = {
  label: 'Save the Date',
  title: '次回セミナーのお知らせ',
  topic: '次回テーマ：プロダクト開発の高速化',
  date: { month: 'JUN', day: '14', year: '2026', dayOfWeek: 'Sat' },
  details: [
    { key: 'Time',  value: '14:00 - 16:30' },
    { key: 'Where', value: 'Online (Zoom) + 東京会場' },
    { key: 'URL',   value: 'event.example.com', mono: true },
  ],
};

export default function Slide43() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 md:gap-10 w-full max-w-4xl items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 上部ラベル */}
        <motion.span
          className="text-[10px] tracking-[0.32em] uppercase text-white/40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {EVENT.label}
        </motion.span>

        {/* タイトル */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {EVENT.title}
        </motion.h2>

        {/* イベントカード */}
        <motion.div
          className="relative w-full max-w-2xl p-7 md:p-10 rounded-3xl border border-white/15 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(123,94,167,0.22) 0%, rgba(79,142,247,0.16) 60%, rgba(255,107,157,0.16) 100%)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        >
          {/* 装飾グロー */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(136,187,255,0.30) 0%, transparent 70%)',
            }}
          />

          {/* 日付ブロック + 詳細 */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* カレンダー風の日付 */}
            <div
              className="shrink-0 flex flex-col items-center justify-center w-28 h-32 rounded-2xl border border-white/20 overflow-hidden"
              style={{ background: 'rgba(10,10,15,0.55)' }}
            >
              <div
                className="w-full py-1.5 text-[10px] tracking-widest uppercase text-center font-medium"
                style={{ background: '#FF6B9D33', color: '#ffaacc' }}
              >
                {EVENT.date.month}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-5xl font-bold text-white tabular-nums leading-none">
                  {EVENT.date.day}
                </span>
              </div>
              <div className="w-full py-1 text-[10px] tracking-widest uppercase text-center text-white/55">
                {EVENT.date.year} · {EVENT.date.dayOfWeek}
              </div>
            </div>

            {/* 詳細 */}
            <div className="flex flex-col gap-3 text-left flex-1 min-w-0">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-white/45 uppercase tracking-widest">
                  Next session
                </p>
                <p className="text-lg md:text-xl text-white font-semibold leading-tight">
                  {EVENT.topic}
                </p>
              </div>

              {/* Key-Value 詳細 */}
              <div className="flex flex-col gap-1.5 mt-1 text-sm">
                {EVENT.details.map((d) => (
                  <div key={d.key} className="flex items-baseline gap-3">
                    <span className="w-12 shrink-0 text-[10px] tracking-widest uppercase text-white/40">
                      {d.key}
                    </span>
                    <span
                      className={`text-white/85 ${d.mono ? 'font-mono text-[#88bbff]' : ''}`}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* フッター */}
        <motion.p
          className="text-xs text-white/40 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {/* TODO: 補足 */}
          ※ 詳細・参加申込は後日メールにてご案内します。
        </motion.p>
      </motion.div>
    </SlideWrapper>
  );
}
