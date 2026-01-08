'use client';

import Image from 'next/image';
import SwiperBlock from '@/components/layout/Swiper';
import { Button } from '@/components/shared/Button';
import { EventItem } from '@/app/events/data';
import styles from '@/app/events/[id]/page.module.scss';
import classNames from 'classnames';
import LeftArrowIcon from '../../../../public/content/icons/leftArrow';
import RightArrowIcon from '../../../../public/content/icons/rightArrow';
import AllVebinarsIcon from '../../../../public/content/icons/allVebinarsIcon';
import { RoutePath } from '@/consts/routes';

type Props = {
  events: EventItem[];
};

const OtherEventCard = ({ card }: { card: EventItem }) => (
  <div className={styles.otherCard}>
    <Image
      src={card.img}
      alt={card.title}
      title={card.title}
      fill
      sizes="33vw"
      className={styles.otherCardImage}
    />
    <div className={styles.otherCardOverlay}>
      <p className={styles.otherCardDate}>{card.date} / {card.time}</p>
      <h3 className={styles.otherCardTitle}>{card.title}</h3>
    </div>
  </div>
);

const OtherEvents = ({ events }: Props) => (
  <section className={styles.otherEventsSection}>
    <div className={styles.otherEventsHeader}>
        <h2 className={styles.otherEventsTitle}>Другие события</h2>
    </div>
   
    <SwiperBlock
      isHeadHide
      cardsList={events}
      CardComponent={OtherEventCard}
        navButtonClasses={{
        prevButtonClass: styles.prevBtnEvents,
        nextButtonClass: styles.nextBtnEvents,
      }}
      loop
      swiperSpaceBetween={0}
      breakpoints={{
        0: { slidesPerView: 1 },
        550: { slidesPerView: 2 },
        850: { slidesPerView: 3 },
      }}
      classNameCardsSliderWrapper={styles.otherEventsSlider}
        AdditionalElement={
            <div className={styles.navBtnsEvents}>
            <Button variant="transparent-black" className={classNames(styles.navBtnEvents, styles.prevBtnEvents)}>
                <LeftArrowIcon />
            </Button>
            <Button variant="transparent-black" className={classNames(styles.navBtnEvents, styles.nextBtnEvents)}>
                <RightArrowIcon />
            </Button>
            </div>
        }
      isBottomButtonsHide
    />
    <a href={RoutePath.EVENTS} className={styles.allWebinarsLink}>
       Все вебинары
       <AllVebinarsIcon />
    </a> 
  </section>
);

export default OtherEvents;


