'use client';

import { ProductType } from '@/types/components/product';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Image from 'next/image';
import { ApiUrl } from '@/consts/apiUrl';
import { MAX_WIDTH_PAGE_CONTENT } from '@/consts';
import DualStyledText from '@/components/shared/DualStyledText';
import { Button } from '@/components/shared/Button';
import { RoutePath } from '@/consts/routes';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { useRef } from 'react';
import useInViewport from '@/hooks/useInViewport';
import { cleanHTML } from '@/utils/helpers';

const ProductsPreviewCard = ({ product, index }: { product: ProductType, index: number }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buttonWrapRef = useRef(null);

  // Запуск анимации для видео
  useInViewport({
    ref: videoRef,
    options: {
      threshold: [0, 0.7],
    },
    callback: (_, intersection) => {
      if (!videoRef.current) {
        return;
      }

      if (intersection < 0.3 && videoRef.current.currentTime !== 0) {
        videoRef.current.currentTime = 0;
      }

      if (intersection > 0.3 && videoRef.current.currentTime === 0) {
        videoRef.current.play();
      }
    },
  });
  const isButtonInViewport = useInViewport({ ref: buttonWrapRef, area: 0.5 });

  return (
    <div
      itemScope
      itemType="https://schema.org/ImageObject"
      className={classNames(styles.card, 'gsapcard')}
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className={styles.cardImage}>
        {
          !product?.logo_video && product.image &&
            <Image
              itemProp="contentUrl"
              src={product?.isUseMockImage ? product.image : ApiUrl.MAIN + product.image}
              width={MAX_WIDTH_PAGE_CONTENT}
              height={480}
              alt={product.alt}
              title={product.title}
              className={styles.cardImage}
            />
        }
        {
          product?.logo_video &&
          <video src={product?.isUseMockImage ? product.logo_video : ApiUrl.MAIN + product.logo_video} playsInline muted ref={videoRef} >
            Your browser does not support the video tag.
          </video>
        }
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardLogoWrapper}>
          {product.image_logo &&
            <Image
              src={product?.isUseMockImage ? product.image_logo : ApiUrl.MAIN + product.image_logo}
              alt={product?.alt_logo || ''}
              title={product.title_logo || ''}
              width={48}
              height={48}
            />
          }
          {product.name_logo &&
            <DualStyledText
              itemProp="name"
              name={product.name_logo}
              colorVariant="light"
              sizeVariant="lg"
            />
          }
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.cardTextWrapper}>
            <p itemProp="description" className={styles.cardText} dangerouslySetInnerHTML={{ __html: cleanHTML(product.preview_text) }}/>
          </div>
          <div className={classNames(styles.cardBtnWrapper, { [styles.visible]: isButtonInViewport })} ref={buttonWrapRef}>
            <Button
              className={`${styles.button} button-icon-to-right`}
              variant="primary"
              svgId="arrow-right"
              href={`${RoutePath.PRODUCTS}/${product.code}`}
              animatedText
            >
              Learn&nbsp;more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(ProductsPreviewCard);
