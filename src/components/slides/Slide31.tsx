'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: アーキテクチャ階層（上から下に積む）
//   name: レイヤー名
//   sub : 一言サマリ
//   tech: 代表的な技術スタック（最大 3〜4 個推奨）
//   accent: アクセントカラー
const LAYERS = [
  {
    name: 'Experience',
    sub: 'UI / Mobile / Voice',
    tech: ['React', 'iOS', 'Android'],
    accent: '#ffaacc',
  },
  {
    name: 'Orchestration',
    sub: 'API · Routing · Auth',
    tech: ['GraphQL', 'gRPC', 'OAuth 2.1'],
    accent: '#FF6B9D',
  },
  {
    name: 'Intelligence',
    sub: 'Models · Reasoning',
    tech: ['LLM', 'Vector DB', 'RAG'],
    accent: '#c8a8ff',
  },
  {
    name: 'Data Platform',
    sub: 'Storage · Streaming',
    tech: ['PostgreSQL', 'Kafka', 'S3'],
    accent: '#88bbff',
  },
  {
    name: 'Infrastructure',
    sub: 'Compute · Network · Observability',
    tech: ['K8s', 'CDN', 'OpenTelemetry'],
    accent: '#4F8EF7',
  },
];

export default function Slide31() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-8 md:gap-10 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex items-end justify-between gap-6 flex-wrap shrink-0">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {/* TODO: アーキ図のタイトル */}
              5 つのレイヤーで成り立つ
            </h2>
          </div>
          <span className="text-xs text-white/30">
            {/* TODO: 補足キャプション */}
            ※ 上ほどユーザーに近く、下ほど基盤層
          </span>
        </div>

        {/* レイヤースタック */}
        <div className="flex flex-col gap-3">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.name}
              className="relative flex items-center justify-between gap-4 p-4 md:p-5 rounded-xl border overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${layer.accent}1f 0%, ${layer.accent}08 60%, transparent 100%)`,
                borderColor: `${layer.accent}33`,
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              {/* 左端のアクセントストライプ */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: layer.accent,
                  boxShadow: `0 0 12px ${layer.accent}aa`,
                }}
              />

              {/* レイヤー番号 + 名前 */}
              <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0 pl-2">
                <span
                  className="text-xs font-mono tabular-nums w-8 shrink-0"
                  style={{ color: layer.accent }}
                >
                  L{i + 1}
                </span>

                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-base md:text-lg font-semibold text-white truncate">
                    {layer.name}
                  </span>
                  <span className="text-xs text-white/45 truncate">
                    {layer.sub}
                  </span>
                </div>
              </div>

              {/* 技術チップ */}
              <div className="hidden md:flex items-center gap-2 flex-wrap justify-end">
                {layer.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[10px] tracking-wider border"
                    style={{
                      color: layer.accent,
                      borderColor: `${layer.accent}55`,
                      background: `${layer.accent}10`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: アーキテクチャに関する補足説明 */}
          ※ レイヤー間は明確な API 契約で疎結合化し、独立して進化させます。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
