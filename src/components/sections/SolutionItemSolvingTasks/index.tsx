'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import SwiperWithTabs from '@/components/layout/SwiperWithTabs';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { SolutionSolvingTaskType, SolvingTaskChildType } from '@/types/components/solutions';
import styles from './styles.module.scss';
import { ApiUrl } from '@/consts/apiUrl';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { cleanHTML } from '@/utils/helpers';

type Props = {
  solvingTasks: SolutionSolvingTaskType,
  scrollTargetId: string,
  label: string,
};

const SolutionCard = ({ card }: { card: SolvingTaskChildType }) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div
      itemScope
      itemType="https://schema.org/ImageObject"
      className={styles.solutionCardWrapper}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      <p itemProp="name" className={styles.solutionCardTitle}>{card.name}</p>
      <div className={styles.solutionCardImageWrapper}>
        {
          !card.lottie_file && card.image &&
            <Image
              itemProp="contentUrl"
              src={ApiUrl.MAIN + card.image}
              alt={card.image_alt || ''}
              title={card.image_title}
              width={200}
              height={200}
            />
        }
        {
          card.lottie_file &&
            <Lottie
              lottieRef={lottieRef}
              animationData={card.parsedLottieFile}
              loop={false}
              autoplay={false}
              height={200}
              width={200}
            />
        }
      </div>
      <div itemProp="description" className={styles.solutionCardDescription}><p dangerouslySetInnerHTML={{ __html: cleanHTML(card.description) }}/></div>
    </div>
  );
};

const SolutionItemSolvingTasks = ({ solvingTasks, scrollTargetId, label }: Props) => {
  const [selectedTabName, setSelectedTabName] = useState(solvingTasks.list[0].name);
  const [selectedChildList, setSelectedChildList] = useState<SolvingTaskChildType[]>(solvingTasks.list[0].children);

  const handleTabClick = (tabName: string) => {
    setSelectedTabName(tabName);
    const finedChildList = solvingTasks.list.find(tabData => tabData.name === tabName)?.children;
    if (finedChildList) {
      setSelectedChildList(finedChildList);
    }
  };

  return (
    <section className={styles.wrapper} id={scrollTargetId}>
      <AdvancedTextBlock
        title="Tasks Solved"
        titleVariant="h2"
        description={solvingTasks.preview_text}
        descriptionVariant="lg"
        descriptionLabel={label}
      />
      <SwiperWithTabs
        tabsList={solvingTasks.list.map(listData => listData.name)}
        selectedTabName={selectedTabName}
        handleTabClick={handleTabClick}
        cardsList={selectedChildList}
        CardComponent={SolutionCard}
        swiperSpaceBetween={0}
        navButtonClasses={{
          prevButtonClass: styles.prevSwiperBtn,
          nextButtonClass: styles.nextSwiperBtn,
        }}
      />
    </section>
  );
};

export default withErrorBoundary(SolutionItemSolvingTasks);
