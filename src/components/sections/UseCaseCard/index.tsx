'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { RoutePath } from '@/consts/routes';
import { ApiUrl } from '@/consts/apiUrl';
import { UseCaseType } from '@/types/components/useCases';
import styles from './styles.module.scss';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';
import { cleanHTML } from '@/utils/helpers';

const UseCaseCard = ({ card, lottieFile }: { card: UseCaseType, lottieFile: unknown }) => {
  const router = useRouter();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const onCardClick = () => {
    if (card?.href) {
      router.push(`${RoutePath.MAIN}${card.href}`);
      return;
    }

    if (card?.code) {
      router.push(`${RoutePath.USE_CASES}/${card.code}`);
    }
  };

  return (
    <div
      className={styles.useCaseWrapper}
      role="link"
      tabIndex={0}
      onClick={onCardClick}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      <p className={styles.useCaseTitle}>{card.name}</p>
      <div className={styles.useCaseImageContainer}>
        {
          !card.lottie_file &&
          <div className={styles.useCaseImageWrapper}>
            {card.image_svg &&
              <Image
                src={ApiUrl.MAIN + card.image_svg}
                width={200}
                height={200}
                alt={card.name}
              />
            }
          </div>
        }
        {
          card.lottie_file &&
          <Lottie
            lottieRef={lottieRef}
            animationData={lottieFile}
            loop={false}
            autoplay={false}
            height={200}
            width={200}
          />
        }
      </div>
      <div className={styles.useCaseDescription}><p dangerouslySetInnerHTML={{ __html: cleanHTML(card.description) }}/></div>
    </div>
  );
};

export default withErrorBoundary(UseCaseCard);
