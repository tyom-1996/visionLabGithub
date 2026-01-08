'use client';

import withErrorBoundary from '@/hocs/withErrorBoundary';
import { UseMockImage } from '@/types/components';
import styles from './styles.module.scss';
import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import EventLink from './EventLink';

type WebinarItem = {
  id: number;
  date: string;
  time: string;
  title: string;
  img: string;
};

type Props = UseMockImage & {
  title: string,
  list: WebinarItem[],
}

const NewEventLink = (props: Props) => {
  const {
    title,
    list,
  } = props;

  const [itemsToShow, setItemsToShow] = useState(4);
  const showList = list.slice(0, itemsToShow);
  const handleShowMore = () => {
    setItemsToShow(prev => Math.min(prev + 4, list.length));
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.activeContent}>
        <div className={styles.titleWrapper}>
          <p className={styles.label}>{title}</p>
        </div>
        <div className={styles.eventsGrid}>
          {showList.map((item, i) => (
            <div key={i}>
              <EventLink event={item} />
            </div>
          ))}
          {showList.length < list.length && (
            <div className={styles.moreBtnWrapper}>
              <Button
                className={styles.moreBtn}
                variant="white-primary-text"
                lottieIconId="dash-with-dots"
                animatedText
                onClick={handleShowMore}
              >
                Загрузить еще
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default withErrorBoundary(NewEventLink);
