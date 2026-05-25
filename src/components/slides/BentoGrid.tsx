'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// Bento grid: 4 columns × 3 rows = 12 セル分のグリッド
// 各セルの col-span / row-span を変えると配置を自由に作れます。
// TODO: 各セルの内容を書き換え

export default function BentoGrid() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-6 md:gap-8 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex items-end justify-between gap-4 shrink-0">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              BentoGrid
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {/* TODO: 全体像セクションのタイトル */}
              プロダクトの全体像
            </h2>
          </div>
          <span className="text-xs text-white/30 hidden md:block">
            {/* TODO */} 2026 · Q1
          </span>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-4 grid-rows-3 gap-3 md:gap-4 w-full"
          style={{ height: 'min(60vh, 600px)' }}
        >
          {/* Cell 1: ヒーロー（2×2） */}
          <motion.div
            className="col-span-2 row-span-2 p-5 md:p-6 rounded-2xl border border-white/10 backdrop-blur-md flex flex-col justify-between overflow-hidden relative"
            style={{
              background:
                'linear-gradient(135deg, rgba(123,94,167,0.30) 0%, rgba(79,142,247,0.20) 100%)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative z-10">
              <span className="text-[10px] tracking-[0.24em] uppercase text-white/50">
                Highlight
              </span>
              <h3 className="mt-3 text-2xl md:text-4xl font-bold text-white leading-tight">
                {/* TODO: 一番伝えたい一言（2 行構成） */}
                次世代の体験を、
                <br /> いまここに。
              </h3>
            </div>
            <p className="relative z-10 text-xs md:text-sm text-white/55 leading-relaxed max-w-md">
              {/* TODO: ヒーローカードの説明 */}
              ベントーグリッドで重要メッセージを大きく置き、
              周辺で補足情報を散りばめる構成です。
            </p>
            <div
              className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, #FF6B9D55 0%, transparent 70%)',
              }}
            />
          </motion.div>

          {/* Cell 2: 数字 */}
          <motion.div
            className="col-span-1 row-span-1 p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
              Stat
            </span>
            <div className="flex items-end gap-1 leading-none">
              <span
                className="text-3xl md:text-4xl font-bold tabular-nums"
                style={{
                  color: '#88bbff',
                  filter: 'drop-shadow(0 0 10px #88bbff66)',
                }}
              >
                {/* TODO */} 42
              </span>
              <span className="text-base text-white/60 mb-1">K</span>
            </div>
            <span className="text-[11px] text-white/45">
              {/* TODO */} ユニットを示す説明
            </span>
          </motion.div>

          {/* Cell 3: アイコン+キーワード */}
          <motion.div
            className="col-span-1 row-span-1 p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-center items-center text-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-3xl">✦</div>
            <span className="text-xs text-white/65 tracking-wide">
              {/* TODO */} Keyword
            </span>
          </motion.div>

          {/* Cell 4: ミニトレンドグラフ（2×1） */}
          <motion.div
            className="col-span-2 row-span-1 p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
                Trend
              </span>
              <span className="text-xs text-[#88bbff]">↗ +18%</span>
            </div>
            <div className="flex items-end gap-1.5 h-12">
              {[18, 28, 22, 36, 42, 38, 52, 60].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(79,142,247,0.30), #88bbff)',
                    transformOrigin: 'bottom',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1, height: `${h}px` }}
                  transition={{
                    scaleY: { duration: 0.6, delay: 0.5 + i * 0.04 },
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Cell 5: インサイト */}
          <motion.div
            className="col-span-1 row-span-1 p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
              Insight
            </span>
            <p className="text-xs text-white/65 leading-relaxed">
              {/* TODO */} 短い補足ノートをここに入れます。
            </p>
          </motion.div>

          {/* Cell 6: プログレスバー */}
          <motion.div
            className="col-span-1 row-span-1 p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
              Progress
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-white/55">
                <span>{/* TODO */} 進捗</span>
                <span className="tabular-nums">68%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(to right, #c8a8ff, #88bbff)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Cell 7: CTA（2×1） */}
          <motion.div
            className="col-span-2 row-span-1 p-4 md:p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,107,157,0.18) 0%, rgba(123,94,167,0.18) 100%)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/45">
                CTA · Next
              </span>
              <p className="text-sm md:text-base text-white font-medium">
                {/* TODO */} 次のアクションを促す一文
              </p>
            </div>
            <div className="text-2xl text-white/80">→</div>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
