'use client';

import { ReactNode } from 'react';

interface SlideWrapperProps {
  children: ReactNode;
}

export default function SlideWrapper({ children }: SlideWrapperProps) {
  return (
    <div className="relative flex w-screen h-screen items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8">
        {children}
      </div>
    </div>
  );
}
