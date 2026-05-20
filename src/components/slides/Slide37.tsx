'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// ステータスダッシュボード風スライド。
// サービスごとの健康状態・uptime・p95 レイテンシ・直近のスパークラインを並べる。
// 信頼性 / SLA / 運用品質を訴求したい場面で便利。

type Status = 'healthy' | 'degraded' | 'down';

// TODO: サービスとサンプル値を書き換え
const SERVICES: {
  name: string;
  status: Status;
  uptime: number;
  latency: number; // 0 はバッチなど該当なし
  sparkline: number[];
}[] = [
  { name: 'API Gateway',     status: 'healthy',  uptime: 99.998, latency: 42,  sparkline: [4,5,5,4,5,6,5,4,5,4,5,5] },
  { name: 'Web App',         status: 'healthy',  uptime: 99.99,  latency: 88,  sparkline: [6,6,7,6,7,6,6,6,7,6,6,6] },
  { name: 'Search Index',    status: 'healthy',  uptime: 99.95,  latency: 120, sparkline: [5,6,7,8,9,7,6,5,6,7,8,7] },
  { name: 'AI Inference',    status: 'degraded', uptime: 99.5,   latency: 410, sparkline: [4,5,8,10,12,11,9,8,9,10,11,9] },
  { name: 'Background Jobs', status: 'healthy',  uptime: 99.97,  latency: 0,   sparkline: [3,4,4,3,4,5,4,3,4,3,4,4] },
  { name: 'Analytics',       status: 'healthy',  uptime: 99.99,  latency: 65,  sparkline: [5,5,6,5,6,5,5,6,5,5,6,5] },
];

const COLORS: Record<Status, string> = {
  healthy:  '#88bbff',
  degraded: '#ffaacc',
  down:     '#FF6B9D',
};
const LABELS: Record<Status, string> = {
  healthy:  'Healthy',
  degraded: 'Degraded',
  down:     'Down',
};

export default function Slide37() {
  const hasIncident = SERVICES.some((s) => s.status !== 'healthy');
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-10 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex items-end justify-between gap-4 flex-wrap shrink-0">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
              System Status
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {/* TODO: 全体の状態を端的に */}
              {hasIncident ? 'Minor incident in progress' : 'All systems nominal'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: hasIncident ? '#ffaacc' : '#88bbff' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-xs text-white/45 font-mono">Live · Last 24h</span>
          </div>
        </div>

        {/* サービスカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const c = COLORS[s.status];
            return (
              <motion.div
                key={s.name}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.06 }}
              >
                {/* ヘッダ */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: c, boxShadow: `0 0 8px ${c}` }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                    <span
                      className="text-[10px] tracking-widest uppercase"
                      style={{ color: c }}
                    >
                      {LABELS[s.status]}
                    </span>
                  </div>
                </div>

                {/* スパークライン */}
                <div className="flex items-end gap-0.5 h-9">
                  {s.sparkline.map((v, j) => (
                    <motion.div
                      key={j}
                      className="flex-1 rounded-sm"
                      style={{
                        background: `${c}aa`,
                        transformOrigin: 'bottom',
                        height: `${Math.max(2, v * 2.4)}px`,
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.35 + j * 0.025 + i * 0.04,
                      }}
                    />
                  ))}
                </div>

                {/* 数値 */}
                <div className="flex justify-between text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white/35">Uptime</span>
                    <span className="text-white tabular-nums">{s.uptime}%</span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-right">
                    <span className="text-white/35">p95 latency</span>
                    <span className="text-white tabular-nums">
                      {s.latency > 0 ? `${s.latency}ms` : '—'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: ダッシュボードに関する補足 */}
          ※ 数値はサンプルです。実運用では status ページの埋め込みや実データに差し替えてください。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
