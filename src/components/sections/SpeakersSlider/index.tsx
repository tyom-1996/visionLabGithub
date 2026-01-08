'use client';

import Image from 'next/image';
import SwiperBlock from '@/components/layout/Swiper';
import { Button } from '@/components/shared/Button';
import classNames from 'classnames';
import styles from './styles.module.scss';
import LeftArrowIcon from '@/../public/content/icons/leftArrow';
import RightArrowIcon from '@/../public/content/icons/rightArrow';

type Speaker = {
  id: number | string;
  name: string;
  role: string;
  company: string;
  image: string;
};

const SpeakerCard = ({ card }: { card: Speaker }) => (
  <div className={styles.card}>
    <div className={styles.speakerImage}>
      <Image
        src={card.image}
        alt={card.name}
        title={card.name}
        width={225}
        height={225}
        className={styles.image}
      />
    </div>
    <div className={styles.cardBody}>
      <p className={styles.cardName}>{card.name}</p>
      <p className={styles.cardSub}>{card.role}</p>
      <p className={styles.cardCompany}>{card.company}</p>
    </div>
  </div>
);

const SpeakersSlider = ({ speakers }: { speakers: Speaker[] }) => (
  <section className={styles.section}>
    <div className={styles.label}>Спикеры</div>
    <div className={styles.sliderWrapper}>
      <SwiperBlock
        isHeadHide
        cardsList={speakers}
        CardComponent={SpeakerCard}
        navButtonClasses={{
          prevButtonClass: styles.prevBtn,
          nextButtonClass: styles.nextBtn,
        }}
        loop
        swiperSpaceBetween={0}
        breakpoints={{
          0: { slidesPerView: 1 },
          735: { slidesPerView: 2 },
        }}
        classNameCardsSliderWrapper={styles.cardsWrapper}
        AdditionalElement={
          <div className={styles.navBtns}>
            <Button variant="transparent-black" className={classNames(styles.navBtn, styles.prevBtn)}>
              <LeftArrowIcon />
            </Button>
            <Button variant="transparent-black" className={classNames(styles.navBtn, styles.nextBtn)}>
              <RightArrowIcon />
            </Button>
          </div>
        }
        isBottomButtonsHide
      />
    </div>
  </section>
);

export default SpeakersSlider;
