'use client';

import { useEffect, useRef, useState } from 'react';
import FormModal from '@/components/shared/FormModal';
import SwiperBlock from '@/components/layout/Swiper';
import useToggle from '@/hooks/useToggle';
import useInViewport from '@/hooks/useInViewport';
import { SWIPER_SPACE_BETWEEN } from '@/consts';
import { ApiUrl } from '@/consts/apiUrl';
import { RoutePath } from '@/consts/routes';
import classNames from 'classnames';
import styles from './styles.module.scss';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UseCaseType } from '@/types/components/useCases';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { cleanHTML } from '@/utils/helpers';

type CardProps = {
  card: UseCaseType,
  index: number,
  hoveredCardIndex: number,
  changeHoveredIndex: (index: number | null) => void,
  openFormModal: () => void,
  cardWidth: number,
  useCasesListLength: number,
  isLastCardClickable: boolean,
  lastLottieFile?: unknown,
};

const Card = ({
  card,
  index,
  hoveredCardIndex,
  changeHoveredIndex,
  openFormModal,
  cardWidth,
  useCasesListLength,
  isLastCardClickable,
  lastLottieFile,
}: CardProps) => {
  const router = useRouter();
  const { isLessThanLG } = useWindowSize();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useInViewport({
    ref: videoRef,
    options: {
      threshold: [0, 0.7],
    },
    callback: (_, intersection) => {
      if (!videoRef.current) {
        return;
      }

      if (intersection < 0.3 && videoRef.current.currentTime !== 0) {
        videoRef.current.currentTime = 0;
      }

      if (intersection > 0.3 && videoRef.current.currentTime === 0) {
        videoRef.current.play();
      }
    },
  });

  const isLastCard = useCasesListLength === index + 1;
  const isLastCardWithLottie = Boolean(isLastCard && !card.logo_video && !card.image && card.lottie_file && lastLottieFile);
  const isHoveredCard = (() => {
    if (isLastCardClickable) {
      return index === hoveredCardIndex && !isLastCard;
    }
    return index === hoveredCardIndex;
  })();

  const writeCurrentIndex = () => {
    changeHoveredIndex(index);
  };

  const clearCurrentIndex = () => {
    changeHoveredIndex(-1);
  };

  const handleCardClick = () => {
    if (isLastCard) {
      openFormModal();
      return;
    }
    router.push(`${RoutePath.USE_CASES}/${card.code}`);
  };

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (isHoveredCard) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [isHoveredCard]);

  return (
    <div
      itemScope
      itemType="https://schema.org/ImageObject"
      className={classNames(styles.card, {
        [styles.hoveredCard]: isHoveredCard,
        [styles.lastCardWithLottie]: isLastCardWithLottie,
      })}
      onMouseEnter={isLastCardWithLottie ? () => lottieRef.current?.play() : writeCurrentIndex}
      onMouseLeave={isLastCardWithLottie ? () => lottieRef.current?.stop() : clearCurrentIndex}
      onClick={handleCardClick}
    >
      <div className={styles.cardBgImage}>
        {
          !card.logo_video && card.image && !isLastCardWithLottie &&
          <>
            {!isLessThanLG &&
              <Image
                itemProp="contentUrl"
                src={ApiUrl.MAIN + card.image}
                width={cardWidth}
                height={520}
                className={styles.cardBgImage}
                alt={card.image_alt || ''}
                title={card.image_title || ''}
              />
            }
            {isLessThanLG &&
              <Image
                itemProp="contentUrl"
                src={ApiUrl.MAIN + card.image}
                width={405}
                height={480}
                className={styles.cardBgImage}
                alt={card.image_alt || ''}
              />
            }
          </>
        }
        {
          card.logo_video &&
          <video src={ApiUrl.MAIN + card.logo_video} playsInline muted ref={videoRef} >
            Your browser does not support the video tag.
          </video>
        }
      </div>
      <p itemProp="name" className={styles.cardTitle} dangerouslySetInnerHTML={{ __html: cleanHTML(card.name) }}/>
      <div className={styles.cardSvgWrapper}>
        {isLastCardWithLottie && !isLessThanLG &&
          <Lottie
            lottieRef={lottieRef}
            animationData={lastLottieFile}
            loop={false}
            autoplay={false}
            height={200}
            width={200}
          />
        }
        {card.image_svg && (!isLastCardWithLottie || (isLastCardWithLottie && isLessThanLG)) &&
          <Image
            itemProp="contentUrl"
            src={ApiUrl.MAIN + card.image_svg}
            width={200}
            height={200}
            alt={card.image_alt || ''}
          />
        }
      </div>
      <div itemProp="description" className={styles.cardDescription}><p dangerouslySetInnerHTML={{ __html: cleanHTML(card.description) }}/></div>
    </div>
  );
};

const Scenarios = ({ useCases, isLastCardClickable = true, titleLabel, lastLottieFile }: { useCases: UseCaseType[], isLastCardClickable?: boolean, titleLabel?: string, lastLottieFile?: unknown }) => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(0);
  const { isOpened: isModalOpened, open: openModal, close: closeModal } = useToggle();
  const [sliderWidth, setSliderWidth] = useState(0);
  const refSlider = useRef<HTMLDivElement | null>(null);
  const isInViewport = useInViewport({
    ref: refSlider,
    area: 0.3,
    options: { rootMargin: '300px 0px 0px 0px' },
    once: true,
  });

  useEffect(() => {
    const handleResize = () => {
      setSliderWidth(refSlider?.current?.getBoundingClientRect().width ?? 0);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const changeHoveredIndex = (index: number | null) => {
    if (index === null) {
      setHoveredCardIndex(0);
      return;
    }

    setHoveredCardIndex(index);
  };

  return (
    <section className={classNames(styles.wrapper, { [styles.visible]: isInViewport })} ref={refSlider}>
      {useCases.length > 0 &&
        <SwiperBlock
          title='All Scenarios'
          titleLabel={titleLabel}
          variant={'scenarios'}
          cardsList={useCases}
          CardComponent={Card}
          cardProps={{
            hoveredCardIndex,
            changeHoveredIndex,
            openFormModal: openModal,
            cardWidth: sliderWidth / 3,
            useCasesListLength: useCases.length,
            isLastCardClickable,
            lastLottieFile,
          }}
          navButtonClasses={{
            prevButtonClass: styles.prevSwiperBtn,
            nextButtonClass: styles.nextSwiperBtn,
          }}
          swiperSpaceBetween={SWIPER_SPACE_BETWEEN.LG}
          isBottomBtsPaddingEnabled={false}
        />
      }
      {isModalOpened &&
        <FormModal onClose={closeModal} />
      }
    </section>
  );
};

export default Scenarios;
