'use client';

import HeaderElements from '@/components/shared/HeaderElements';
import { SolutionDetailsType } from '@/types/components/solutions';
import { handleScrollToBlock } from '@/utils/helpers';
import styles from './styles.module.scss';

type Props = {
    solution: SolutionDetailsType,
    scrollTargetId: string,
};

const SolutionItemHeaderActions = ({ solution, scrollTargetId }: Props) => {
  const headerImageData = {
    src: solution.preview_picture,
    alt: solution.alt,
    title: solution.title,
  };
  const headerVideoData = {
    src: solution.logo_video,
  };

  const whiteBtnData = {
    text: 'Learn more',
    svgId: 'arrow-right',
    classNameBtn: `${styles.whiteBtn} button-icon-to-down-rotate-90`,
    onClick: () => {
      handleScrollToBlock({ blockId: scrollTargetId, isHeaderOffsetInclude: true });
    },
  };

  const redBtnData = {
    text: 'Get Started',
  };

  return (
    <HeaderElements
      imageData={headerImageData}
      videoData={headerVideoData}
      whiteBtnData={whiteBtnData}
      redBtnData={redBtnData}
    />
  );
};

export default SolutionItemHeaderActions;
