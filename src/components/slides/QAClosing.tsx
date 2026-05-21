'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

export default function QAClosing() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Top dotted accent */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <span className="block w-12 h-px bg-white/20" />
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            End of Presentation
          </span>
          <span className="block w-12 h-px bg-white/20" />
        </motion.div>

        {/* Massive Q&A */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
        >
          <h1
            className="text-[10rem] md:text-[14rem] leading-none font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #c8a8ff 0%, #88bbff 45%, #ffaacc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 8px 40px rgba(79,142,247,0.35))',
            }}
          >
            Q&amp;A
          </h1>
          <p className="text-base text-white/55 tracking-wide max-w-lg leading-relaxed">
            {/* TODO: クロージングメッセージ */}
            ご質問・ディスカッションを歓迎します。<br />
            実務での課題を、一緒に考えましょう。
          </p>
        </motion.div>

        {/* Animated divider line */}
        <motion.div
          className="h-px w-72 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.8 }}
        />

        {/* Contact / handle row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.0 }}
        >
          {/* TODO: 連絡先 / SNS / Web を書き換え */}
          <ContactBlock label="Web"      value="example.com"        accent="#c8a8ff" />
          <ContactBlock label="Email"    value="hello@example.com"  accent="#88bbff" />
          <ContactBlock label="Twitter"  value="@your_handle"       accent="#ffaacc" />
        </motion.div>

        {/* Tiny "thank you" */}
        <motion.div
          className="flex items-center gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#7B5EA7] via-[#4F8EF7] to-[#FF6B9D]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/40">
            Thank You for Listening
          </span>
        </motion.div>
      </motion.div>
    </SlideWrapper>
  );
}

function ContactBlock({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2">
        <span className="w-1 h-1 rounded-full" style={{ background: accent }} />
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/40">
          {label}
        </span>
      </div>
      <span className="text-white/85 font-mono tracking-wide">{value}</span>
    </div>
  );
}
