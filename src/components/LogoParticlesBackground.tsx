'use client';

import { LogoParticlesScene } from './slides/LogoParticles';

/**
 * 全画面ロゴパーティクル背景レイヤー。
 *
 * - `<LogoParticles>` スライドと同じ Canvas シーンを `fixed inset-0` で配置する
 * - `DeckBackground` から `variant="logoParticles"` で呼ばれる
 *
 * 中央にロゴが粒子で形成される演出を、別のスライド（例: OfficeIntro）の
 * 背面に重ねたいときに使う。
 */
export default function LogoParticlesBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <LogoParticlesScene />
    </div>
  );
}
