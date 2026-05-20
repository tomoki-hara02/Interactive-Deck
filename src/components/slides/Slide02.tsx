'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

const features = [
  {
    icon: '⚖️',
    title: 'Contract Intelligence',
    description:
      'Automatically analyze and summarize complex legal documents in seconds with AI-powered precision.',
  },
  {
    icon: '🔍',
    title: 'Risk Detection',
    description:
      'Identify potential legal risks and compliance issues before they become costly problems.',
  },
  {
    icon: '🚀',
    title: '10× Faster Review',
    description:
      'Reduce manual review time dramatically so your legal team can focus on high-value strategy.',
  },
];

export default function Slide02() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-12 text-center w-full max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
          Why AI + Legal?
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
