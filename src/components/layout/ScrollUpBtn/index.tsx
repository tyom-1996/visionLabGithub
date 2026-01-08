'use client';
import styles from './styles.module.scss';
import ChevronIcon from './ChevronIcon';
import classNames from 'classnames';
import { useScrollUp } from '@/hooks/useScrollUp';
import { useLenis } from '@/context/LenisContext';

export const ScrollUpBtn = () => {
  const { visible } = useScrollUp(200);
  const lenisRef = useLenis();
  const lenis = lenisRef?.current?.lenis;

  const handleScrollTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
      console.log('lenis');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log('native');
    }
  };

  return (
    <div
      className={classNames(styles.container, { [styles.visible]: visible })}
    >
      <button
        className={classNames(styles.button, 'button-icon-to-right')}
        onClick={handleScrollTop}
        aria-label="Scroll to top"
      >
        <div className={styles.svgWrapper}>
          <ChevronIcon />
        </div>
      </button>
    </div>
  );
};
