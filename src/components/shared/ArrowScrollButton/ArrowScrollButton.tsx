'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/shared/Button';
import styles from './styles.module.scss';

const ArrowScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible &&
        <Button
          variant="white-black"
          className={styles.arrowBtn}
          svgId="arrow-right"
          onClick={scrollToTop}
        />
      }
    </>
  );
};

export default ArrowScrollButton;
