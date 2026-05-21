'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// 多列の機能比較マトリクス。
// 「us vs competitors」「プランごとの機能差」など、複数列での横断比較に便利。
// セル値 '✓' = 対応、'—' = 非対応、それ以外の文字列はバッジ表示（例: '部分'）

// TODO: 列名（左端は機能ラベル列、それ以降は比較対象）
const COLUMNS = ['機能', 'Us', 'Competitor A', 'Competitor B'];

// TODO: 行ごとに 3 列分の値を書き換え
const ROWS: { feature: string; values: string[] }[] = [
  { feature: 'リアルタイム連携',     values: ['✓', '—', '部分'] },
  { feature: 'マルチクラウド対応',   values: ['✓', '部分', '✓'] },
  { feature: 'SSO / SAML',          values: ['✓', '✓', '✓'] },
  { feature: 'カスタムワークフロー', values: ['✓', '部分', '—'] },
  { feature: '監査ログ',             values: ['✓', '✓', '部分'] },
  { feature: 'オンプレ対応',         values: ['✓', '—', '—'] },
  { feature: '日本語サポート',       values: ['✓', '—', '部分'] },
];

function Cell({ v, isUs }: { v: string; isUs: boolean }) {
  if (v === '✓') {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm"
        style={{
          background: isUs ? 'rgba(136,187,255,0.18)' : 'rgba(255,255,255,0.06)',
          color: isUs ? '#88bbff' : 'rgba(255,255,255,0.7)',
          border: `1px solid ${isUs ? 'rgba(136,187,255,0.55)' : 'rgba(255,255,255,0.15)'}`,
          boxShadow: isUs ? '0 0 12px rgba(136,187,255,0.35)' : undefined,
        }}
      >
        ✓
      </span>
    );
  }
  if (v === '—') {
    return <span className="text-white/30 text-lg">—</span>;
  }
  return (
    <span className="text-[11px] px-2 py-1 rounded-md border border-[#ffaacc55] text-[#ffaacc] bg-[#ffaacc11] whitespace-nowrap">
      {v}
    </span>
  );
}

export default function FeatureMatrix() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col gap-9 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 見出し */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Feature Matrix
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {/* TODO: 比較セクションのメイン見出し */}
            主要 {ROWS.length} 機能の比較
          </h2>
        </div>

        {/* 比較表 */}
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* ヘッダ行 */}
          <div
            className="grid items-center gap-2 px-4 md:px-6 py-3 border-b border-white/10 bg-white/[0.03]"
            style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}
          >
            {COLUMNS.map((col, i) => (
              <div
                key={col}
                className={`text-[11px] uppercase tracking-[0.18em] font-medium ${
                  i === 1 ? 'text-[#88bbff]' : 'text-white/45'
                } ${i === 0 ? '' : 'text-center'}`}
              >
                {col}
              </div>
            ))}
          </div>

          {/* データ行 */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              className="grid items-center gap-2 px-4 md:px-6 py-3 border-b border-white/5 last:border-b-0"
              style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.05 }}
            >
              <div className="text-sm text-white/75">{row.feature}</div>
              {row.values.map((v, j) => (
                <div key={j} className="flex justify-center">
                  <Cell v={v} isUs={j === 0} />
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* フッター */}
        <p className="text-xs text-white/30 tracking-wider">
          {/* TODO: 比較に関する補足 */}
          ※ 比較情報は 2026 年時点の公開情報に基づきます。各社最新の仕様もご確認ください。
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
