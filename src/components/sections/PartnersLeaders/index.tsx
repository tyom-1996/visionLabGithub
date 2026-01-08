'use client';

import { useState } from 'react';
import { getPartnersData } from '@/api/partners';
import SuccessStoryCard from '@/components/sections/SuccessStoryCard';
import { Button } from '@/components/shared/Button';
import { PartnersType } from '@/types/components/partners';
import styles from './styles.module.scss';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import classNames from 'classnames';

const PartnersLeaders = ({ leaders, label }: { leaders: PartnersType['leaders'], label?: string }) => {
  const [leadersList, setLeadersList] = useState(leaders.list || []);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isFetchBlocked, setIsFetchBlocked] = useState(leaders.is_last);
  const [pageCount, setPageCount] = useState(1);

  const getMoreLeaders = async () => {
    if (isFetchLoading || isFetchBlocked) {
      return;
    }
    setIsFetchLoading(true);
    const newPageCount = pageCount + 1;
    const response = await getPartnersData({ pageCount: newPageCount });
    const leadersData = response?.leaders;

    if (!leadersData) {
      return;
    }

    setPageCount(newPageCount);
    setLeadersList((prev) => [...prev, ...leadersData.list]);
    setIsFetchBlocked(leadersData.is_last);
    setIsFetchLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leadersListContainer}>
        <div className={classNames(styles.titleWrapper, { [styles.withTitleLabel]: label })}>
          {label &&
            <div className={styles.label}>{label}</div>
          }
          <h2 className="section-title">They work with us</h2>
        </div>
        <div className={styles.leadersListWrapper}>
          {leadersList.map((leaderData, index) => (
            <div key={`${leaderData?.title}${index}`} className={styles.leaderWrapper}>
              <SuccessStoryCard story={leaderData} index={index} isImageGrayscale={false}/>
            </div>
          ))}
        </div>
        {!isFetchBlocked && (
          <div className={styles.showMoreBtnWrapper}>
            <Button
              variant="white-primary-text"
              lottieIconId="dash-with-dots"
              onClick={getMoreLeaders}
              isDisabled={isFetchLoading}
              animatedText
            >
              All Partners
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(PartnersLeaders);
