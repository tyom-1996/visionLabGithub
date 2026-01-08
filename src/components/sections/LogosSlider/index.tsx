'use client';

import Image from 'next/image';
import SwiperBlock from '@/components/layout/Swiper';
import { SWIPER_SPACE_BETWEEN } from '@/consts';
import styles from './styles.module.scss';
import { LogosCardType } from './types';
import { AboutUsPageDataType } from '@/types/components/aboutUs';
import { ApiUrl } from '@/consts/apiUrl';
import Link from 'next/link';

const Card = ({ card }: { card: LogosCardType }) => {
  const inner = (
    <>
      <p className={styles.cardTitle}>{card.title}</p>
      <div className={styles.cardImage}>
        <Image
          src={ApiUrl.MAIN + card.image}
          width={200}
          height={200}
          alt={card.title}
        />
      </div>
      <p className={styles.cardYear}>{card.year}</p>
    </>
  );

  return (
    <>
      {card.url &&
        <Link href={card.url} className={styles.card} target="_blank">
          {inner}
        </Link>
      }
      {!card.url &&
        <div className={styles.card}>
          {inner}
        </div>
      }
    </>
  );
};

const LogosSlider = ({ awards }: { awards: AboutUsPageDataType['awards'] }) => {
  return (
    <div className={styles.wrapper}>
      {awards.length > 0 &&
        <SwiperBlock
          cardsList={awards}
          CardComponent={Card}
          navButtonClasses={{
            prevButtonClass: styles.prevLogosSwiperBtn,
            nextButtonClass: styles.nextLogosSwiperBtn,
          }}
          swiperSpaceBetween={SWIPER_SPACE_BETWEEN.MIN}
          isBottomBtsWhiteBg
        />
      }
    </div>
  );
};

export default LogosSlider;
