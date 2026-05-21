'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// 参考資料 / Further Reading リスト。
// 種別バッジ（BOOK / ARTICLE / VIDEO / TOOL）で視覚的に分類。

type Kind = 'book' | 'article' | 'video' | 'tool';

// TODO: 参考資料を書き換え
const RESOURCES: { kind: Kind; title: string; meta: string }[] = [
  { kind: 'book',    title: '書籍タイトル A',     meta: '著者名 · 出版社' },
  { kind: 'book',    title: '書籍タイトル B',     meta: '著者名 · 出版社' },
  { kind: 'article', title: '関連記事のタイトル', meta: 'media.example.com · 8 min read' },
  { kind: 'video',   title: '関連カンファレンス・トーク', meta: 'speaker · 18 min · YouTube' },
  { kind: 'tool',    title: '今日紹介したツール',  meta: 'tool.example.com' },
];

const KIND_META: Record<Kind, { label: string; color: string }> = {
  book:    { label: 'BOOK',    color: '#c8a8ff' },
  article: { label: 'ARTICLE', color: '#88bbff' },
  video:   { label: 'VIDEO',   color: '#ffaacc' },
  tool:    { label: 'TOOL',    color: '#FF6B9D' },
};

export default function FurtherReading() {
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
            Further Reading · Resources
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: メイン見出し */}
            さらに深掘りするための資料
          </h2>
        </div>

        {/* 資料リスト */}
        <div className="flex flex-col gap-2">
          {RESOURCES.map((r, i) => {
            const meta = KIND_META[r.kind];
            return (
              <motion.div
                key={i}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.06] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              >
                {/* 種別バッジ */}
                <div
                  className="shrink-0 w-16 text-[10px] tracking-widest uppercase text-center py-1 rounded-md border"
                  style={{
                    color: meta.color,
                    borderColor: `${meta.color}66`,
                    background: `${meta.color}11`,
                  }}
                >
                  {meta.label}
                </div>

                {/* タイトル + メタ */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-white truncate">
                    {r.title}
                  </p>
                  <p className="text-xs text-white/40 truncate font-mono">
                    {r.meta}
                  </p>
                </div>

                {/* 矢印 */}
                <span className="text-white/30 text-lg shrink-0">→</span>
              </motion.div>
            );
          })}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 補足 */}
          ※ リンク集は後日メール／専用ページで共有します。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
