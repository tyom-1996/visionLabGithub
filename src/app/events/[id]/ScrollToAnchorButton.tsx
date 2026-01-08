'use client';

import { useCallback } from 'react';
import type { MouseEventHandler, ReactNode } from 'react';
import { Button } from '@/components/shared/Button';
import { useLenis } from '@/context/LenisContext';

type Props = {
  targetId: string;
  className?: string;
  children: ReactNode;
};

const ScrollToAnchorButton = ({ targetId, className, children }: Props) => {
  const lenisRef = useLenis();
  const lenis = lenisRef?.current?.lenis;

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      event.preventDefault();

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;

      if (lenis) {
        lenis.scrollTo(targetTop, { duration: 1 });
        return;
      }

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    },
    [lenis, targetId]
  );

  return (
    <Button
      variant="primary"
      className={className}
      href={`#${targetId}`}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default ScrollToAnchorButton;
