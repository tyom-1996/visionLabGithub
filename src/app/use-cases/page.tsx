import { getUseCasesData } from '@/api/useCases';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import HeaderElements from '@/components/shared/HeaderElements';
import UseCasesList from '@/components/sections/UseCasesList';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Scenarios';

export const generateMetadata = generateMetadataFromSeoParam(getUseCasesData);

const UseCasesPage = async () => {
  const pageData = await getUseCasesData();
  const questionsData = await getQuestionsData('use-cases');

  return (
    <div className={styles.useCasesPageWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          description={pageData?.heading_text}
          descriptionVariant="md"
          descriptionLabel={pageData?.usecases?.length}
          isLabelInParentheses
        />
        <HeaderElements redBtnData={{ text: 'Select solution' }} />
      </div>
      <UseCasesList useCases={pageData?.usecases ?? []} />
      <Questions variantPaddingTop="md" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default UseCasesPage;
