'use client';

import SwiperBlock from '@/components/layout/Swiper';
import { Button } from '@/components/shared/Button';
import NewsMediaCard from '@/components/sections/NewsMediaCard';
import { RoutePath } from '@/consts/routes';
import { NewsMediaPreviewType } from '@/types/components/newsMedia';
import styles from './styles.module.scss';

const Card = ({ card }: { card: NewsMediaPreviewType }) => {
  return <NewsMediaCard data={card} />;
};

const NewsMediaPreview = ({ newsMediaList }: { newsMediaList: NewsMediaPreviewType[] }) => {
  return (
    <section className={styles.wrapper}>
      {newsMediaList?.length > 0 &&
        <div className={styles.newsListWrapper}>
          <SwiperBlock
            title='News'
            cardsList={newsMediaList}
            CardComponent={Card}
            swiperSpaceBetween={0}
            classNameTitleContainer={styles.swiperTitleContainer}
            navButtonClasses={{
              prevButtonClass: styles.prevSwiperBtn,
              nextButtonClass: styles.nextSwiperBtn,
            }}
          />
        </div>
      }
      <div className={styles.allNewsBtnWrapper}>
        <Button
          variant="white-primary-text"
          lottieIconId="dash-with-dots"
          href={RoutePath.NEWS_MEDIA}
          animatedText
        >
          All news
        </Button>
      </div>
    </section>
  );
};

export default NewsMediaPreview;
