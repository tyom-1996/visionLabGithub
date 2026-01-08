import { getPartnersData } from '@/api/partners';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import HeaderElements from '@/components/shared/HeaderElements';
import PartnersReasons from '@/components/sections/PartnersReasons';
import PartnersLeaders from '@/components/sections/PartnersLeaders';
import Questions from '@/components/sections/Questions';
import { FORM_CATEGORY_TEXT } from '@/consts';
import { PartnersType } from '@/types/components/partners';
import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Partners';

export const generateMetadata = generateMetadataFromSeoParam(getPartnersData);

const PartnersPage = async () => {
  const partnersData = await getPartnersData();
  const questionsData = await getQuestionsData('partners');

  const headerImageData = partnersData
    ? {
      src: partnersData.image_main,
      alt: partnersData.alt_main,
      title: partnersData.title_main,
    }
    : undefined;

  if (!partnersData) {
    notFound();
  }

  return (
    <div className={styles.partnersPageWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          description={partnersData?.heading_text}
          descriptionVariant="md"
          descriptionLabel={2}
          isLabelInParentheses
        />
        <HeaderElements
          imageData={headerImageData}
          redBtnData={{
            text: 'Partner with us',
            modalCategory: FORM_CATEGORY_TEXT.PARTNER,
          }}
        />
        <AdvancedTextBlock
          description={partnersData.what_offer_text}
          descriptionVariant="md"
          descriptionLabel="What We Offer"
        />
      </div>
      <PartnersReasons reasons={partnersData.reasons} label={'01'} />
      <PartnersLeaders leaders={partnersData.leaders || {} as PartnersType['leaders']} label={'02'} />
      <Questions variantPaddingTop="md" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default PartnersPage;
