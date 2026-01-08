import { getOneUseCase } from '@/api/useCases';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import HeaderElements from '@/components/shared/HeaderElements';
import SolvingProblems from '@/components/sections/SolvingProblems';
import Opportunities from '@/components/sections/Opportunities';
// import SuccessStoriesPreview from '@/components/sections/SuccessStoriesPreview';
import ProductsPreview from '@/components/sections/ProductsPreview';
import BigSquares from '@/components/sections/BigSquares';
import { ScenariosWithLastLottieWrapper } from '@/components/sections/Scenarios/WithLastLottieWrapper';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { transformUseCasePageData } from '@/utils/helpers';
import { getQuestionsData } from '@/api/questions';

export const generateMetadata = async ({ params }: { params: Promise<{ code: string }> }, parent: ResolvingMetadata): Promise<Metadata> => {
  const code = (await params).code;
  const parentMetadata = await parent;
  const useCase = await getOneUseCase(code);

  return {
    title: useCase?.seo?.title ?? parentMetadata.title,
    description: useCase?.seo?.description ?? parentMetadata.description,
    keywords: useCase?.seo?.keywords ?? parentMetadata.keywords,
  };
};

const UseCaseItemPage = async ({ params }: { params: Promise<{ code: string }> }) => {
  const code = (await params).code;
  const useCase = await getOneUseCase(code);
  const questionsData = await getQuestionsData('use-cases');

  if (!useCase) {
    notFound(); // Если сценарий не найден, показываем 404
  }

  const { resultsData } = transformUseCasePageData({ useCase });

  return (
    <div className={styles.useCaseItemWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={useCase.name}
          titleVariant="h1"
          description={useCase.preview_text}
          descriptionVariant="md"
          descriptionLabel={6}
          isLabelInParentheses
        />
        <HeaderElements
          redBtnData={{ text: 'Get Started' }}
        />
      </div>
      <SolvingProblems
        titleLabel="01"
        solving={useCase.solving_problems}
      />
      <Opportunities
        opportunities={useCase.opportunities}
        title="Capabilities"
        titleLabel="02"
      />
      <BigSquares
        squaresList={resultsData}
        title="Results"
        titleLabel="03"
        blockLabel={useCase.big_square_label}
      />
      {/* TODO: временно скрыли по просьбе клиента */}
      {/* <SuccessStoriesPreview
        storiesList={useCase.success_stories || []}
        isImageGrayscale={false}
        titleLabel="04"
      /> */}
      <ProductsPreview products={useCase.products || []} />
      <ScenariosWithLastLottieWrapper useCases={useCase?.use_cases || []} titleLabel="05" />
      <Questions variantPaddingTop="md" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default UseCaseItemPage;
