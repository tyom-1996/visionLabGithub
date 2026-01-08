'use client';

import MediaAccordion from '@/components/shared/MediaAccordion';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { RoutePath } from '@/consts/routes';
import { SolutionType } from '@/types/components/solutions';
import classNames from 'classnames';
import styles from './styles.module.scss';
import stylesPage from '@/app/(main)/page.module.scss';
import { useRef } from 'react';
import useInViewport from '@/hooks/useInViewport';
import { textAnimationV2 } from '@/utils/helpers';

const SolutionsPreview = ({ solutions }: { solutions: SolutionType[] }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useInViewport({
    ref: titleRef,
    area: 0.75,
    callback: textAnimationV2,
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={classNames(stylesPage.sectionTitle, styles.sectionTitle)} ref={titleRef}>Industries</h2>
        <MediaAccordion
          elementsList={solutions}
          routePath={RoutePath.SOLUTIONS}
          isElementLabelShow
        />
      </div>
      <div className={styles.allSolutionsBtnWrapper}>
        <Button
          variant="white-primary-text"
          lottieIconId="dash-with-dots"
          className={styles.allSolutionsBtn}
          href={RoutePath.SOLUTIONS}
          animatedText
        >
          All Industries
        </Button>
      </div>
    </section>
  );
};

export default withErrorBoundary(SolutionsPreview);
