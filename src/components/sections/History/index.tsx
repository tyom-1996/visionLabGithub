'use client';

import classNames from 'classnames';
import styles from './styles.module.scss';
import SwiperBlock from '@/components/layout/Swiper';
import { SWIPER_SPACE_BETWEEN, WINDOW_SIZE } from '@/consts';
import Sprite from '@/components/shared/Sprite';
import SwiperClass from 'swiper';
import { useEffect, useRef, useState } from 'react';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { CompanyHistoryType } from '@/types/components/aboutUs';
import { cleanHTML } from '@/utils/helpers';

const FALLBACK_WIDTH = 100;
const WIDTH_RATIO = 0.333;

const Card = ({ card }: { card: CompanyHistoryType }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardYear}>{card.title}</div>
      <Sprite className={styles.marker} svgId='filled-square' />
    </div>
  );
};

const History = ({ stories }: { stories: CompanyHistoryType[] }) => {
  const [activeDescription, setActiveDescription] = useState(0);
  const yearsSliderRef = useRef<HTMLDivElement | null>(null);
  const breakpoints = {
    0: {
      slidesPerView: 1,
      slideToClickedSlide: true,
      initialSlide: 0,
    },
    1024: {
      slidesPerView: 1,
      slideToClickedSlide: true,
      allowTouchMove: false,
      initialSlide: 0,
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= WINDOW_SIZE.LG) {
        const parentElement = yearsSliderRef?.current?.closest('.section-wrapper') as HTMLElement | null;
        const parentWidth = (parentElement?.offsetWidth || FALLBACK_WIDTH) * WIDTH_RATIO;

        if (parentWidth) {
          document.documentElement.style.setProperty('--prev-year-width', `${parentWidth}px`);
        }
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleYearChange = (el: SwiperClass) => {
    setActiveDescription(el.activeIndex);
  };

  return (
    <div className={classNames('section-wrapper', styles.wrapper)}>
      {stories?.length > 0 &&
        <div className={styles.history}>
          <div
            className={styles.yearsSlider}
            ref={yearsSliderRef}
          >
            <SwiperBlock
              cardsList={stories}
              CardComponent={Card}
              navButtonClasses={{
                prevButtonClass: styles.prevHistorySwiper,
                nextButtonClass: styles.nextHistorySwiper,
              }}
              swiperSpaceBetween={SWIPER_SPACE_BETWEEN.MIN}
              isBottomBtsPaddingEnabled={false}
              breakpoints={breakpoints}
              onSlideChange={(el: SwiperClass) => handleYearChange(el)}
              isBottomButtonsHide
              hasGrabCursor={false}
            />
          </div>
          <div className={styles.yearDescription}>
            {
              stories.map((year, index) => (
                <div
                  className={classNames(styles.cardDescription, { [styles.cardDescriptionActive]: activeDescription === index })}
                  key={year.title + index}
                  dangerouslySetInnerHTML={{ __html: cleanHTML(year.description) }}
                />
              ))
            }
          </div>
        </div>
      }
    </div>
  );
};

export default withErrorBoundary(History);
