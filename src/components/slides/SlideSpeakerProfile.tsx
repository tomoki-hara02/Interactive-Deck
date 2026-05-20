'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// セミナーの「講師紹介」スライド（1 人版）。
// アバター + 名前 + 役職 + 経歴 + 専門 + SNS + 数値スタッツの非対称レイアウト。
// 写真を載せたい場合は、アバター部分を <Image src=... /> に差し替えると簡単。

// TODO: 講師情報を書き換え
const SPEAKER = {
  initials: 'YT',
  name: '山田 太郎',
  nameEn: 'YAMADA Taro',
  role: 'Chief Technology Officer',
  affiliation: 'Example Inc.',
  bio: '15 年以上にわたりプロダクト開発をリードし、複数のスタートアップで CTO を歴任。直近は AI ×プロダクトの領域で執筆・登壇を多く手がける。',
  specialties: ['AI / LLM', 'Product Design', 'Engineering Leadership', 'DX'],
  socials: [
    { key: 'X',      value: '@speaker_handle' },
    { key: 'Web',    value: 'speaker.example.com' },
    { key: 'GitHub', value: 'github.com/speaker' },
  ],
  stats: [
    { value: '15+',  label: 'Years exp.', accent: '#c8a8ff' },
    { value: '50+',  label: 'Talks',      accent: '#88bbff' },
    { value: '3',    label: 'Books',      accent: '#ffaacc' },
    { value: '10K+', label: 'Followers',  accent: '#FF6B9D' },
  ],
};

export default function SlideSpeakerProfile() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 md:gap-10 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 上部ラベル */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-px bg-white/30" />
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Speaker · 講師紹介
          </span>
        </div>

        {/* アバター + 情報 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* アバター */}
          <motion.div
            className="shrink-0 mx-auto md:mx-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative w-44 h-44 md:w-56 md:h-56">
              {/* グラデ円 / TODO: <Image> に差し替えて写真にしても OK */}
              <div
                className="absolute inset-0 rounded-3xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, #7B5EA7 0%, #4F8EF7 50%, #FF6B9D 100%)',
                  boxShadow: '0 0 60px rgba(79,142,247,0.30)',
                }}
              >
                <span className="text-6xl md:text-7xl font-bold text-white tracking-tight select-none">
                  {SPEAKER.initials}
                </span>
              </div>

              {/* パルスリング */}
              <motion.div
                className="absolute inset-0 rounded-3xl border border-white/30 pointer-events-none"
                animate={{ scale: [1, 1.12], opacity: [0.55, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </div>
          </motion.div>

          {/* 情報カラム */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">
            {/* 名前 */}
            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {SPEAKER.name}
              </h2>
              <p className="text-sm text-white/40 tracking-[0.22em]">
                {SPEAKER.nameEn}
              </p>
            </motion.div>

            {/* 役職・所属 */}
            <motion.div
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-lg md:text-xl text-[#88bbff] font-medium">
                {SPEAKER.role}
              </span>
              <span className="text-white/30">·</span>
              <span className="text-base md:text-lg text-white/70">
                {SPEAKER.affiliation}
              </span>
            </motion.div>

            {/* 略歴 */}
            <motion.p
              className="text-sm md:text-base text-white/65 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {SPEAKER.bio}
            </motion.p>

            {/* 専門領域 */}
            <motion.div
              className="flex flex-col gap-2 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
                Specialties
              </span>
              <div className="flex flex-wrap gap-2">
                {SPEAKER.specialties.map((s, i) => (
                  <motion.span
                    key={s}
                    className="px-3 py-1 rounded-full text-xs border bg-white/[0.04] text-white/85"
                    style={{ borderColor: 'rgba(200,168,255,0.45)' }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* SNS / Web */}
            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {SPEAKER.socials.map((s) => (
                <div key={s.key} className="flex items-baseline gap-2">
                  <span className="text-[10px] tracking-widest uppercase text-white/35">
                    {s.key}
                  </span>
                  <span className="text-sm font-mono text-white/80">
                    {s.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 数値スタッツ */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          {SPEAKER.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-start gap-1 p-4 rounded-xl bg-white/[0.04] border border-white/10"
            >
              <span
                className="text-2xl md:text-3xl font-bold tabular-nums"
                style={{
                  color: s.accent,
                  filter: `drop-shadow(0 0 12px ${s.accent}55)`,
                }}
              >
                {s.value}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-white/45">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}
