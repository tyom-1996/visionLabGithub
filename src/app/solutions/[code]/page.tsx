import { getOneSolution } from '@/api/solutions';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import SolutionItemHeaderActions from '@/components/sections/SolutionItemHeaderActions';
// import SuccessStoriesPreview from '@/components/sections/SuccessStoriesPreview';
import ProductsPreview from '@/components/sections/ProductsPreview';
import SolutionItemSolvingTasks from '@/components/sections/SolutionItemSolvingTasks/SolvingTasksWrapper';
import BigSquares from '@/components/sections/BigSquares';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import { getQuestionsData } from '@/api/questions';

export const generateMetadata = async ({ params }: { params: Promise<{ code: string }> }, parent: ResolvingMetadata): Promise<Metadata> => {
  const code = (await params).code;
  const parentMetadata = await parent;
  const solution = await getOneSolution(code);

  return {
    title: solution?.seo?.title ?? parentMetadata.title,
    description: solution?.seo?.description ?? parentMetadata.description,
    keywords: solution?.seo?.keywords ?? parentMetadata.keywords,
  };
};

const SolutionItemPage = async ({ params }: { params: Promise<{ code: string }> }) => {
  const code = (await params).code;
  const solution = await getOneSolution(code);
  const questionsData = await getQuestionsData('solutions');

  if (!solution) {
    notFound(); // Если сценарий не найден, показываем 404
  }

  const scrollTargetId = 'scroll-target-solution-page';

  return (
    <div className={styles.solutionItemWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={solution.name}
          titleVariant="h1"
          description={solution.preview_text}
          descriptionVariant="md"
          descriptionLabel={4}
          isLabelInParentheses
        />
        <SolutionItemHeaderActions
          solution={solution}
          scrollTargetId={scrollTargetId}
        />
        <AdvancedTextBlock
          description={solution.what_we_offer}
          descriptionVariant="md"
          descriptionLabel="What We Offer"
        />
      </div>
      <SolutionItemSolvingTasks
        solvingTasks={solution.solving_task}
        scrollTargetId={scrollTargetId}
        label="01"
      />
      <BigSquares
        squaresList={solution.indicators}
        title="Our Performance"
        titleLabel="02"
        blockLabel={solution.big_square_label}
      />
      {/* TODO: временно скрыли по просьбе клиента */}
      {/* <SuccessStoriesPreview
        storiesList={solution.success_stories || []}
        isImageGrayscale={false}
        titleLabel="03"
      /> */}
      <ProductsPreview products={solution.products || []} />
      <Questions variantPaddingTop="md" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default SolutionItemPage;
