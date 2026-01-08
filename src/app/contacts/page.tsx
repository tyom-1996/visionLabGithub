import { getContactsData } from '@/api/contacts';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import Contacts from '@/components/sections/Contacts';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Contacts';

export const generateMetadata = generateMetadataFromSeoParam(getContactsData);

const ContactsPage = async () => {
  const contactsData = await getContactsData();
  const questionsData = await getQuestionsData('contacts');

  return (
    <div className={styles.contactsPageWrapper}>
      <div data-menu-visibility>
        <AdvancedTextBlock title={TITLE} titleVariant="h1"/>
      </div>
      <Contacts contactsData={contactsData} />
      <Questions variantPaddingTop="lg" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default ContactsPage;
