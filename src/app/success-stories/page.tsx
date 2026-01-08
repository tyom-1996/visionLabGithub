import { getSuccessStoriesData } from '@/api/successStories';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import SuccessStoriesList from '@/components/sections/SuccessStoriesList';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Success stories';

export const generateMetadata = generateMetadataFromSeoParam(getSuccessStoriesData);

const SuccessStoriesPage = async () => {
  const pageData = await getSuccessStoriesData();
  const questionsData = await getQuestionsData('success-stories');

  return (
    <div className={styles.storiesPageWrapper}>
      <div data-menu-visibility>
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          description={pageData?.heading_text}
          descriptionVariant="md"
          descriptionLabel={pageData?.stories?.length}
          isLabelInParentheses
        />
      </div>
      <SuccessStoriesList successStories={pageData?.stories ?? []} hasCounting />
      <Questions variantPaddingTop="zero" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default SuccessStoriesPage;
