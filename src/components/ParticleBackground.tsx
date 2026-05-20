'use client';

import { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';

async function particlesInit(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

function ParticlesCanvas() {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: { enable: true },
        },
        color: {
          value: ['#7B5EA7', '#4F8EF7', '#FF6B9D'],
        },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.8,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: '#7B5EA7',
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'bounce' },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          resize: { enable: true },
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed inset-0 z-0 w-full h-full"
    />
  );
}

export default function ParticleBackground() {
  return (
    <ParticlesProvider init={particlesInit}>
      <ParticlesCanvas />
    </ParticlesProvider>
  );
}
