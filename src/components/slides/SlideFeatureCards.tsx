'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

// TODO: 3 つの特徴・ベネフィットを書き換えてください
const features = [
  {
    icon: '✦',
    title: 'Feature One',
    description:
      '1 つ目の特徴の概要をここに記述します。読み手に最も伝えたい価値を 2 行程度で簡潔に。',
  },
  {
    icon: '◆',
    title: 'Feature Two',
    description:
      '2 つ目の特徴の概要をここに記述します。前のカードと並列に並ぶ「同じ階層」の価値を書きます。',
  },
  {
    icon: '●',
    title: 'Feature Three',
    description:
      '3 つ目の特徴の概要をここに記述します。最後のカードには定量的なインパクトを置くと印象的です。',
  },
];

export default function SlideFeatureCards() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-12 text-center w-full max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
          {/* TODO: セクションの問いかけ / メインメッセージ */}
          Why this matters?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: 0.2 + i * 0.1,
              }}
            >
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
