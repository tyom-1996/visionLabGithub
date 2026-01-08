import { getProductsData } from '@/api/products';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import HeaderElements from '@/components/shared/HeaderElements';
import ProductsList from '@/components/sections/ProductsList';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Products';

export const generateMetadata = generateMetadataFromSeoParam(getProductsData);

const ProductsPage = async () => {
  const pageData = await getProductsData();
  const questionsData = await getQuestionsData('products');

  return (
    <div className={styles.productsPageWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          description={pageData?.heading_text}
          descriptionVariant="md"
          descriptionLabel={pageData?.products?.length}
          isLabelInParentheses
        />
        <HeaderElements redBtnData={{ text: 'Get Started' }} />
      </div>
      <ProductsList products={pageData?.products ?? []} />
      <Questions variantPaddingTop="lg" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default ProductsPage;
