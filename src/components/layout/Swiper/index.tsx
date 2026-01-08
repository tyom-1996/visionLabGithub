'use client';

import 'swiper/css';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { Button } from '@/components/shared/Button';
import Sprite from '@/components/shared/Sprite';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import useWindowSize from '@/hooks/useWindowSize';
import { SWIPER_SPACE_BETWEEN } from '@/consts';
import { SwiperOptions } from 'swiper/types';
import classNames from 'classnames';
import styles from './styles.module.scss';
import stylesPage from '@/app/(main)/page.module.scss';
import useInViewport from '@/hooks/useInViewport';
import { textAnimationV2 } from '@/utils/helpers';

type Props<TCard, TCardProps> = {
  title?: string,
  titleLabel?: string,
  classNameTitleContainer?: string,
  classNameCardsSliderWrapper?: string,
  cardsList: TCard[],
  cardProps?: TCardProps,
  CardComponent: React.ComponentType<{ card: TCard; index: number } & TCardProps>,
  AdditionalElement?: React.ReactElement,
  breakpoints?: SwiperOptions['breakpoints'],
  swiperSpaceBetween?: number,
  loop?: boolean,
  navButtonClasses: { prevButtonClass: string, nextButtonClass: string },
  isHeadHide?: boolean,
  isNavButtonsHide?: boolean,
  isOnlyBottomButtons?: boolean,
  isBottomButtonsHide?: boolean,
  isBottomBtsWhiteBg?: boolean,
  isBottomBtsPaddingEnabled?: boolean,
  onSlideChange?: (el: SwiperClass) => void,
  variant?: 'storiesPreview' | 'scenarios',
  hasGrabCursor?: boolean,
}

const SwiperBlock = <TCard extends { id?: string | number }, TCardProps>(props: Props<TCard, TCardProps>) => {
  const {
    title, titleLabel, cardsList, cardProps = {}, CardComponent, isHeadHide, swiperSpaceBetween, loop, classNameTitleContainer,
    isNavButtonsHide, isOnlyBottomButtons, isBottomButtonsHide, navButtonClasses: { prevButtonClass, nextButtonClass },
    AdditionalElement, breakpoints, isBottomBtsWhiteBg, isBottomBtsPaddingEnabled = true, onSlideChange, classNameCardsSliderWrapper,
    variant, hasGrabCursor = true,
  } = props;
  const { isLessThanSM } = useWindowSize();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useInViewport({
    ref: titleRef,
    area: 0.75,
    callback: textAnimationV2,
  });

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
    if (loop) {
      setActiveCardIndex(swiper.realIndex);
    } else {
      setActiveCardIndex(swiper.activeIndex);
    }

    if (onSlideChange) {
      onSlideChange(swiper);
    }
  };

  return (
    <div className={classNames(styles.wrapper, {
      [styles.variantStoriesPreview]: variant === 'storiesPreview',
      [styles.variantScenarios]: variant === 'scenarios',
    })}>
      {!isHeadHide &&
        <div className={classNames(styles.sectionTitleContainer, classNameTitleContainer, { [styles.withLabel]: Boolean(titleLabel) })}>
          {titleLabel &&
            <div className={styles.sectionTitleLabelWrapper}>
              <p>{titleLabel}</p>
            </div>
          }
          <div className={styles.titleAndActions}>
            <h2 className={stylesPage.sectionTitle} ref={titleRef}>{title}</h2>
            {!isOnlyBottomButtons && !isNavButtonsHide &&
              <div className={classNames(styles.sliderBtns, { [styles.hideBtns]: isLessThanSM })}>
                <Button variant="transparent-black" svgId="arrow-right" className={classNames('swiper-arrow-left', prevButtonClass, styles.arrowLeft)} />
                <Button variant="transparent-black" svgId="arrow-right" className={classNames('swiper-arrow-right', nextButtonClass, styles.arrowRight)} />
              </div>
            }
          </div>
        </div>
      }
      <div className={classNames(styles.cardsSliderWrapper, classNameCardsSliderWrapper)}>
        {AdditionalElement &&
          AdditionalElement
        }
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${prevButtonClass}`,
            nextEl: `.${nextButtonClass}`,
          }}
          spaceBetween={spaceBetween}
          grabCursor={hasGrabCursor}
          loop={loop}
          breakpoints={breakpoints || defaultBreakpoints}
          onSlideChange={handleSlideChange}
        >
          {cardsList && cardsList.length > 0 &&
            cardsList.map((cardData, index) =>
              <SwiperSlide key={`${cardData?.id}${index}`}>
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
      {!isBottomButtonsHide && (isOnlyBottomButtons || isLessThanSM) &&
        <div className={classNames(styles.bottomSliderBtns, {
          [styles.whiteBg]: isBottomBtsWhiteBg,
          [styles.padding]: isBottomBtsPaddingEnabled,
        })}>
          {cardsList.map((cardData, index) => (
            <Sprite
              key={`${cardData?.id}${index}`}
              svgId='filled-square'
              className={classNames({ [styles.active]: index === activeCardIndex })}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default withErrorBoundary(SwiperBlock) as typeof SwiperBlock;
