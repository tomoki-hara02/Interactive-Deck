'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: 各四半期のマイルストーンを書き換え
//   status: 'done' | 'current' | 'upcoming'
const QUARTERS = [
  {
    label: 'Q1',
    status: 'done',
    items: ['基本機能のリリース', '初期ユーザー獲得', 'インフラ整備'],
  },
  {
    label: 'Q2',
    status: 'done',
    items: ['UI 改善', 'モバイル対応', 'パートナー契約 3 社'],
  },
  {
    label: 'Q3',
    status: 'current',
    items: ['AI レコメンド開始', '海外展開 PoC', 'エンタープライズ機能'],
  },
  {
    label: 'Q4',
    status: 'upcoming',
    items: ['新プロダクト発表', '次期ラウンド準備', 'チーム 2x 拡大'],
  },
] as const;

const STATUS = {
  done:     { color: '#88bbff', label: '完了'   },
  current:  { color: '#FF6B9D', label: '進行中' },
  upcoming: { color: '#c8a8ff', label: '予定'   },
} as const;

export default function Slide28() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 md:gap-12 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Roadmap · 2026
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: ロードマップのメイン見出し */}
            これからの 1 年
          </h2>
        </div>

        {/* タイムライン */}
        <div className="relative">
          {/* 横線 */}
          <div className="absolute left-0 right-0 top-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* クォーター列 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 relative">
            {QUARTERS.map((q, i) => {
              const s = STATUS[q.status];
              return (
                <motion.div
                  key={q.label}
                  className="flex flex-col items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                >
                  {/* マーカードット */}
                  <div className="relative">
                    <div
                      className="w-4 h-4 rounded-full border-2"
                      style={{
                        background:
                          q.status === 'upcoming' ? 'transparent' : s.color,
                        borderColor: s.color,
                        boxShadow:
                          q.status !== 'upcoming'
                            ? `0 0 16px ${s.color}99`
                            : undefined,
                      }}
                    />
                    {q.status === 'current' && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 pointer-events-none"
                        style={{ borderColor: s.color }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2.4, opacity: 0 }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                    )}
                  </div>

                  {/* クォーター名 + ステータス */}
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl font-bold text-white tracking-tight">
                      {q.label}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase"
                      style={{ color: s.color }}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* マイルストーン項目 */}
                  <ul className="flex flex-col gap-2 mt-1">
                    {q.items.map((it) => (
                      <li
                        key={it}
                        className="text-sm text-white/65 pl-3 border-l"
                        style={{ borderColor: `${s.color}66` }}
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* フッター注釈 */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: ロードマップに関する注記 */}
          ※ 計画は適宜更新されます。最新はお問い合わせください。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
