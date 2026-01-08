'use client';

import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = {
  isLoading?: boolean,
  children: React.ReactNode,
  title: string,
  onClose: () => void,
  image?: ImageProps,
}

const Modal = ({ isLoading, children, title, onClose, image }: Props) => {
  const handleBodyClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  // Отключаем скролл страницы при открытии модалки, добавляя отступ для предотвращения скачков.
  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Устанавливаем CSS-переменную с шириной скроллбара
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);

    // Добавляем классы к <html> и <body>
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');

    return () => {
      // Убираем класс и CSS-переменную
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
      document.documentElement.style.removeProperty('--scrollbar-width');
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={classNames(styles.modalOverlay, { [styles.loading]: isLoading })} onClick={onClose}>
      {isLoading &&
        <div className={styles.loadingImgWrapper}>
          <Image src={'/content/icons/spinner.svg'} alt="" width={80} height={80} />
        </div>
      }
      {!isLoading &&
        <div className={styles.modalBody} onClick={handleBodyClick} data-lenis-prevent-wheel data-lenis-prevent-touch>
          {image &&
            <div className={styles.modalImageWrapper}>
              <Image {...image} />
            </div>
          }
          <div className={styles.modalTextContent}>
            <Button variant="transparent-primary-text" svgId="cross" className={styles.modalCloseBtn} onClick={onClose} />
            <p className={styles.titleWrapper}>{title}</p>
            <div className={styles.modalContent}>{children}</div>
          </div>
        </div>
      }
    </div>,
    document.body
  );
};

export default withErrorBoundary(Modal);
