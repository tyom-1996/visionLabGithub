'use client';

import FormModal from '@/components/shared/FormModal';
import { Button } from '@/components/shared/Button';
import useToggle from '@/hooks/useToggle';
import { FORM_CATEGORY_TEXT } from '@/consts';
import styles from './styles.module.scss';
import useInViewport from '@/hooks/useInViewport';
import { useRef } from 'react';
import classNames from 'classnames';

const QuestionsButton = ({ buttonText, href }: { buttonText?: string, href?: string }) => {
  const { isOpened: isModalOpened, open: openModal, close: closeModal } = useToggle();
  const refSlider = useRef<HTMLDivElement | null>(null);
  const isBlockAnimated = useInViewport({ ref: refSlider, area: 0.65 });

  const btnProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick: openModal };

  return (
    <div ref={refSlider}>
      <Button
        variant="white-primary-text"
        svgId="arrow-right"
        className={classNames(
          styles.formBtn,
          { [styles.visible]: isBlockAnimated },
          'button-icon-to-right'
        )}
        animatedText
        {...btnProps}
      >
        {buttonText || 'Submit request'}
      </Button>
      {isModalOpened &&
        <FormModal onClose={closeModal} initialCategory={FORM_CATEGORY_TEXT.MORE} />
      }
    </div>
  );
};

export default QuestionsButton;
