'use client';

import Image from 'next/image';
import SwiperBlock from '@/components/layout/Swiper';
import { MAX_WIDTH_PAGE_CONTENT, SWIPER_SPACE_BETWEEN } from '@/consts';
import { ApiUrl } from '@/consts/apiUrl';
import styles from './styles.module.scss';
import classNames from 'classnames';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { cleanHTML } from '@/utils/helpers';

type OpportunityItem = {
  id: string | number,
  name: string,
  description: string,
  label?: string,
  big_text?: string,
}

type Props = {
  title: string,
  titleLabel: string,
  opportunities: {
    image: string,
    alt: string,
    title: string,
    list: OpportunityItem[],
  },
}

const Card = ({ card }: { card: OpportunityItem }) => {
  const hasHover = card.big_text && card.label;

  return (
    <div className={classNames(styles.cardWrapper, { [styles.hasHover]: hasHover })}>
      <div className={styles.cardDetailsWrapper}>
        <div className={styles.cardDetails}>
          <p className={styles.cardLabel} dangerouslySetInnerHTML={{ __html: cleanHTML(card.label ?? '') }}/>
          <p className={styles.cardBigText}>{card.big_text}</p>
        </div>
      </div>
      <div className={styles.nameAndDescription}>
        <p className={styles.cardName} dangerouslySetInnerHTML={{ __html: cleanHTML(card.name) }}/>
        <p className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(card.description) }}/>
      </div>
    </div>
  );
};

const BlockImage = ({ opportunities }: { opportunities: Props['opportunities'] }) => {
  return (
    <div
      itemScope
      itemType="https://schema.org/ImageObject"
      className={styles.blockImageWrapper}
    >
      <Image
        src={ApiUrl.MAIN + opportunities.image}
        alt={opportunities.alt}
        title={opportunities.title}
        height={442}
        width={MAX_WIDTH_PAGE_CONTENT}
        quality={100}
        className={styles.blockImage}
      />
      <meta itemProp="name" content={opportunities.title} />
      <meta itemProp="description" content={opportunities.alt} />
    </div>
  );
};

const Opportunities = ({ title, titleLabel, opportunities }: Props) => {
  return (
    <div className={styles.wrapper}>
      <SwiperBlock
        title={title}
        titleLabel={titleLabel}
        classNameTitleContainer={styles.swiperTitleContainer}
        cardsList={opportunities.list}
        CardComponent={Card}
        loop={true}
        swiperSpaceBetween={SWIPER_SPACE_BETWEEN.MIN}
        navButtonClasses={{
          prevButtonClass: styles.prevSwiperBtn,
          nextButtonClass: styles.nextSwiperBtn,
        }}
        AdditionalElement={<BlockImage opportunities={opportunities} />}
        isBottomBtsWhiteBg
      />
    </div>
  );
};

export default withErrorBoundary(Opportunities);
