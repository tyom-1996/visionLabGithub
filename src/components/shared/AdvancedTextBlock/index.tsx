'use client';

import { cleanHTML, formatToTwoDigits, textAnimationV2 } from '@/utils/helpers';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';
import useInViewport from '@/hooks/useInViewport';

type Props = {
  title?: string,
  titleVariant?: 'h1' | 'h2' | 'h3',
  titleLabel?: number | string,
  description?: string,
  descriptionVariant?: 'lg' | 'md',
  descriptionLabel?: number | string,
  isLabelInParentheses?: boolean,
  isDecorateBlockShow?: boolean,
  isContrastText?: boolean,
  isSectionWrapperEnabled?: boolean,
}

const AdvancedTextBlock = (props: Props) => {
  const {
    title, titleVariant, titleLabel, description, descriptionVariant = '', descriptionLabel,
    isLabelInParentheses, isDecorateBlockShow, isContrastText, isSectionWrapperEnabled = true,
  } = props;
  const TitleTag = titleVariant || 'h2';
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isBlockAnimated = useInViewport({
    ref: wrapperRef,
    area: 0.85,
    options: { rootMargin: '200px 0px 0px 0px' },
  });

  const getLabelText = (label?: number | string) => {
    if (typeof label === 'number') {
      const countValue = formatToTwoDigits(label);
      return isLabelInParentheses ? `(${countValue})` : countValue;
    }
    return label;
  };

  useEffect(() => {
    if (isBlockAnimated && titleRef.current) {
      textAnimationV2(titleRef.current);
    }
  }, [isBlockAnimated]);

  return (
    <div className={classNames({
      'section-wrapper': isSectionWrapperEnabled,
      [styles.visible]: isBlockAnimated,
    }, styles.wrapper)} ref={wrapperRef}>
      {title && titleVariant &&
        <div className={classNames(styles.labelContainer, { [styles.withLabel]: Boolean(titleLabel) })}>
          {Boolean(titleLabel) &&
            <div className={styles.titleLabelWrapper}>
              <p className={styles.label}>{getLabelText(titleLabel)}</p>
            </div>
          }
          <TitleTag className={classNames(styles.title, styles[titleVariant])}>
            {title}
          </TitleTag>
        </div>
      }
      {description &&
        <div className={classNames(styles.wrapper, { [styles.contrast]: isContrastText })}>
          {isDecorateBlockShow &&
            <p className={styles.decorateBlock}>//</p>
          }
          <div className={classNames(styles.labelContainer, { [styles.withLabel]: Boolean(descriptionLabel) })}>
            {Boolean(descriptionLabel) &&
              <p className={styles.label} ref={titleRef}>{getLabelText(descriptionLabel)}</p>
            }
            <p
              className={classNames(styles.description, styles[descriptionVariant])}
              dangerouslySetInnerHTML={{ __html: cleanHTML(description) }}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default AdvancedTextBlock;
