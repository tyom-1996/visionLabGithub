import { getSolutionsData } from '@/api/solutions';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import HeaderElements from '@/components/shared/HeaderElements';
import SolutionsList from '@/components/sections/SolutionsList';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Industries';

export const generateMetadata = generateMetadataFromSeoParam(getSolutionsData);

const SolutionsPage = async () => {
  const pageData = await getSolutionsData();
  const questionsData = await getQuestionsData('solutions');

  return (
    <div className={styles.solutionsPageWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          description={pageData?.heading_text}
          descriptionVariant="md"
          descriptionLabel={pageData?.solutions?.length}
          isLabelInParentheses
        />
        <HeaderElements redBtnData={{ text: 'Select solution' }} />
      </div>
      <SolutionsList solutions={pageData?.solutions ?? []} />
      <Questions variantPaddingTop="md" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default SolutionsPage;
