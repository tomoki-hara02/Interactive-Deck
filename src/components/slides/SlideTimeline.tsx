'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

type Event = {
  year: string;
  title: string;
  desc: string;
  accent: string;
  highlight?: boolean;
};

// TODO: 6 つの年表イベントを書き換えてください
// highlight: true を付けたイベントには "Pivotal" バッジが付きます
const EVENTS: Event[] = [
  {
    year: '20XX',
    title: 'イベント 1',
    desc: '最も古い出来事の説明をここに',
    accent: '#88bbff',
  },
  {
    year: '20XX',
    title: 'イベント 2',
    desc: '2 つ目の出来事の説明',
    accent: '#88bbff',
  },
  {
    year: '20XX',
    title: 'イベント 3',
    desc: '3 つ目の出来事の説明',
    accent: '#c8a8ff',
  },
  {
    year: '20XX',
    title: 'イベント 4',
    desc: '4 つ目の出来事の説明',
    accent: '#c8a8ff',
  },
  {
    year: '20XX',
    title: 'イベント 5（重要）',
    desc: '転換点となる出来事',
    accent: '#ffaacc',
    highlight: true,
  },
  {
    year: '今日',
    title: 'イベント 6（現在地）',
    desc: '現在の到達点・今日のテーマ',
    accent: '#ffffff',
    highlight: true,
  },
];

export default function SlideTimeline() {
  const [active, setActive] = useState(EVENTS.length - 1);

  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col w-full max-w-5xl gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {/* TODO: 年表のタイトル */}
            これまでの歩み
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative w-full mt-6">
          {/* Base horizontal line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
          {/* Animated progress */}
          <motion.div
            className="absolute left-0 top-1/2 h-px bg-gradient-to-r from-[#7B5EA7] via-[#4F8EF7] to-[#FF6B9D]"
            initial={{ width: 0 }}
            animate={{ width: `${((active + 0.5) / EVENTS.length) * 100}%` }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          />

          <div className="grid grid-cols-6 gap-0">
            {EVENTS.map((ev, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(i);
                  }}
                  className="relative flex flex-col items-center group pt-3"
                >
                  {/* Node dot */}
                  <motion.div
                    className="relative w-3 h-3 rounded-full z-10"
                    animate={{
                      backgroundColor: isActive ? ev.accent : isPast ? '#4F8EF7' : 'rgba(255,255,255,0.25)',
                      scale: isActive ? 1.6 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: isActive ? `0 0 16px ${ev.accent}` : 'none',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${ev.accent}` }}
                        animate={{ scale: [1, 2.4], opacity: [0.8, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                  </motion.div>

                  {/* Year label */}
                  <span
                    className={`mt-4 text-xs font-mono transition-colors ${
                      isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                    }`}
                  >
                    {ev.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col gap-3 max-w-2xl"
        >
          <div className="flex items-baseline gap-3">
            <span
              className="text-6xl font-bold tracking-tight tabular-nums"
              style={{
                color: EVENTS[active].accent,
                filter: `drop-shadow(0 0 18px ${EVENTS[active].accent}55)`,
              }}
            >
              {EVENTS[active].year}
            </span>
            {EVENTS[active].highlight && (
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/40 border border-white/20 rounded-full px-2 py-0.5">
                Pivotal
              </span>
            )}
          </div>
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            {EVENTS[active].title}
          </h3>
          <p className="text-sm text-white/55 leading-relaxed">{EVENTS[active].desc}</p>
        </motion.div>

        <p className="text-xs text-white/30 tracking-wide">
          ノードをクリックして詳細を切替
        </p>
      </motion.div>
    </SlideWrapper>
  );
}
