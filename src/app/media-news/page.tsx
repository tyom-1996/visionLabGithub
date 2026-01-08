import { getNewsMediaData } from '@/api/newsMedia';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import NewsMediaList from '@/components/sections/NewsMediaList';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { QUESTIONS_BLOCK_TEXT } from '@/consts';
import { SOCIAL_MEDIA_DATA_MOCK } from '@/consts/mock';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'News';

export const generateMetadata = generateMetadataFromSeoParam(getNewsMediaData);

const NewsMediaPage = async () => {
  const newsMediaData = await getNewsMediaData();
  const questionsData = await getQuestionsData('media-news');
  const { MORE_TITLE, TELEGRAM_DESCRIPTION } = QUESTIONS_BLOCK_TEXT;

  return (
    <div className={styles.newsMediaPageWrapper}>
      <div data-menu-visibility>
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          isLabelInParentheses
        />
      </div>
      {newsMediaData &&
        <NewsMediaList newsMediaData={newsMediaData} />
      }
      <Questions
        variantPaddingTop="md"
        title={questionsData?.title || MORE_TITLE}
        description={questionsData?.description || TELEGRAM_DESCRIPTION}
        buttonText="Subscribe"
        btnHref={SOCIAL_MEDIA_DATA_MOCK.linkedIn}
      />
    </div>
  );
};

export default NewsMediaPage;
