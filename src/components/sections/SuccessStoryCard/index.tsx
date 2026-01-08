import Image from 'next/image';
import CustomTooltip from '@/components/shared/CustomTooltip';
import { Button } from '@/components/shared/Button';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { ApiUrl } from '@/consts/apiUrl';
import { SuccessStoryType } from '@/types/components/successStories';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { cleanHTML, formatToTwoDigits } from '@/utils/helpers';

type Props = {
  story: SuccessStoryType,
  index: number,
  isImageGrayscale?: boolean,
  hasCounting?: boolean,
  variant?: 'storiesPreview'
};

const SuccessStoryCard = ({ story, index, isImageGrayscale = true, variant, hasCounting }: Props) => {
  return (
    <div
      itemScope
      itemType="https://schema.org/CreativeWork"
      className={classNames(styles.storyItem, { [styles.variantStoriesPreview]: variant === 'storiesPreview' })}
    >
      <div className={styles.storyItemImgContainer}>
        {story.logo &&
          <div
            itemScope
            itemType="https://schema.org/ImageObject"
            className={classNames(styles.storyItemImgWrapper, { [styles.grayscale]: isImageGrayscale })}
          >
            <Image
              itemProp="contentUrl"
              src={story?.isUseMockImage ? story.logo : ApiUrl.MAIN + story.logo}
              width={200}
              height={100}
              alt={story.logo_alt ?? ''}
              title={story.logo_title}
            />
          </div>
        }
      </div>
      <div className={styles.storyItemContent}>
        {hasCounting &&
          <p className={styles.storyItemNumber}>{formatToTwoDigits(index + 1)}</p>
        }
        <div className={styles.storyItemTextWrapper}>
          <div>
            <div className={styles.storyItemTitleWrapper}>
              <p itemProp="name" className={styles.storyItemTitle}>{story.title}</p>
              {story.hint &&
                <div className={styles.storyItemHintWrapper}>
                  <CustomTooltip id={`story-hint-button-${index}`}>
                    <p className={styles.storyItemHintTooltipText}>{story.hint}</p>
                  </CustomTooltip>
                  <Button
                    data-tooltip-id={`story-hint-button-${index}`}
                    variant="transparent-primary-text"
                    svgId="info"
                    className={styles.storyItemHintBtn}
                  />
                </div>
              }
            </div>
            {story.subtitle &&
              <p itemProp="alternateName" className={styles.storyItemSubtitle}>{story.subtitle}</p>
            }
          </div>
          <p itemProp="description" className={styles.storyItemDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(story.description) }}/>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(SuccessStoryCard);
