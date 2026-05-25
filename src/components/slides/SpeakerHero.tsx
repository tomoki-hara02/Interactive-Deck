'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SlideWrapper from '../SlideWrapper';

// 講師紹介スライド（固定コンテンツ）
//
// このスライドはセミナーごとに内容が変わらない「テンプレート固定スライド」。
// クローン先で書き換える想定がないため、原 智輝（tAiL. 法律事務所代表弁護士）
// の情報を直接埋め込んでいる。
//
// プレースホルダ版（gradient + イニシャル）に戻したい場合は `photo` を undefined にする。

type SpeakerPhoto = {
  /** public/ 配下の画像パス */
  src: string;
  alt: string;
  /** object-fit。胸像トリミングなら 'cover'、透過 PNG や全身なら 'contain' */
  fit?: 'cover' | 'contain';
};

const SPEAKER: {
  initials: string;
  photo?: SpeakerPhoto;
  name: string;
  nameEn: string;
  role: string;
  affiliation: string;
  bio: string;
  specialties: string[];
  career: { period: string; org: string; note: string }[];
  stats: { value: string; label: string; accent: string }[];
} = {
  initials: 'HT',
  photo: { src: '/07_profile2.png', alt: '原 智輝', fit: 'contain' },
  name: '原 智輝',
  nameEn: 'HARA Tomoki',
  role: '弁護士',
  affiliation: 'tAiL. 法律事務所',
  bio: '福岡市を拠点とする弁護士。生成AI法務・DX法務・企業法務を専門とし、企業法務歴9年超。2025年にtAiL. 法律事務所を設立。ChatGPT・Claude・Gemini等を自ら実装・活用するエンジニア弁護士。',
  specialties: ['生成AI法務', 'DX法務', '企業法務', '国際法務（ベトナム）'],
  career: [
    { period: '2025.7〜',     org: 'tAiL. 法律事務所',           note: '代表弁護士' },
    { period: '2020〜2025.7', org: '明倫国際法律事務所',          note: '企業法務・国際法務' },
    { period: '2018〜2019',   org: '弁護士法人一新総合法律事務所', note: '企業法務全般' },
    { period: '2017',         org: 'DIC株式会社',                note: 'インハウス法務' },
  ],
  stats: [
    { value: '9年超',  label: '企業法務歴',        accent: '#88bbff' },
    { value: '2025',  label: 'tAiL. 設立',        accent: '#c8a8ff' },
    { value: '3.17B', label: 'Cursor Tokens / 年', accent: '#4FACF7' },
    { value: '54643', label: '弁護士登録番号',      accent: '#ffaacc' },
  ],
};

export default function SpeakerHero() {
  return (
    <SlideWrapper>
      {/* 横 2 カラム：左＝写真、右＝情報 */}
      <div className="flex flex-row w-full max-w-6xl h-full items-stretch gap-10">

        {/* ─── 左：縦長フォトフレーム ─────────────────────────── */}
        <motion.div
          className="flex flex-col justify-center shrink-0"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <div
            className="relative w-56 rounded-3xl overflow-hidden"
            style={{
              aspectRatio: '3 / 4',
              boxShadow: '0 0 60px rgba(79,142,247,0.25)',
            }}
          >
            {SPEAKER.photo ? (
              <Image
                src={SPEAKER.photo.src}
                alt={SPEAKER.photo.alt}
                fill
                sizes="224px"
                className={
                  SPEAKER.photo.fit === 'contain'
                    ? 'object-contain object-center'
                    : 'object-cover object-center'
                }
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(160deg, #7B5EA7 0%, #4F8EF7 50%, #FF6B9D 100%)',
                }}
              >
                <span className="text-7xl font-bold text-white/95 tracking-tight select-none">
                  {SPEAKER.initials}
                </span>
              </div>
            )}

            {/* パルスリング */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-[#4F8EF7]/40 pointer-events-none"
              animate={{ scale: [1, 1.08], opacity: [0.5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* ─── 右：情報カラム ───────────────────────────────── */}
        <div className="flex flex-col justify-center gap-5 flex-1 min-w-0 py-4">

          {/* セクションラベル */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-6 h-px bg-white/30" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              Speaker · 講師紹介
            </span>
          </motion.div>

          {/* 名前 */}
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
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
            className="flex flex-wrap items-baseline gap-x-3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <span className="text-lg text-[#88bbff] font-medium">
              {SPEAKER.role}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-base text-white/70">
              {SPEAKER.affiliation}
            </span>
          </motion.div>

          {/* 略歴 */}
          <motion.p
            className="text-sm text-white/60 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {SPEAKER.bio}
          </motion.p>

          {/* 専門タグ */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {SPEAKER.specialties.map((s, i) => (
              <motion.span
                key={s}
                className="px-3 py-1 rounded-full text-xs border bg-white/[0.04] text-white/85"
                style={{ borderColor: 'rgba(79,142,247,0.4)' }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.6 + i * 0.05 }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          {/* 職歴タイムライン */}
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
              Career
            </span>
            {SPEAKER.career.map((item) => (
              <div key={item.org} className="flex items-start gap-3">
                <span className="text-[10px] text-white/30 font-mono whitespace-nowrap pt-0.5 w-24 shrink-0">
                  {item.period}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-white/80 font-medium">
                    {item.org}
                  </span>
                  <span className="text-[10px] text-white/40">{item.note}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* 数値スタッツ */}
          <motion.div
            className="grid grid-cols-4 gap-3 mt-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            {SPEAKER.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start gap-1 p-3 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <span
                  className="text-xl font-bold tabular-nums"
                  style={{
                    color: s.accent,
                    filter: `drop-shadow(0 0 10px ${s.accent}55)`,
                  }}
                >
                  {s.value}
                </span>
                <span className="text-[9px] tracking-widest uppercase text-white/40 leading-tight">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
