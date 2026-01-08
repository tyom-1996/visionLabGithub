'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import FormModal from '@/components/shared/FormModal';
import { Button } from '@/components/shared/Button';
import useToggle from '@/hooks/useToggle';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { FORM_CATEGORY_TEXT, MAX_WIDTH_PAGE_CONTENT } from '@/consts';
import { ApiUrl } from '@/consts/apiUrl';
import classNames from 'classnames';
import styles from './styles.module.scss';
import useBlockIsVisible from '@/hooks/useBlockIsVisible';

type BtnDataType = {
  text: string,
  modalCategory?: string,
  svgId?: string,
  classNameBtn?: string,
  onClick?: () => void,
};

type Props = {
  imageData?: {
    src?: string,
    alt: string,
    title: string,
  },
  videoData?: {
    src?: string | null,
  },
  redBtnData?: BtnDataType,
  whiteBtnData?: BtnDataType,
};

const HeaderElements = (props: Props) => {
  const { imageData, videoData, redBtnData, whiteBtnData } = props;
  const { isOpened: isModalOpened, open: openModal, close: closeModal } = useToggle();
  const [modalType, setModalType] = useState<string>();
  const refSlider = useRef<HTMLDivElement | null>(null);
  const isBlockAnimated = useBlockIsVisible({ ref: refSlider, bottom: 0.25 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isVideoAnimated = useBlockIsVisible({ ref: videoRef, bottom: 0.7 });

  const btnCount = (redBtnData ? 1 : 0) + (whiteBtnData ? 1 : 0);
  const hasImage = Boolean(imageData && imageData.src);

  const handleBtnClick = (btnData: BtnDataType) => {
    const { modalCategory, onClick } = btnData;

    if (onClick) {
      onClick();
      return;
    }
    setModalType(modalCategory);
    openModal();
  };

  useEffect(() => {
    if (isVideoAnimated && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoAnimated]);

  return (
    <div className={styles.wrapper} data-menu-visibility>
      {!videoData?.src && imageData?.src &&
        <div itemScope itemType="https://schema.org/ImageObject">
          <Image
            itemProp="contentUrl"
            {...imageData}
            src={ApiUrl.MAIN + imageData.src}
            quality={100}
            height={480}
            width={MAX_WIDTH_PAGE_CONTENT}
            className={styles.image}
            alt={imageData.alt ?? ''}
          />
          <meta itemProp="name" content={imageData.title} />
          <meta itemProp="description" content={imageData.alt} />
        </div>
      }
      {videoData?.src &&
        <video src={ApiUrl.MAIN + videoData.src} playsInline muted ref={videoRef} className={styles.video} >
          Your browser does not support the video tag.
        </video>
      }
      <div
        className={classNames(styles.buttonsWrapper, {
          [styles.singleBtnNoImage]: btnCount === 1 && !hasImage,
          [styles.doubleBtnNoImage]: btnCount === 2 && !hasImage,
          [styles.buttonsOnImage]: hasImage,
        })}
        ref={refSlider}
      >
        {whiteBtnData &&
          <Button
            variant="white-primary-text"
            svgId={whiteBtnData?.svgId || 'circle-with-point'}
            className={classNames(
              styles.whiteBtnText,
              whiteBtnData.classNameBtn,
              {
                [styles.visible]: isBlockAnimated,
                'button-icon-rotate': (!whiteBtnData?.svgId || whiteBtnData?.svgId === 'circle-with-point'),
              }
            )}
            onClick={() => handleBtnClick(whiteBtnData)}
            animatedText
          >
            {whiteBtnData.text}
          </Button>
        }
        {redBtnData &&
          <Button
            variant="secondary"
            svgId={redBtnData?.svgId || 'arrow-right'}
            className={classNames(
              styles.redBtnText,
              redBtnData.classNameBtn,
              {
                [styles.visible]: isBlockAnimated,
                'button-icon-to-right': (!redBtnData?.svgId || redBtnData.svgId === 'arrow-right'),
              }
            )}
            onClick={() => handleBtnClick(redBtnData)}
            animatedText
          >
            {redBtnData.text}
          </Button>
        }
      </div>
      {isModalOpened &&
        <FormModal onClose={closeModal} initialCategory={modalType || FORM_CATEGORY_TEXT.DEMO} />
      }
    </div>
  );
};

export default withErrorBoundary(HeaderElements);
