import { getComplianceData } from '@/api/compliance';
import ComplianceBusinessStandards from '@/components/sections/ComplianceBusinessStandards';
import ComplianceDocumentation from '@/components/sections/ComplianceDocumentation';
import ComplianceContacts from '@/components/sections/ComplianceContacts';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Compliance';

export const generateMetadata = generateMetadataFromSeoParam(getComplianceData);

const CompliancePage = async () => {
  const complianceData = await getComplianceData();
  const questionsData = await getQuestionsData('compliance');

  if (!complianceData) {
    notFound(); // Если продукт не найден, показываем 404
  }

  const texts = {
    contacts_text: complianceData.misc?.contacts_text,
    hotline_title: complianceData.misc?.hotline_title,
    hotline_text: complianceData.misc?.hotline_text,
    secondary_text: complianceData.misc?.secondary_text,
  };

  return (
    <div className={styles.compliancePageWrapper}>
      <div data-menu-visibility>
        <ComplianceBusinessStandards title={TITLE} misc={complianceData.misc} />
      </div>
      <ComplianceDocumentation documents={complianceData.documents} />
      <ComplianceContacts contacts={complianceData.contacts} email={complianceData.misc.email || ''} texts={texts} />
      <Questions variantPaddingTop="lg" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default CompliancePage;
