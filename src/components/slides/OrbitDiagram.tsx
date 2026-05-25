'use client';

import { motion } from 'framer-motion';
import SlideWrapper from '../SlideWrapper';

type Satellite = {
  label: string;
  startDeg: number;
  size: number;
};

type Orbit = {
  radius: number;       // px in reference stage (STAGE_REF)
  color: string;        // ring + dot accent color
  tiltX: number;        // degrees — 軌道面の前後傾き
  tiltY: number;        // degrees — 軌道面の左右ヨー
  duration: number;     // seconds for one revolution
  reverse?: boolean;
  satellites: Satellite[];
};

// TODO: 各軌道のラベル・色・傾きを書き換えてください
//   - tiltX / tiltY を別々にすると軌道同士が交差して見える（参考イメージのような構図）
const ORBITS: Orbit[] = [
  {
    radius: 130,
    color: '#c8a8ff',
    tiltX: 72,
    tiltY: 12,
    duration: 22,
    satellites: [
      { label: 'Item A1', startDeg: 0,   size: 18 },
      { label: 'Item A2', startDeg: 180, size: 13 },
    ],
  },
  {
    radius: 200,
    color: '#88bbff',
    tiltX: 18,
    tiltY: 52,
    duration: 38,
    reverse: true,
    satellites: [
      { label: 'Item B1', startDeg: 60,  size: 16 },
      { label: 'Item B2', startDeg: 220, size: 13 },
    ],
  },
  {
    radius: 270,
    color: '#ffaacc',
    tiltX: 58,
    tiltY: -28,
    duration: 56,
    satellites: [
      { label: 'Item C1', startDeg: 30,  size: 17 },
      { label: 'Item C2', startDeg: 200, size: 12 },
    ],
  },
];

// 基準ステージサイズ（px）。CSS では min(88vh, 98vw, N) でこれ以下に収縮させる。
const STAGE_REF = 960;

// ドットから「外向き」にラベルを離すピクセル距離
const LABEL_OFFSET_PX = 44;

export default function OrbitDiagram() {
  return (
    <SlideWrapper>
      <motion.div
        className="flex flex-col items-center gap-2 md:gap-3 w-full max-h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-1 text-center shrink-0">
          <span className="text-[10px] tracking-[0.22em] uppercase text-white/30">
            System Diagram
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {/* TODO: 中心を巡る図のタイトル */}
            すべてが中心を巡る
          </h2>
        </div>

        {/* 3D ステージ — perspective を持つ立体空間 */}
        <div
          className="relative shrink-0"
          style={{
            // @ts-expect-error -- CSS custom property
            '--stage': `min(88vh, 98vw, ${STAGE_REF}px)`,
            width: 'var(--stage)',
            height: 'var(--stage)',
            perspective: 'calc(var(--stage) * 2.4)',
            perspectiveOrigin: '50% 40%',
            transformStyle: 'preserve-3d',
            overflow: 'visible',
          }}
        >
          {/* 各軌道は独立した3D方向を持つ。CSS transform 順は `rotateY rotateX`
              → 行列としては Ry * Rx。ラベル側はこれを逆順で打ち消す。 */}
          {ORBITS.map((orbit, oi) => {
            const radiusRatio = orbit.radius / STAGE_REF;
            const diameterRatio = (orbit.radius * 2) / STAGE_REF;
            const ringSizeExpr = `calc(var(--stage) * ${diameterRatio})`;
            const halfNegExpr = `calc(var(--stage) * ${diameterRatio} / -2)`;

            return (
              <div
                key={`orbit-${oi}`}
                className="absolute inset-0"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${orbit.tiltY}deg) rotateX(${orbit.tiltX}deg)`,
                }}
              >
                {/* Ring — 傾きにより楕円として描画される */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: ringSizeExpr,
                    height: ringSizeExpr,
                    marginLeft: halfNegExpr,
                    marginTop: halfNegExpr,
                    border: `1px solid ${orbit.color}30`,
                    boxShadow: `inset 0 0 30px ${orbit.color}10, 0 0 18px ${orbit.color}18`,
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 + oi * 0.1 }}
                />

                {/* この軌道に乗る衛星たち */}
                {orbit.satellites.map((s, i) => (
                  <motion.div
                    key={`${s.label}-${i}`}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                      transformStyle: 'preserve-3d',
                    }}
                    initial={{ rotate: s.startDeg, opacity: 0 }}
                    animate={{
                      rotate: s.startDeg + (orbit.reverse ? -360 : 360),
                      opacity: 1,
                    }}
                    transition={{
                      rotate: { duration: orbit.duration, repeat: Infinity, ease: 'linear' },
                      opacity: { duration: 0.6, delay: 0.3 + (oi * 2 + i) * 0.08, ease: 'easeOut' },
                    }}
                  >
                    {/* Dot — ガラス玉風にハイライト + グロー */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        left: `calc(var(--stage) * ${radiusRatio})`,
                        top: 0,
                        width: s.size,
                        height: s.size,
                        marginLeft: -s.size / 2,
                        marginTop: -s.size / 2,
                        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${orbit.color} 55%, ${orbit.color}aa 100%)`,
                        boxShadow: `0 0 ${s.size}px ${orbit.color}, 0 0 ${s.size * 2.4}px ${orbit.color}55`,
                      }}
                    />

                    {/* Label container — ドットからさらに外側 */}
                    <div
                      className="absolute"
                      style={{
                        left: `calc(var(--stage) * ${radiusRatio} + ${LABEL_OFFSET_PX}px)`,
                        top: 0,
                        transform: 'translate(-50%, -50%)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* テキストを常にカメラ向きへ：
                          親 ring の rotateX/rotateY と、衛星の rotateZ を全て打ち消す。
                          framer の transform 順 Rz * Rx * Ry に合わせ、逆値を渡す。 */}
                      <motion.div
                        style={{
                          originX: 0.5,
                          originY: 0.5,
                          transformStyle: 'preserve-3d',
                        }}
                        initial={{
                          rotate: -s.startDeg,
                          rotateX: -orbit.tiltX,
                          rotateY: -orbit.tiltY,
                        }}
                        animate={{
                          rotate: -s.startDeg + (orbit.reverse ? 360 : -360),
                          rotateX: -orbit.tiltX,
                          rotateY: -orbit.tiltY,
                        }}
                        transition={{
                          rotate: { duration: orbit.duration, repeat: Infinity, ease: 'linear' },
                        }}
                      >
                        <span
                          className="inline-block whitespace-nowrap px-2 py-0.5 rounded-md text-[11px] font-medium tracking-wide text-white/85 border border-white/[0.08]"
                          style={{
                            background: 'rgba(10, 10, 15, 0.7)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          {s.label}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })}

          {/* Center halo — 3軌道色を混ぜた柔らかな光（紫・青・ピンク） */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
            style={{
              width: 'calc(var(--stage) * 0.55)',
              height: 'calc(var(--stage) * 0.55)',
              background:
                'radial-gradient(circle, rgba(200,168,255,0.35) 0%, rgba(136,187,255,0.25) 40%, rgba(255,170,204,0.2) 70%, transparent 100%)',
            }}
          />

          {/* Center sphere — 3軌道カラーを纏ったガラス球 */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.05,
              type: 'spring',
              stiffness: 150,
              damping: 18,
            }}
          >
            <div
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                /* ハイライト(白) → 紫 → 青 → ピンク → 深い暗部 */
                background:
                  'radial-gradient(circle at 33% 26%, rgba(255,255,255,0.92) 0%, rgba(200,168,255,0.85) 18%, rgba(136,187,255,0.7) 40%, rgba(255,170,204,0.55) 62%, rgba(30,10,50,0.92) 82%, rgba(8,4,18,1) 100%)',
                border: '1.5px solid rgba(200,168,255,0.5)',
                boxShadow: [
                  '0 0 80px rgba(200,168,255,0.45)',
                  '0 0 120px rgba(136,187,255,0.3)',
                  '0 0 60px rgba(255,170,204,0.25)',
                  '0 24px 56px rgba(0,0,0,0.65)',
                  'inset -10px -14px 36px rgba(0,0,0,0.5)',
                  'inset 8px 10px 28px rgba(200,168,255,0.45)',
                  'inset -4px 12px 24px rgba(136,187,255,0.25)',
                ].join(', '),
              }}
            >
              {/* 上部ハイライト（鏡面反射） */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '7%',
                  left: '18%',
                  width: '42%',
                  height: '24%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)',
                  filter: 'blur(2px)',
                }}
              />
              {/* 左上にうっすら紫の二次ハイライト */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '18%',
                  left: '10%',
                  width: '28%',
                  height: '18%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(200,168,255,0.6) 0%, transparent 75%)',
                  filter: 'blur(3px)',
                }}
              />
              {/* 下端リム光（ピンク寄り） */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: '5%',
                  left: '50%',
                  width: '65%',
                  height: '12%',
                  transform: 'translateX(-50%)',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(255,170,204,0.5) 0%, transparent 75%)',
                  filter: 'blur(4px)',
                }}
              />
              {/* TODO: 中心ハブのラベル */}
              <span className="relative z-10 text-white font-bold tracking-tight text-lg drop-shadow-lg">
                Core
              </span>
            </div>
            <span className="mt-3 text-[10px] tracking-[0.32em] text-white/50 uppercase">
              {/* TODO: 中心ハブのサブラベル */}
              Center
            </span>
          </motion.div>
        </div>
      </motion.div>
    </SlideWrapper>
  );
}
