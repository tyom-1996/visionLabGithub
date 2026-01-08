'use client';

import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { ApiUrl } from '@/consts/apiUrl';
import { RoutePath } from '@/consts/routes';
import { MAX_WIDTH_PAGE_CONTENT } from '@/consts';
import { ProductType } from '@/types/components/product';
import styles from './styles.module.scss';
import useInViewport from '@/hooks/useInViewport';
import { useRef } from 'react';

const MediaContent = ({ product }: { product: ProductType}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  return (
    <div
      itemScope
      itemType="https://schema.org/ImageObject"
      className={styles.productImageWrapper}
    >
      <Button href={`${RoutePath.PRODUCTS}/${product.code}`} className={styles.productImageBtn}>
        {!product?.video_main_page_products && product.image &&
          <Image
            itemProp="contentUrl"
            src={ApiUrl.MAIN + product.image}
            alt={product.alt || ''}
            title={product.title || ''}
            height={442}
            width={MAX_WIDTH_PAGE_CONTENT}
            quality={100}
            className={styles.productImage}
          />
        }
        {
          product?.video_main_page_products &&
          <video src={ApiUrl.MAIN + product.video_main_page_products} playsInline muted ref={videoRef} className={styles.productVideo}>
            Your browser does not support the video tag.
          </video>
        }
      </Button>
      <Button
        variant="primary"
        svgId="arrow-right"
        className={`${styles.productMoreBtn} button-icon-to-right`}
        href={`${RoutePath.PRODUCTS}/${product.code}`}
        animatedText
      >
        Learn&nbsp;more
      </Button>
    </div>
  );
};

export default withErrorBoundary(MediaContent);
