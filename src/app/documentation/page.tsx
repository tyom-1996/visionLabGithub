import { getDocumentationData } from '@/api/documentation';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import Documentation from '@/components/sections/Documentation';
import Questions from '@/components/sections/Questions';
import ArrowScrollButton from '@/components/shared/ArrowScrollButton/ArrowScrollButton';
import styles from './page.module.scss';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Documents';

export const generateMetadata = generateMetadataFromSeoParam(getDocumentationData);

const DocumentationPage = async () => {
  const pageData = await getDocumentationData();
  const questionsData = await getQuestionsData('documentation');
  const HEADING_COUNT = pageData?.documentation?.reduce((sum, docsSection) => sum + docsSection.children.length, 0);

  return (
    <div className={styles.documentationPageWrapper}>
      <div data-menu-visibility>
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          description={pageData?.heading_text}
          descriptionVariant="md"
          descriptionLabel={HEADING_COUNT}
          isLabelInParentheses
        />
      </div>
      <Documentation documentation={pageData?.documentation ?? []} />
      <Questions variantPaddingTop="lg" title={questionsData?.title} description={questionsData?.description} />
      <ArrowScrollButton />
    </div>
  );
};

export default DocumentationPage;
