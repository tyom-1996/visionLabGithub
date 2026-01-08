'use client';

import { useState } from 'react';
import NewsMediaCard from '@/components/sections/NewsMediaCard';
import { Button } from '@/components/shared/Button';
import useWindowSize from '@/hooks/useWindowSize';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { getNewsMediaData } from '@/api/newsMedia';
import { makeEvenLengthArray } from '@/utils/helpers';
import { NewsMediaListResponseType, NewsMediaPreviewType } from '@/types/components/newsMedia';
import classNames from 'classnames';
import stylesGeneral from '@/components/layout/GeneralWrapper/styles.module.scss';
import styles from './styles.module.scss';

const NewsMediaList = ({ newsMediaData }: { newsMediaData: NewsMediaListResponseType }) => {
  const [pageCount, setPageCount] = useState(1);
  const [newsMediaList, setNewsMediaDataList] = useState<Record<'full' | 'adapted', NewsMediaPreviewType[]>>({
    full: newsMediaData.data,
    adapted: makeEvenLengthArray(newsMediaData.data),
  });
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isFetchBlocked, setIsFetchBlocked] = useState(newsMediaData.is_last);
  const { isTablet } = useWindowSize();

  const getMoreNewsMedia = async () => {
    if (isFetchLoading || isFetchBlocked) {
      return;
    }
    setIsFetchLoading(true);
    const newPageCount = pageCount + 1;
    const response = await getNewsMediaData({ pageCount: newPageCount });

    if (!response) {
      return;
    }

    setNewsMediaDataList((prevList) => {
      const newFullList = [...prevList.full, ...response.data];
      return {
        full: newFullList,
        adapted: makeEvenLengthArray(newFullList),
      };
    });
    setPageCount(newPageCount);
    setIsFetchBlocked(response.is_last);
    setIsFetchLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={classNames(stylesGeneral.centerBorders, styles.newsMediaListWrapper)}>
        {(isTablet ? newsMediaList.adapted : newsMediaList.full).map((newsMediaItem, index) =>
          <div key={`${newsMediaItem.id}${index}`} className={styles.newsMediaItemWrapper}>
            <NewsMediaCard data={newsMediaItem} />
          </div>
        )}
      </div>
      {!isFetchBlocked &&
        <div className={styles.showMoreBtnWrapper}>
          <Button
            variant='white-primary-text'
            lottieIconId="dash-with-dots"
            onClick={getMoreNewsMedia}
            isDisabled={isFetchLoading}
            animatedText
          >
            Show more
          </Button>
        </div>
      }
    </div>
  );
};

export default withErrorBoundary(NewsMediaList);
