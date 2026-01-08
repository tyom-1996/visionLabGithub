import SuccessStoryCard from '@/components/sections/SuccessStoryCard';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { SuccessStoryType } from '@/types/components/successStories';
import styles from './styles.module.scss';

type Props = {
  successStories: SuccessStoryType[],
  isImageGrayscale?: boolean,
  hasCounting?: boolean,
};

const SuccessStoriesList = ({ successStories, isImageGrayscale, hasCounting }: Props) => {
  return (
    <div className={styles.storiesList}>
      {successStories.map((story, index) => (
        <div key={story?.title + index} className={styles.storyWrapper}>
          <SuccessStoryCard story={story} index={index} isImageGrayscale={isImageGrayscale} hasCounting={hasCounting} />
        </div>
      ))}
    </div>
  );
};

export default withErrorBoundary(SuccessStoriesList);
