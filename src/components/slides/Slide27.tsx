'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: メンバー情報を書き換え（イニシャル 2 文字 + 名前 + 役職）
//   accent: アバターのグラデーション 2 色
const MEMBERS = [
  { initials: 'AB', name: 'Member One',   role: 'CEO / Founder',      accent: ['#7B5EA7', '#4F8EF7'] },
  { initials: 'CD', name: 'Member Two',   role: 'CTO',                accent: ['#4F8EF7', '#88bbff'] },
  { initials: 'EF', name: 'Member Three', role: 'Head of Design',     accent: ['#FF6B9D', '#c8a8ff'] },
  { initials: 'GH', name: 'Member Four',  role: 'Engineering Lead',   accent: ['#88bbff', '#c8a8ff'] },
  { initials: 'IJ', name: 'Member Five',  role: 'Product Manager',    accent: ['#c8a8ff', '#ffaacc'] },
  { initials: 'KL', name: 'Member Six',   role: 'Customer Success',   accent: ['#ffaacc', '#FF6B9D'] },
];

export default function Slide27() {
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
            The People
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: チームセクションのメイン見出し */}
            支える、6 人。
          </h2>
        </div>

        {/* メンバーグリッド */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
          {MEMBERS.map((m, i) => (
            <motion.div
              key={m.name}
              className="flex flex-col items-center text-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            >
              {/* アバター（イニシャルバッジ） */}
              <motion.div
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-bold text-xl md:text-2xl text-white"
                style={{
                  background: `linear-gradient(135deg, ${m.accent[0]}, ${m.accent[1]})`,
                  boxShadow: `0 0 30px ${m.accent[0]}55`,
                }}
                whileHover={{ scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {m.initials}
                {/* パルスリング */}
                <motion.span
                  className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              </motion.div>

              {/* 名前・役職 */}
              <div className="flex flex-col gap-0.5">
                <p className="text-sm md:text-base font-semibold text-white">
                  {m.name}
                </p>
                <p className="text-xs text-white/45 tracking-wide">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: チームの位置づけや人数の補足 */}
          ※ ロール構成と人数は適宜書き換えてください。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
