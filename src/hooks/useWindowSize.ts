import { parseBreakpoints } from '@/utils/helpers';
import { useState, useEffect } from 'react';

const parsedBreakpoints = parseBreakpoints();

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    windowWidth: 0,
    windowHeight: 0,
    isMoreThenLG: false,
    isLessThanLG: false,
    isLessThanSM: false,
    isTablet: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          isMoreThenLG: window.innerWidth >= parsedBreakpoints.lg,
          isLessThanLG: window.innerWidth < parsedBreakpoints.lg,
          isLessThanSM: window.innerWidth < parsedBreakpoints.sm,
          isTablet: window.innerWidth > parsedBreakpoints.sm && window.innerWidth < parsedBreakpoints.lg,
        });
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return windowSize;
};

export default useWindowSize;
