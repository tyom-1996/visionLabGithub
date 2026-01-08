'use client';

import ReactLenis, { LenisRef } from 'lenis/react';
import { useRef, useEffect, PropsWithChildren } from 'react';
import gsap from 'gsap';
import { checkTouchDevice } from '@/utils/helpers';
import { LenisContext } from '@/context/LenisContext';

const SmoothScroll = ({ children }: PropsWithChildren) => {
  const lenisRef = useRef<LenisRef | null>(null);
  const isMobile = checkTouchDevice();

  useEffect(() => {
    if (isMobile) {
      return;
    }

    function update(time: number) {
      const TIME_SINCE_TICKER_STARTED = time * 1000;

      lenisRef.current?.lenis?.raf(TIME_SINCE_TICKER_STARTED);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  // Tсли мобила то не включаем lenis
  if (isMobile) {
    return children;
  }

  return (
    <LenisContext.Provider value={lenisRef}>
      <ReactLenis
        root
        options={{
          autoRaf: false,
          syncTouch: true,
        }}
        ref={lenisRef}
      >
        {children}
      </ReactLenis>
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
