'use client';

import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { RoutePath } from '@/consts/routes';
import { ProductType } from '@/types/components/product';
import classNames from 'classnames';
import styles from './styles.module.scss';
import stylesPage from '@/app/(main)/page.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { textAnimationV2 } from '@/utils/helpers';
import ProductsPreviewCard from './ProductsPreviewCard';
import useInViewport from '@/hooks/useInViewport';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProductsPreview = ({ products, titleLabel }: { products: ProductType[], titleLabel?: string }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const containerTitle = useRef<HTMLDivElement | null>(null);
  const titleText = useRef<HTMLDivElement | null>(null);

  if (products.length === 0) {
    return null;
  }

  useInViewport({
    ref: titleText,
    area: 0.7,
    callback: textAnimationV2,
  });

  useGSAP(() => {
    if (products.length === 1) {
      return;
    }

    setTimeout(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.gsapcard');
      const cardsLength = cards.length;
      const cardLast = cards[cardsLength - 1];
      const spacer = 24;

      if (cards.length === 0) {
        return;
      }

      cards.forEach((card, index) => {
        // Закрепление карточки
        ScrollTrigger.create({
          trigger: card,
          start: `top 200+=${spacer * index}`,
          endTrigger: cardLast,
          end: `bottom 200+=${spacer * (cardsLength - 1) + card.offsetHeight}`,
          pin: true,
          pinSpacing: false,
          id: `card-${index}`,
          invalidateOnRefresh: true,
        });
      });

      if (cards[2]) {
        gsap.fromTo(cards[1], {
          transformOrigin: 'top',
          scale: 1,
        }, {
          scrollTrigger: {
            trigger: cards[2],
            start: `top 200+=${spacer + (cards[1]?.offsetHeight ?? 0) / 2}`,
            endTrigger: cardLast,
            end: `bottom 200+=${spacer * (cardsLength - 1) + (cards[2]?.offsetHeight ?? 0)}`,
            scrub: true,
          },
          ease: 'none',
          scale: (cards[1].offsetWidth - 2 * spacer) / cards[1].offsetWidth,
          transformOrigin: 'top',
        });
      }

      gsap.fromTo(cards[0], {
        scale: 1,
      }, {
        scrollTrigger: {
          trigger: cards[1],
          start: `top 200+=${spacer + cards[0].offsetHeight / 2}`,
          endTrigger: cards[2],
          end: `top 200+=${spacer * 2}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
        ease: 'none',
        scale: (cards[0].offsetWidth - 4 * spacer) / cards[0].offsetWidth,
        transformOrigin: 'top',
      });

      ScrollTrigger.create({
        trigger: containerTitle.current,
        start: `top ${titleLabel ? '104' : '140'}`,
        endTrigger: cardLast,
        end: `bottom 200+=${spacer * (cardsLength - 1) + cardLast.offsetHeight}`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }, 500);
  }, { scope: container });

  return (
    <section className={styles.wrapper}>
      <div className={classNames({ [styles.withTitleLabel]: titleLabel })} ref={containerTitle}>
        {titleLabel &&
          <div className={styles.label}>{titleLabel}</div>
        }
        <h2 className={classNames(stylesPage.sectionTitle, styles.sectionTitle)} ref={titleText}>Our Products</h2>
      </div>
      <div className={styles.contentWrapper}>
        {products.length > 0 &&
          <div className={styles.cardsList} ref={container}>
            {products.slice(0, 3).map((product, index) =>
              <ProductsPreviewCard
                product={product}
                key={product.code + index}
                index={index}
              />
            )}
          </div>
        }
        <div className={styles.allProductsBtnWrapper}>
          <Button
            variant="white-primary-text"
            lottieIconId="dash-with-dots"
            href={RoutePath.PRODUCTS}
            animatedText
          >
            All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default withErrorBoundary(ProductsPreview);
