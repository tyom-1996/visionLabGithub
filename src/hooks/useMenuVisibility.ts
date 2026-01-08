'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const useMenuVisibility = () => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const intersectionBlock = document.querySelector('[data-menu-visibility]');

    if (!intersectionBlock) {
      setIsIntersecting(false);
      setIsVisible(false);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsIntersecting(entry.isIntersecting || entry.boundingClientRect.top > 0);
        setIsVisible(entry.boundingClientRect.top < 0);
      });
    }, {
      threshold: [0, 1],
      rootMargin: '56px 0px -100% 0px',
    });

    observer.observe(intersectionBlock);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return {
    isIntersecting,
    isVisible,
  };
};

export default useMenuVisibility;
