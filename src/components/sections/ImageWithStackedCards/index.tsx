'use client';

import Image from 'next/image';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { UseMockImage } from '@/types/components';
import styles from './styles.module.scss';
import { ApiUrl } from '@/consts/apiUrl';
import { useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';
import dynamic from 'next/dynamic';

type Props = UseMockImage & {
  title: string,
  titleLabel: string | number,
  image?: string,
  imageAlt?: string,
  imageTitle?: string,
  content: React.ReactNode,
  lottiePath?: string,
  parsedLottieFile?: unknown,
}

const Lottie = dynamic(
  () => import('lottie-react'),
  { ssr: false }
);

const ImageWithStackedCards = (props: Props) => {
  const {
    title,
    titleLabel,
    image,
    imageAlt,
    imageTitle,
    content,
    isUseMockImage,
    lottiePath,
    parsedLottieFile,
  } = props;
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div className={styles.wrapper}>
      <AdvancedTextBlock title={title} titleVariant="h2" titleLabel={titleLabel} />
      <div className={styles.imageAndContent}>
        <div className={styles.imageWrapper}>
          {!lottiePath && image &&
            <div
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <Image
                itemProp="contentUrl"
                src={isUseMockImage ? image : ApiUrl.MAIN + image}
                alt={imageAlt || ''}
                title={imageTitle}
                width={200}
                height={200}
              />
              <meta itemProp="name" content={imageTitle} />
              <meta itemProp="description" content={imageAlt} />
            </div>
          }
          {
            lottiePath &&
              <div className={styles.lottieWrapper}>
                <Lottie
                  onMouseEnter={() => lottieRef.current?.play()}
                  onMouseLeave={() => lottieRef.current?.stop()}
                  animationData={parsedLottieFile}
                  lottieRef={lottieRef}
                  loop={false}
                  autoplay={false}
                  height={140}
                  width={140}
                />
              </div>
          }
        </div>
        <div className={styles.contentWrapper}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(ImageWithStackedCards);
