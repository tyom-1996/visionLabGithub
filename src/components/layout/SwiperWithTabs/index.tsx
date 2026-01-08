'use client';

import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { Button } from '@/components/shared/Button';
import Sprite from '@/components/shared/Sprite';
import useWindowSize from '@/hooks/useWindowSize';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { formatToTwoDigits } from '@/utils/helpers';
import { SWIPER_SPACE_BETWEEN } from '@/consts';
import { SwiperOptions } from 'swiper/types';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props<TCard, TCardProps> = {
  tabsList: string[],
  selectedTabName: string,
  handleTabClick: (tabName: string) => void,
  titleLabel?: string | number,
  cardsList: TCard[],
  cardProps?: TCardProps,
  CardComponent: React.ComponentType<{ card: TCard; index: number } & TCardProps>,
  breakpoints?: SwiperOptions['breakpoints'],
  swiperSpaceBetween?: number,
  navButtonClasses: { prevButtonClass: string, nextButtonClass: string },
};

const SwiperWithTabs = <TCard extends { id: string | number }, TCardProps>(props: Props<TCard, TCardProps>) => {
  const {
    tabsList, selectedTabName, handleTabClick, titleLabel,
    cardsList, cardProps = {}, CardComponent, swiperSpaceBetween, breakpoints,
    navButtonClasses: { prevButtonClass, nextButtonClass },
  } = props;
  const { isLessThanSM } = useWindowSize();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  const spaceBetween = (() => {
    if (swiperSpaceBetween !== undefined) {
      return swiperSpaceBetween;
    }
    return SWIPER_SPACE_BETWEEN.SX;
  })();

  const defaultBreakpoints: SwiperOptions['breakpoints'] = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveCardIndex(swiper.activeIndex);
  };

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(0);
      setActiveCardIndex(0);
    }
  }, [selectedTabName, swiperInstance]);

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.headerWithTabs, { [styles.withLabel]: Boolean(titleLabel) })}>
        <div className={styles.headerLabelWrapper}>
          {titleLabel &&
            <p>({formatToTwoDigits(+titleLabel)})</p>
          }
        </div>
        <div className={styles.headerTabsControls}>
          <div className={styles.headerTabsListWrapper}>
            {tabsList.map((tabName, index) =>
              <button
                key={tabName + index}
                className={classNames(styles.headerTabBtn, { [styles.selectedTabBtn]: tabName === selectedTabName })}
                onClick={() => handleTabClick(tabName)}
              >
                {tabName}
              </button>
            )}
          </div>
          <div className={classNames(styles.headerSliderBtns, { [styles.hideBtns]: isLessThanSM })}>
            <Button variant="transparent-black" svgId="arrow-right" className={classNames(prevButtonClass, styles.arrowLeft)} />
            <Button variant="transparent-black" svgId="arrow-right" className={classNames(nextButtonClass, styles.arrowRight)} />
          </div>
        </div>
      </div>
      <div className={styles.cardsSliderWrapper}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${prevButtonClass}`,
            nextEl: `.${nextButtonClass}`,
          }}
          spaceBetween={spaceBetween}
          grabCursor={true}
          loop={false}
          breakpoints={breakpoints || defaultBreakpoints}
          className={styles.cardsSwiper}
          onSlideChange={handleSlideChange}
          onSwiper={setSwiperInstance}
        >
          {cardsList && cardsList.length > 0 &&
            cardsList.map((cardData, index) =>
              <SwiperSlide key={cardData.id}>
                <ErrorBoundary>
                  <CardComponent
                    {...(cardProps as { card: TCard; index: number } & TCardProps)}
                    card={cardData}
                    index={index}
                  />
                </ErrorBoundary>
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
      {isLessThanSM &&
        <div className={classNames(styles.bottomSliderBts, styles.whiteBg, styles.padding)}>
          {cardsList.map((cardData, index) => (
            <Sprite
              key={`${cardData.id}${index}`}
              svgId='filled-square'
              className={classNames({ [styles.active]: index === activeCardIndex })}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default withErrorBoundary(SwiperWithTabs) as typeof SwiperWithTabs;
