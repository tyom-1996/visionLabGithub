import { getOneProduct } from '@/api/products';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import ProductItemPageTitle from '@/components/sections/ProductItemPageTitle';
import HeaderElements from '@/components/shared/HeaderElements';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import Opportunities from '@/components/sections/Opportunities';
import ProductModules from '@/components/sections/ProductModules';
import ProductAdvantages from '@/components/sections/ProductAdvantages';
// import SuccessStoriesPreview from '@/components/sections/SuccessStoriesPreview';
import ProductsPreview from '@/components/sections/ProductsPreview';
import SolvingProblems from '@/components/sections/SolvingProblems';
import Questions from '@/components/sections/Questions';
import { transformProductPageData } from '@/utils/helpers';
import styles from './page.module.scss';
import { getQuestionsData } from '@/api/questions';

const HEADING_COUNT = 6;

export const generateMetadata = async ({ params }: { params: Promise<{ code: string }> }, parent: ResolvingMetadata): Promise<Metadata> => {
  const code = (await params).code;
  const parentMetadata = await parent;
  const product = await getOneProduct(code);

  return {
    title: product?.seo?.title ?? parentMetadata.title,
    description: product?.seo?.description ?? parentMetadata.description,
    keywords: product?.seo?.keywords ?? parentMetadata.keywords,
  };
};

const ProductItemPage = async ({ params }: { params: Promise<{ code: string }> }) => {
  const code = (await params).code;
  const product = await getOneProduct(code);
  const questionsData = await getQuestionsData('products');

  if (!product) {
    notFound(); // Если продукт не найден, показываем 404
  }

  const headerImageData = {
    src: product.image_main,
    alt: product.alt_main || '',
    title: product.title_main || '',
  };
  const headerVideoData = {
    src: product.video_main,
  };
  const {
    advantagesData,
    solvingProblemsList,
    opportunitiesData,
  } = transformProductPageData({ product });

  return (
    <div className={styles.productItemWrapper}>
      <div className="header-block">
        <ProductItemPageTitle
          product={product}
          titleLabel={HEADING_COUNT}
          isLabelInParentheses
        />
        <HeaderElements
          imageData={headerImageData}
          videoData={headerVideoData}
          redBtnData={{ text: 'Get Started' }}
        />
        <AdvancedTextBlock
          description={product.detail_description.text}
          descriptionVariant="md"
          descriptionLabel="How it works"
        />
      </div>
      <SolvingProblems
        title="Tasks Solved"
        titleLabel="01"
        solving={{ list: solvingProblemsList }}
      />
      <Opportunities
        opportunities={opportunitiesData}
        title={product.what_recognize}
        titleLabel="02"
      />
      <ProductModules modules={product.modules} titleLabel="03" />
      <ProductAdvantages
        advantages={advantagesData}
        titleLabel="04"
      />
      {/* TODO: временно скрыли по просьбе клиента */}
      {/* <SuccessStoriesPreview storiesList={product.clients || []} titleLabel="05" btnText="All cases" /> */}
      <ProductsPreview products={product.related_products || []} />
      <Questions variantPaddingTop="md" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default ProductItemPage;
