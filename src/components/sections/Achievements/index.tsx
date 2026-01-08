'use client';

import useWindowSize from '@/hooks/useWindowSize';
import styles from './styles.module.scss';
import SwiperBlock from '@/components/layout/Swiper';
import { useState } from 'react';
import useInViewport from '@/hooks/useInViewport';
import classNames from 'classnames';
import Lottie from 'lottie-react';
import useArrayRef from '@/hooks/useArrayRef';
import { AchievementType } from '@/types/components/achievements';
import { cleanHTML } from '@/utils/helpers';

const SwiperCard = ({ cardText, lottie }: {cardText: string, lottie: unknown}) => {
  return (
    <div className={styles.swiperCard}>
      <div className={styles.cardImgWrapper}>
        <Lottie animationData={lottie} loop={true} height={200} width={200} />
      </div>
      <p dangerouslySetInnerHTML={{ __html: cleanHTML(cardText) }}/>
    </div>
  );
};

const AchievementsDesktop = ({ achievementsList }: { achievementsList: AchievementType[] }) => {
  const achievementsLength = achievementsList.length;
  const [isAchievementsAnimated, setAchievementsAnimated] = useState<(boolean | null)[]>(Array(achievementsLength).fill(null));
  const [itemsRef, setItemRef] = useArrayRef<HTMLElement>();

  useInViewport({
    ref: itemsRef,
    area: 0.7,
    callback: (el) => {
      setAchievementsAnimated((prevData) => {
        prevData[itemsRef.current.indexOf(el)] = true;

        const isPenultimateElement = itemsRef.current.indexOf(el) === itemsRef.current.length - 2;
        if (isPenultimateElement) {
          prevData[itemsRef.current.indexOf(el) + 1] = true;
        }

        return prevData;
      });
    },
    once: true,
  });

  return (
    <div className={styles.cardsList}>
      {achievementsList.map((achievement, index) =>
        <div key={achievement.id}
          className={classNames(styles.card, { [styles.hidden]: !isAchievementsAnimated[index] })}
          ref={setItemRef(index)}
        >
          <div className={styles.cardImgWrapper}>
            <Lottie animationData={achievement.parsedLottieFile} height={320} width={320} loop={true} />
          </div>
          <p dangerouslySetInnerHTML={{ __html: cleanHTML(achievement.text) }}/>
        </div>
      )}
    </div>
  );
};

const AchievementsMobile = ({ achievementsList }: { achievementsList: AchievementType[] }) => {
  return (
    <SwiperBlock
      cardsList={achievementsList}
      CardComponent={({ card, index }) => <SwiperCard cardText={card.text} lottie={achievementsList[index].parsedLottieFile} />}
      isHeadHide
      navButtonClasses={{
        prevButtonClass: styles.prevSwiperBtn,
        nextButtonClass: styles.nextSwiperBtn,
      }}
    />
  );
};

const Achievements = ({ achivements = [] }: { achivements?: AchievementType[] }) => {
  const { isLessThanSM } = useWindowSize();

  return (
    <div className={styles.wrapper}>
      {!isLessThanSM &&
        <AchievementsDesktop achievementsList={achivements}/>
      }
      {isLessThanSM &&
        <AchievementsMobile achievementsList={achivements}/>
      }
    </div>
  );
};

export default Achievements;
