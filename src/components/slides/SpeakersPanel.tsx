'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// 複数登壇者（パネル / 共同セミナー）の紹介スライド。
// Slide27（チームグリッド）よりも 1 人あたりの情報量が多めの「中サイズ」カード版。

// TODO: 登壇者を 2〜3 人で書き換え（4 人以上にすると窮屈になります）
const SPEAKERS = [
  {
    initials: 'AB',
    name: '田中 花子',
    nameEn: 'TANAKA Hanako',
    role: 'CEO',
    affiliation: 'Example Inc.',
    bio: '事業立ち上げから IPO までを 2 社で経験。プロダクトと事業の橋渡しが得意。',
    tag: 'Strategy',
    avatar: ['#7B5EA7', '#4F8EF7'],
    handle: '@hanako_t',
  },
  {
    initials: 'CD',
    name: '佐藤 一郎',
    nameEn: 'SATO Ichiro',
    role: 'Head of AI',
    affiliation: 'Example AI',
    bio: 'LLM のプロダクト適用に深く携わる。論文執筆と OSS 公開を継続中。',
    tag: 'AI / Research',
    avatar: ['#4F8EF7', '#88bbff'],
    handle: '@ichiro_ai',
  },
  {
    initials: 'EF',
    name: '鈴木 次郎',
    nameEn: 'SUZUKI Jiro',
    role: 'Principal Designer',
    affiliation: 'Studio Example',
    bio: 'BtoB SaaS の UX を 10 年。最近は AI とのインタラクション設計が主軸。',
    tag: 'Design',
    avatar: ['#FF6B9D', '#ffaacc'],
    handle: '@jiro_d',
  },
];

export default function SpeakersPanel() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Speakers · 本日の登壇者
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: メイン見出し */}
            {SPEAKERS.length} 名でお届けします
          </h2>
        </div>

        {/* 登壇者カード */}
        <div
          className={`grid gap-5 ${
            SPEAKERS.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
          } grid-cols-1`}
        >
          {SPEAKERS.map((sp, i) => (
            <motion.div
              key={sp.name}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.04] border border-white/10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
            >
              {/* アバター + タグ */}
              <div className="flex items-start justify-between gap-3">
                <div
                  className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-bold text-xl md:text-2xl text-white shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${sp.avatar[0]}, ${sp.avatar[1]})`,
                    boxShadow: `0 0 24px ${sp.avatar[0]}55`,
                  }}
                >
                  {sp.initials}
                  <motion.span
                    className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.18], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </div>

                {/* タグ */}
                <span
                  className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    color: sp.avatar[0],
                    borderColor: `${sp.avatar[0]}66`,
                    background: `${sp.avatar[0]}11`,
                  }}
                >
                  {sp.tag}
                </span>
              </div>

              {/* 名前 */}
              <div className="flex flex-col gap-0.5">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  {sp.name}
                </h3>
                <p className="text-[10px] text-white/40 tracking-[0.22em]">
                  {sp.nameEn}
                </p>
              </div>

              {/* 役職・所属 */}
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#88bbff] font-medium">
                  {sp.role}
                </span>
                <span className="text-xs text-white/55">{sp.affiliation}</span>
              </div>

              {/* 略歴 */}
              <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                {sp.bio}
              </p>

              {/* SNS */}
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/5">
                <span className="text-[10px] tracking-widest uppercase text-white/35">
                  Social
                </span>
                <span className="text-xs font-mono text-white/70">
                  {sp.handle}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 補足 */}
          ※ 各登壇者の詳細プロフィールは、当日配布資料にも掲載しています。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
