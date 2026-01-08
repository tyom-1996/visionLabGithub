'use client';

import Image from 'next/image';
import SwiperBlock from '@/components/layout/Swiper';
import useWindowSize from '@/hooks/useWindowSize';
import { splittingArrayIntoSubarrays } from '@/utils/helpers';
import { SWIPER_SPACE_BETWEEN } from '@/consts';
import { ApiUrl } from '@/consts/apiUrl';
import { ClientType } from '@/types/components/client';
import styles from './styles.module.scss';

type CardBlockType = {
  id: string,
  cardsList: ClientType[],
}

const Card = ({ card }: { card: ClientType }) => {
  return (
    <div itemScope itemType="https://schema.org/Organization">
      <div className={styles.card}>
        <div
          itemScope
          itemType="https://schema.org/ImageObject"
          className={styles.cardImageWrapper}
        >
          {card.logo &&
            <Image
              itemProp="contentUrl"
              src={card?.isUseMockImage ? card.logo : ApiUrl.MAIN + card.logo}
              width={72}
              height={72}
              alt={card.title || ''}
              title={card.title}
            />
          }
        </div>
        <p itemProp="name">{card.title}</p>
      </div>
    </div>
  );
};

const CardBlock = ({ card }: { card: CardBlockType }) => {
  return (
    <div className={styles.cardBlock}>
      {card.cardsList.map((card, index) =>
        <Card key={index + card.id} card={card} />
      )}
    </div>
  );
};

const OurClients = ({ clients, titleLabel }: { clients: ClientType[], titleLabel?: string }) => {
  const { isLessThanLG, isLessThanSM } = useWindowSize();

  const countCardsInBlock = isLessThanLG ? 3 : 2;
  const chunkedClientsList = splittingArrayIntoSubarrays(clients, countCardsInBlock);

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className="section-wrapper">
      <SwiperBlock
        title='Our Customers'
        titleLabel={titleLabel}
        cardsList={chunkedClientsList}
        CardComponent={CardBlock}
        swiperSpaceBetween={isLessThanSM ? SWIPER_SPACE_BETWEEN.MD : 0}
        isOnlyBottomButtons={isLessThanLG}
        navButtonClasses={{
          prevButtonClass: styles.prevSwiperBtn,
          nextButtonClass: styles.nextSwiperBtn,
        }}
        isBottomBtsPaddingEnabled={false}
        variant={'storiesPreview'}
      />
    </section>
  );
};

export default OurClients;
