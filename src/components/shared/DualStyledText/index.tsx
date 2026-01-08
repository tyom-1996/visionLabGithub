'use client';

import withErrorBoundary from '@/hocs/withErrorBoundary';
import classNames from 'classnames';
import styles from './styles.module.scss';
import useInViewport from '@/hooks/useInViewport';
import { textAnimationV2 } from '@/utils/helpers';
import { useRef } from 'react';

type Props = {
  name: string,
  colorVariant: 'dark' | 'light',
  sizeVariant: 'lg' | 'md',
  tag?: 'h1',
  itemProp?: string,
};

const DualStyledText = ({ name, colorVariant, sizeVariant, tag, itemProp }: Props) => {
  const animatedText = useRef<HTMLDivElement | null>(null);

  useInViewport({
    ref: animatedText,
    area: 0.7,
    callback: textAnimationV2,
  });

  const Tag = tag || 'p';

  return (
    <Tag
      itemProp={itemProp}
      className={classNames(styles.textWrapper, styles[colorVariant], styles[sizeVariant])}
    >
      <span>{name.split(' ')[0]}</span>
      <span ref={animatedText}>{name.split(' ').slice(1).join(' ')}</span>
    </Tag>
  );
};

export default withErrorBoundary(DualStyledText);
