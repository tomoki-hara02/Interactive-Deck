'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// 事務所紹介スライド（固定コンテンツ）
//
// このスライドはセミナーごとに内容が変わらない「テンプレート固定スライド」。
// クローン先で書き換える想定がないため、tAiL. 法律事務所の情報を直接埋め込んでいる。
// 背景には `slides.ts` で `background: 'logoParticles'` が指定されており、
// 中央の余白にロゴパーティクルが浮かぶ演出になる。

const OFFICE_INFO: { label: string; value: string }[] = [
  { label: '事務所名',     value: 'tAiL.法律事務所' },
  { label: '設立',         value: '2025年8月1日' },
  { label: '所属弁護士会', value: '福岡県弁護士会' },
  { label: '弁護士',       value: '原 智輝（登録番号 54643）' },
  { label: '所在地',       value: '〒810-0024 福岡市中央区桜坂1丁目3-14' },
  { label: '営業時間',     value: '平日 10:00〜17:00（土日祝は要相談）' },
  { label: '対応分野',     value: '生成AI・経営法務・一般法務 ほか' },
];

export default function OfficeIntro() {
  return (
    <SlideWrapper>
      {/* ロゴパーティクル背景は DeckBackground 経由で常駐 */}

      {/* 全体レイアウト：上ラベル ／ 中3カラム ／ 下補足 */}
      <div className="relative z-10 flex flex-col w-full h-full max-w-6xl mx-auto px-8 pointer-events-none">

        {/* 上部ラベル */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-12 mb-auto"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#7B5EA7]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-light">
              tAiL. 法律事務所について
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#FF6B9D]" />
          </div>
          <h2 className="text-xl font-light tracking-wider text-white/80">
            tAiL.法律事務所の<span className="font-bold text-white">紹介</span>
          </h2>
        </motion.div>

        {/* 中段：左テキスト ／ 中央ロゴ空間 ／ 右テキスト */}
        <div className="flex flex-row items-center justify-between gap-4 my-auto py-6">

          {/* 左：価値 1 */}
          <motion.div
            className="flex-1 flex flex-col items-end text-right gap-3 pr-4"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.7 }}
          >
            <p className="text-white/50 text-sm font-light tracking-widest uppercase">
              Value 01
            </p>
            <p className="text-white/70 text-lg font-light leading-relaxed tracking-wide">
              生成AIの力で
            </p>
            <p className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#2952D9] to-[#4FACF7] bg-clip-text text-transparent">
                事業の可能性を
                <br />広げられる
              </span>
            </p>
            <p className="text-white/60 text-lg font-light tracking-wide">こと。</p>
          </motion.div>

          {/* 中央：ロゴパーティクル背景が見える余白 */}
          <div className="w-64 shrink-0" />

          {/* 右：価値 2 */}
          <motion.div
            className="flex-1 flex flex-col items-start text-left gap-3 pl-4"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.9 }}
          >
            <p className="text-white/50 text-sm font-light tracking-widest uppercase">
              Value 02
            </p>
            <p className="text-white/70 text-lg font-light leading-relaxed tracking-wide">
              その過程で
            </p>
            <p className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#2952D9] to-[#4FACF7] bg-clip-text text-transparent">
                法的な不安を
                <br />感じなくていい
              </span>
            </p>
            <p className="text-white/60 text-lg font-light tracking-wide">こと。</p>
          </motion.div>
        </div>

        {/* 下部：締め＋事務所情報 */}
        <motion.div
          className="flex flex-col items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 1.1 }}
        >
          <p className="text-sm text-white/80 tracking-wide text-center">
            この<span className="text-white font-bold mx-1">2つの価値</span>を届けるのが、
            <span className="font-bold text-white mx-0.5">tAiL. 法律事務所</span>の
            <span className="font-bold text-white">原点</span>です。
          </p>

          <div className="w-full pt-3 border-t border-white/10">
            <p className="text-[9px] tracking-[0.35em] uppercase text-white/30 mb-2 text-center">
              Office Info
            </p>
            <div className="grid grid-cols-4 gap-x-6 gap-y-1.5">
              {OFFICE_INFO.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-[9px] tracking-widest uppercase text-white/25">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-white/55 leading-snug">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
