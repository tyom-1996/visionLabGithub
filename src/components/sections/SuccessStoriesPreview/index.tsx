'use client';

import SwiperBlock from '@/components/layout/Swiper';
import SuccessStoryCard from '@/components/sections/SuccessStoryCard';
import { Button } from '@/components/shared/Button';
import { RoutePath } from '@/consts/routes';
import { SuccessStoryType } from '@/types/components/successStories';
import styles from './styles.module.scss';

type SuccessStoriesPreviewProps = {
  titleLabel: string,
  storiesList: SuccessStoryType[],
  isImageGrayscale?: boolean,
  btnText?: string,
}

type CardProps = {
  card: SuccessStoryType,
  index: number,
  isImageGrayscale?: boolean,
}

const Card = ({ card, index, isImageGrayscale }: CardProps) => {
  return <SuccessStoryCard story={card} index={index} isImageGrayscale={isImageGrayscale} variant={'storiesPreview'}/>;
};

const SuccessStoriesPreview = ({ titleLabel, storiesList, isImageGrayscale, btnText }: SuccessStoriesPreviewProps) => {
  const breakpoints = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 1 },
    1024: { slidesPerView: 2 },
  };

  if (storiesList.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <SwiperBlock
        title="Customers"
        titleLabel={titleLabel}
        classNameTitleContainer={styles.swiperTitleContainer}
        cardsList={storiesList}
        cardProps={{ isImageGrayscale }}
        CardComponent={Card}
        swiperSpaceBetween={0}
        navButtonClasses={{
          prevButtonClass: styles.prevSwiperBtn,
          nextButtonClass: styles.nextSwiperBtn,
        }}
        breakpoints={breakpoints}
        variant={'storiesPreview'}
      />
      <div className={styles.allStoriesBtnWrapper}>
        <Button
          variant="white-primary-text"
          lottieIconId="dash-with-dots"
          className={styles.allStoriesBtn}
          href={RoutePath.SUCCESS_STORIES}
          animatedText
        >
          {btnText || 'All Success stories'}
        </Button>
      </div>
    </div>
  );
};

export default SuccessStoriesPreview;
