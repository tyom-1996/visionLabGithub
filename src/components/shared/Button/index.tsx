'use client';

import { forwardRef, PropsWithChildren, RefObject, useRef } from 'react';
import Link from 'next/link';
import Sprite from '@/components/shared/Sprite/index';
import { ButtonProps } from './types';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { textAnimationV2 } from '@/utils/helpers';
import { LottieRefCurrentProps } from 'lottie-react';
import iconDashWithDots from './iconDashWithDots.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(
  () => import('lottie-react'),
  { ssr: false }
);

const LottieIcon = ({ iconId, lottieRef }: {iconId: string, lottieRef: RefObject<LottieRefCurrentProps>}) => {
  if (iconId === 'dash-with-dots') {
    return <Lottie animationData={iconDashWithDots} loop={false} autoplay={false} lottieRef={lottieRef} />;
  }
};

export const Button = forwardRef<HTMLAnchorElement & HTMLButtonElement, PropsWithChildren<ButtonProps>>(({
  children,
  variant,
  href,
  className: externalClassName,
  isDisabled,
  svgId,
  svgClassName,
  isSmallSize,
  animatedText,
  lottieIconId,
  ...props
}, ref) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const animatedTextRef = useRef<HTMLElement | null>(null);
  const classNamesList = classNames(
    styles.default,
    variant && styles[variant],
    externalClassName,
    {
      [styles.disabled]: isDisabled,
      [styles.smallSize]: isSmallSize,
    }
  );

  const handleHover = () => {
    if (animatedTextRef?.current) {
      textAnimationV2(animatedTextRef.current);
    }

    if (lottieIconId) {
      lottieRef.current?.play();
    }
  };

  const handleLeave = () => {
    if (animatedTextRef?.current) {
      textAnimationV2(animatedTextRef.current);
    }

    // Иконка лотти
    if (lottieIconId) {
      lottieRef.current?.stop();
    }
  };

  if (href === undefined) {
    return (
      <button
        className={classNamesList}
        disabled={isDisabled}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        {...props}
        ref={ref}
      >
        {animatedText
          ? <span ref={animatedTextRef}>{children}</span>
          : children
        }
        {svgId &&
          <span className={styles.svgWrapper}>
            <Sprite className={svgClassName} svgId={svgId} />
          </span>
        }
        {lottieIconId &&
          <span className={styles.svgWrapper}>
            <LottieIcon iconId={lottieIconId} lottieRef={lottieRef}/>
          </span>
        }
      </button>
    );
  }

  return (
    <Link
      className={classNamesList}
      href={href}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      {...props}
      ref={ref}
    >
      {animatedText
        ? <span ref={animatedTextRef}>{children}</span>
        : children
      }
      {svgId &&
        <span className={styles.svgWrapper}>
          <Sprite className={svgClassName} svgId={svgId} />
        </span>
      }
      {lottieIconId &&
        <span className={styles.svgWrapper}>
          <LottieIcon iconId={lottieIconId} lottieRef={lottieRef}/>
        </span>
      }
    </Link>
  );
});
