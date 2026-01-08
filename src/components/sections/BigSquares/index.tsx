'use client';

import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import Sprite from '@/components/shared/Sprite';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { cleanHTML, textAnimationV2 } from '@/utils/helpers';
import useInViewport from '@/hooks/useInViewport';
import useArrayRef from '@/hooks/useArrayRef';

type Props = {
  squaresList: {
    name: string,
    preview_text: string,
    is_big: boolean,
  }[],
  title?: string,
  titleLabel?: string,
  blockLabel?: string,
}

const BigSquares = ({ squaresList, title, titleLabel, blockLabel }: Props) => {
  const { bigSquares, smallSquares } = (() => {
    const smallSquaresList = squaresList.filter(square => !square.is_big);
    const bigSquaresList = squaresList.filter(square => square.is_big);
    const maxDisplayedBigSquares = 5; // Можно показывать только 5 больших квадратов

    return {
      bigSquares: bigSquaresList.slice(0, maxDisplayedBigSquares),
      smallSquares: [...smallSquaresList, ...bigSquaresList.slice(maxDisplayedBigSquares)],
    };
  })();

  const [itemsRef, setItemRef] = useArrayRef<HTMLElement>();

  useInViewport({
    ref: itemsRef,
    area: 0.75,
    callback: textAnimationV2,
  });

  const isBottomRowDisplace = bigSquares.length === 4 && smallSquares.length === 0;
  const SectionTag = title ? 'section' : 'div';
  const blockLabelText = blockLabel || 'Results Delivered';

  return (
    <SectionTag className={styles.wrapper}>
      {title &&
        <AdvancedTextBlock title={title} titleVariant="h2" titleLabel={titleLabel} />
      }
      <div className={classNames('section-wrapper', styles.allSquaresWrapper)}>
        <div className={styles.smallSquaresListContainer}>
          <p className={styles.label} dangerouslySetInnerHTML={{ __html: cleanHTML(blockLabelText) }}/>
          {smallSquares.length > 0 &&
            <div className={styles.smallSquaresList}>
              {smallSquares.map((squareData, index) => (
                <div key={squareData.name + index} className={styles.smallSquareWrapper}>
                  <Sprite svgId='filled-square' />
                  <p>
                    <span>{squareData.name}</span> {squareData.preview_text}
                  </p>
                </div>
              ))}
            </div>
          }
        </div>
        <div className={classNames(styles.bigSquaresList, { [styles.displaceBottomRow]: isBottomRowDisplace })}>
          {bigSquares.map((squareData, index) =>
            <div key={index + squareData.name} className={styles.bigSquareWrapper}>
              <p className={styles.bigSquareTitle} ref={setItemRef(index)}>{squareData.name}</p>
              <p className={styles.bigSquareDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(squareData.preview_text) }}/>
            </div>
          )}
        </div>
      </div>
    </SectionTag>
  );
};

export default withErrorBoundary(BigSquares);
