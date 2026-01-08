import Image from 'next/image';
import ShareButtons from '@/components/shared/ShareButtons';
import { MAX_WIDTH_PAGE_CONTENT } from '@/consts';
import { ApiUrl } from '@/consts/apiUrl';
import { NewsMediaDetailsType } from '@/types/components/newsMedia';
import styles from './styles.module.scss';
import { SOCIAL_MEDIA_DATA_MOCK } from '@/consts/mock';
import { cleanHTML } from '@/utils/helpers';

const NewsMediaItemContent = ({ newsMediaItem }: { newsMediaItem: NewsMediaDetailsType }) => {
  const { image, content } = newsMediaItem;
  const feedbackText = newsMediaItem?.feedback_email || SOCIAL_MEDIA_DATA_MOCK.prEmail;

  return (
    <div className={styles.wrapper}>
      {image &&
        <div className={styles.mainImageWrapper}>
          <Image
            priority
            src={ApiUrl.MAIN + image}
            alt={newsMediaItem.image_alt || ''}
            title={newsMediaItem.image_title || ''}
            height={480}
            width={MAX_WIDTH_PAGE_CONTENT}
            quality={100}
            className={styles.mainImage}
          />
          <div className={styles.decorateUnderImg} />
        </div>
      }
      <div className={styles.contentBlocksWrapper}>
        <div className={styles.shareBtnsContainer}>
          <ShareButtons classNameWrapper={styles.shareBtnsWrapper} />
        </div>

        <div className={styles.contentTextWrapper} dangerouslySetInnerHTML={{ __html: cleanHTML(content || '') }} />
      </div>

      <div className={styles.contactPromo}>
        <p className={styles.contactQuestion}>Do you have any questions or suggestions?</p>
        <p className={styles.contactInvite} dangerouslySetInnerHTML={{ __html: cleanHTML(feedbackText) }} />
      </div>
    </div>
  );
};

export default NewsMediaItemContent;
