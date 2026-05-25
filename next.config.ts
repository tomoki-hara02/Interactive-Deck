import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 重量級ライブラリの named import を最適化（バンドルサイズ・初回ロード短縮）
  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/drei",
      "@react-three/fiber",
      "framer-motion",
      "@tsparticles/engine",
      "@tsparticles/react",
      "@tsparticles/slim",
    ],
  },
};

export default nextConfig;
