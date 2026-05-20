'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

type Satellite = {
  label: string;
  radius: number;
  duration: number;  // seconds for one full revolution
  startDeg: number;  // initial angular offset
  color: string;
  size: number;
  reverse?: boolean;
};

const SATELLITES: Satellite[] = [
  // Inner ring
  { label: 'Contracts',  radius: 120, duration: 22, startDeg: 0,   color: '#c8a8ff', size: 14 },
  { label: 'Cases',      radius: 120, duration: 22, startDeg: 180, color: '#c8a8ff', size: 10 },
  // Middle ring
  { label: 'Regulations', radius: 190, duration: 38, startDeg: 60,  color: '#88bbff', size: 12, reverse: true },
  { label: 'Policies',    radius: 190, duration: 38, startDeg: 220, color: '#88bbff', size: 10, reverse: true },
  // Outer ring
  { label: 'Compliance',  radius: 260, duration: 56, startDeg: 30,  color: '#ffaacc', size: 13 },
  { label: 'Disclosure',  radius: 260, duration: 56, startDeg: 200, color: '#ffaacc', size: 9 },
];

const RINGS = [120, 190, 260];

export default function Slide15() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-6 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            Orbit System
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            すべての情報が、AI の中心を巡る
          </h2>
        </div>

        {/* Orbit stage — satellite ラベルが外に出るので overflow-visible */}
        <div
          className="relative"
          style={{ width: 600, height: 600, overflow: 'visible' }}
        >
          {/* Rings */}
          {RINGS.map((r, i) => (
            <motion.div
              key={r}
              className="absolute top-1/2 left-1/2 rounded-full border border-white/10"
              style={{
                width: r * 2,
                height: r * 2,
                marginLeft: -r,
                marginTop: -r,
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
            />
          ))}

          {/* Glow halo behind center */}
          <div
            className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(79,142,247,0.45) 0%, transparent 70%)',
            }}
          />

          {/* Center hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05, type: 'spring', stiffness: 150, damping: 18 }}
          >
            <motion.div
              className="relative w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, #1c2a55 0%, #0b1228 80%)',
                border: '1.5px solid rgba(136,187,255,0.5)',
                boxShadow: '0 0 60px rgba(79,142,247,0.5), inset 0 0 30px rgba(136,187,255,0.2)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            >
              <span className="text-white font-bold tracking-tight text-lg">Orbit</span>
            </motion.div>
            <span className="mt-3 text-[10px] tracking-[0.32em] text-white/50 uppercase">
              AI Core
            </span>
          </motion.div>

          {/* Satellites */}
          {SATELLITES.map((s, i) => (
            <motion.div
              key={`${s.label}-${i}`}
              className="absolute top-1/2 left-1/2"
              style={{ originX: 0.5, originY: 0.5 }}
              initial={{ rotate: s.startDeg, opacity: 0 }}
              animate={{ rotate: s.startDeg + (s.reverse ? -360 : 360), opacity: 1 }}
              transition={{
                rotate: { duration: s.duration, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 0.6, delay: 0.3 + i * 0.1, ease: 'easeOut' },
              }}
            >
              {/* Translate outward then counter-rotate so label stays upright */}
              <div
                className="absolute"
                style={{ left: s.radius, top: 0, transform: 'translateY(-50%)' }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ rotate: s.reverse ? 360 : -360 }}
                  transition={{ duration: s.duration, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: s.size,
                      height: s.size,
                      background: s.color,
                      boxShadow: `0 0 ${s.size}px ${s.color}, 0 0 ${s.size * 2}px ${s.color}44`,
                    }}
                  />
                  <span className="text-[11px] font-medium tracking-wide text-white/70 whitespace-nowrap">
                    {s.label}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
