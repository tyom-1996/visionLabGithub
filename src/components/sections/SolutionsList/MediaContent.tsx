'use client';

import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { ApiUrl } from '@/consts/apiUrl';
import { RoutePath } from '@/consts/routes';
import { MAX_WIDTH_PAGE_CONTENT } from '@/consts';
import { SolutionType } from '@/types/components/solutions';
import styles from './styles.module.scss';
import useInViewport from '@/hooks/useInViewport';
import { useRef } from 'react';

const MediaContent = ({ solution }: { solution: SolutionType}) => {
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
      className={styles.solutionImageWrapper}
    >
      <Button href={`${RoutePath.SOLUTIONS}/${solution.code}`} className={styles.solutionImageBtn}>
        {!solution?.logo_video && solution.preview_picture &&
          <Image
            itemProp="contentUrl"
            src={ApiUrl.MAIN + solution.preview_picture}
            alt={solution.alt}
            title={solution.title}
            height={374}
            width={MAX_WIDTH_PAGE_CONTENT}
            quality={100}
            className={styles.solutionImage}
          />
        }
        {
          solution?.logo_video &&
          <video src={ApiUrl.MAIN + solution.logo_video} playsInline muted ref={videoRef} className={styles.solutionVideo}>
            Your browser does not support the video tag.
          </video>
        }
      </Button>
      <Button
        variant="primary"
        svgId="arrow-right"
        className={`${styles.solutionMoreBtn} button-icon-to-right`}
        href={`${RoutePath.SOLUTIONS}/${solution.code}`}
        animatedText
      >
        Learn&nbsp;more
      </Button>
    </div>
  );
};

export default withErrorBoundary(MediaContent);
