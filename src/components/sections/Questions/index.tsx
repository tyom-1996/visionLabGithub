import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import QuestionsButton from './Button';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { QUESTIONS_BLOCK_TEXT } from '@/consts';
import type { CSSProperties } from 'react';

type Props = {
  variantPaddingTop: 'lg' | 'md' | 'md-zero' | 'sx' | 'zero' | 'zero-offset',
  title?: string,
  description?: string,
  buttonText?: string,
  btnHref?: string,
  style?: CSSProperties,
}

const Questions = ({
  variantPaddingTop,
  title,
  description,
  buttonText,
  btnHref,
  style,
}: Props) => {
  const { DEFAULT_TITLE, DEFAULT_DESCRIPTION } = QUESTIONS_BLOCK_TEXT;

  return (
    <div className={classNames(styles.wrapper, styles[variantPaddingTop])} style={style}>
      {variantPaddingTop !== 'zero-offset' &&
        <div className={styles.decorationBlock} />
      }
      <div className={styles.content}>
        <div className={classNames(styles.blueBackground, { [styles.upperSpace]: variantPaddingTop === 'zero-offset' })} />
        <AdvancedTextBlock
          descriptionLabel={title || DEFAULT_TITLE}
          description={description || DEFAULT_DESCRIPTION}
          descriptionVariant="lg"
          isDecorateBlockShow
          isContrastText
          isSectionWrapperEnabled={false}
        />
        <QuestionsButton buttonText={buttonText} href={btnHref} />
      </div>
    </div>
  );
};

export default Questions;
