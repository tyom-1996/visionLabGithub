'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { cleanHTML, formatToTwoDigits } from '@/utils/helpers';
import { ApiUrl } from '@/consts/apiUrl';
import { MAX_WIDTH_PAGE_CONTENT } from '@/consts';
import classNames from 'classnames';
import styles from './styles.module.scss';
import useInViewport from '@/hooks/useInViewport';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ElementType = {
  id: number,
  name: string,
  preview_text: string,
  preview_picture?: string,
  alt?: string,
  title?: string,
  code?: string,
  logo_video?: string | null,
};

type MediaAccordionProps = {
  elementsList: ElementType[],
  routePath?: string,
  isElementLabelShow?: boolean,
  isLongDescription?: boolean,
}

type AccordionItemProps = {
  index: number,
  element: ElementType,
  selectedIndexes: number[],
  changeSelectedIndex: (index: number) => void,
  routePath?: string,
  isElementLabelShow?: boolean,
  isLongDescription?: boolean,
};

const AccordionItem = (props: AccordionItemProps) => {
  const {
    index,
    element,
    selectedIndexes,
    changeSelectedIndex,
    routePath,
    isElementLabelShow,
    isLongDescription,
  } = props;
  const isOpened = selectedIndexes.some((selectIndex) => selectIndex === index);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
        // Запускаем анимацию с задержкой пока раскрывается аккордеон
        setTimeout(() => {
          videoRef.current?.play();
        }, 300);
      }
    },
  });

  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpened) {
      containerRef.current.style.height = containerRef.current.scrollHeight + 'px';
    } else {
      containerRef.current.style.height = '';
    }

    function handleResize() {
      if (!containerRef.current) return;

      if (isOpened) {
        containerRef.current.style.height = 'auto';
        containerRef.current.style.height = containerRef.current.scrollHeight + 'px';
      } else {
        containerRef.current.style.height = '';
      }
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpened]);

  useEffect(() => {
    const videoDom = videoRef.current;

    if (isOpened && videoDom) {
      videoDom.currentTime = 0;
      // Запускаем анимацию с задержкой пока раскрывается аккордеон
      setTimeout(() => {
        videoDom.play();
      }, 300);
    }
  }, [isOpened]);

  return (
    <div
      itemScope
      itemType="https://schema.org/Article"
      className={classNames(styles.elementWrapper, { [styles.open]: isOpened })}
      ref={containerRef}
    >
      <div className={classNames(styles.elementMainContent, 'gsapitem')}>
        {isElementLabelShow &&
          <p itemProp="position" className={styles.elementLabel}>
            {formatToTwoDigits(index + 1)}
          </p>
        }
        <div
          className={classNames(styles.elementTitleWrapper, {
            [styles.withoutLabel]: !isElementLabelShow,
            [styles.open]: isOpened,
          })}
          onClick={() => changeSelectedIndex(index)}
        >
          <p itemProp="headline" className={styles.elementTitle}>{element.name}</p>
          <Button
            variant="transparent-primary-text"
            svgId={isOpened ? 'minus' : 'plus'}
            isDisabled={!element.preview_text}
            className={styles.elementActionBtn}
          />
        </div>
      </div>
      <div className={classNames(styles.elementDetails, styles.disappearing)}>
        <div className={styles.elementDescriptionWrapper}>
          <p
            itemProp="description"
            className={classNames(styles.elementDescription, { [styles.long]: isLongDescription })}
            dangerouslySetInnerHTML={{ __html: cleanHTML(element.preview_text) }}
          />
        </div>
      </div>
      {(element.preview_picture || element?.logo_video) &&
        <div
          itemScope
          itemType="https://schema.org/ImageObject"
          className={classNames(styles.elementImageWrapper, styles.disappearing)}
        >
          <Button className={styles.elementImageBtn} href={`${routePath}/${element.code}`}>
            {
              !element?.logo_video && element.preview_picture &&
                <Image
                  itemProp="contentUrl"
                  src={ApiUrl.MAIN + element.preview_picture}
                  alt={element.alt || ''}
                  title={element.title}
                  height={480}
                  width={MAX_WIDTH_PAGE_CONTENT}
                  quality={100}
                  className={styles.elementImage}
                />
            }
            {
              element?.logo_video &&
              <video src={ApiUrl.MAIN + element.logo_video} playsInline muted ref={videoRef} >
                Your browser does not support the video tag.
              </video>
            }
          </Button>
          <Button
            variant="primary"
            svgId="arrow-right"
            className={`${styles.elementMoreBtn} button-icon-to-right`}
            href={`${routePath}/${element.code}`}
            animatedText
          >
            Learn&nbsp;more
          </Button>
        </div>
      }
    </div>
  );
};

const MediaAccordion = ({ elementsList, routePath, isElementLabelShow, isLongDescription }: MediaAccordionProps) => {
  const [selectedIndexes, setSelectedIndexes] = useState([0]);
  const container = useRef<HTMLDivElement | null>(null);

  const changeSelectedIndex = (index: number) => {
    setSelectedIndexes(prevIndexes => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter(selectIndex => selectIndex !== index);
      }
      return [...prevIndexes, index];
    });
  };

  // По завершении сворачивания/разворачивания обновляем анимацию gsap
  useEffect(() => {
    const UPDATE_TIMEOUT = 300;
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, UPDATE_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedIndexes]);

  useGSAP(() => {
    const accordionList = gsap.utils.toArray<HTMLElement>('.gsapitem');

    accordionList.forEach((accordionItem) => {
      gsap.fromTo(accordionItem, {
        opacity: 0,
        transform: 'translate(0, 20px)',
      }, {
        scrollTrigger: {
          trigger: accordionItem,
          start: 'bottom bottom',
          end: 'bottom bottom-=100',
          scrub: true,
        },
        ease: 'cubic-bezier(0.85, 0.09, 0.15, 0.91)',
        opacity: 1,
        transform: 'translate(0, 0)',
      });
    });
  }, { scope: container });

  return (
    <div className={styles.elementsList} ref={container}>
      {elementsList.map((element, index) =>
        <AccordionItem
          key={element.name + index}
          element={element}
          index={index}
          selectedIndexes={selectedIndexes}
          changeSelectedIndex={changeSelectedIndex}
          routePath={routePath}
          isElementLabelShow={isElementLabelShow}
          isLongDescription={isLongDescription}
        />
      )}
    </div>
  );
};

export default withErrorBoundary(MediaAccordion);
