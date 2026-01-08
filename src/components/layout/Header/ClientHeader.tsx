'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Navigation from './Navigation';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { RoutePath } from '@/consts/routes';
import { NavigationDataType } from '@/types/components/navigation';
import classNames from 'classnames';
import styles from './styles.module.scss';
import useTopMarker from '@/hooks/useTopMarker';
import useMenuVisibility from '@/hooks/useMenuVisibility';

const ClientHeader = ({ navigation }: {navigation: NavigationDataType[]}) => {
  const isOnTop = useTopMarker();
  const { isIntersecting, isVisible } = useMenuVisibility();
  const headerRef = useRef<HTMLDivElement | null>(null);

  const isScrolled = (!isOnTop && !isIntersecting) || isVisible;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelector('html')?.classList.add('is-loaded', 'is-loading');

    // убираем класс для запуска первых анимаций
    setTimeout(() => {
      document.querySelector('html')?.classList.remove('is-loading');
    }, 500);
  }, []);

  return (
    <header
      ref={headerRef}
      className={classNames(styles.header, {
        [styles.scrolled]: isScrolled,
        [styles.isIntersecting]: isIntersecting,
        [styles.isVisible]: isVisible,
      })}
    >
      <div className={styles.headerContent}>
        <Button href={RoutePath.MAIN}>
          <Image src="/content/logo/header-logo.svg" width={147} height={40} alt="VisionLabs" className={styles.logoImg} />
        </Button>
        <Navigation navigation={navigation || []} isScrolled={isScrolled} />
      </div>
    </header>
  );
};

export default withErrorBoundary(ClientHeader);
