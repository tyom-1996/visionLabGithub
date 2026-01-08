'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import FormModal from '@/components/shared/FormModal';
import useWindowSize from '@/hooks/useWindowSize';
import useToggle from '@/hooks/useToggle';
import { FORM_CATEGORY_TEXT } from '@/consts';
import styles from './styles.module.scss';

const ComputerVisionButtons = () => {
  const { isLessThanLG } = useWindowSize();
  const { isOpened: isModalOpened, open: openModal, close: closeModal } = useToggle();
  const [modalType, setModalType] = useState<string>();

  const handlePartnerClick = () => {
    setModalType(FORM_CATEGORY_TEXT.PARTNER);
    openModal();
  };
  const handleDemoClick = () => {
    setModalType(FORM_CATEGORY_TEXT.MORE);
    openModal();
  };

  return (
    <>
      <div className={styles.introBtns}>
        <Button
          variant={isLessThanLG ? 'white-primary-text' : 'transparent-white'}
          svgId="circle-with-point"
          svgClassName={styles.introBtnPartnerSvg}
          onClick={handlePartnerClick}
          className='button-icon-rotate'
          animatedText
        >
          Partner with us
        </Button>
        <Button
          variant="secondary"
          svgId="arrow-right"
          svgClassName={styles.introBtnDemoSvg}
          onClick={handleDemoClick}
          className='button-icon-to-right'
          animatedText
        >
          Learn&nbsp;more
        </Button>
      </div>
      {isModalOpened &&
        <FormModal onClose={closeModal} initialCategory={modalType} />
      }
    </>
  );
};

export default ComputerVisionButtons;
