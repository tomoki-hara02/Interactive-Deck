export { default as DeckBackground } from './DeckBackground';
export type { DeckBackgroundProps, DeckBackgroundVariant } from './DeckBackground';

// 個別の背景コンポーネントも明示的に再 export しておくと、
// スライド内で `<ParticleMorphBackground />` を直接置きたいケースに対応できる。
export { default as ParticleMorphBackground } from '../ParticleMorphBackground';
export { default as ParticleBackground } from '../ParticleBackground';
export { default as EarthBackground } from '../EarthBackground';
