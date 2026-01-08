import { getMainPageData } from '@/api/mainPage';
import { getNewsMediaData } from '@/api/newsMedia';
import Achievements from '@/components/sections/Achievements';
import WhoWeAre from '@/components/sections/WhoWeAre';
import ProductsPreview from '@/components/sections/ProductsPreview';
import DemoRequest from '@/components/sections/DemoRequest';
import { ScenariosWithLastLottieWrapper } from '@/components/sections/Scenarios/WithLastLottieWrapper';
import SolutionsInfoBlock from '@/components/sections/SolutionsInfoBlock';
import SolutionsPreview from '@/components/sections/SolutionsPreview';
import BigSquares from '@/components/sections/BigSquares';
import OurClients from '@/components/sections/OurClients';
import NewsMediaPreview from '@/components/sections/NewsMediaPreview';
import Questions from '@/components/sections/Questions';
import styles from './page.module.scss';
import ComputerVision from '@/components/sections/ComputerVision';
import { getQuestionsData } from '@/api/questions';
import { generateMetadataFromSeoParam } from '@/utils/helpers';

export const generateMetadata = generateMetadataFromSeoParam(getMainPageData);

const Main = async () => {
  const pageData = await getMainPageData();
  const newsMediaData = await getNewsMediaData();
  const questionsData = await getQuestionsData('main');
  const QUESTIONS_DESCRIPTION = 'Tell us what you need and we’ll find a solution';

  return (
    <div className={styles.mainPageWrapper}>
      <ComputerVision texts={pageData?.computer_vision} />
      <Achievements achivements={pageData?.achievements} />
      <WhoWeAre description={pageData?.whoweare} />
      <ProductsPreview products={pageData?.products || []} />
      <DemoRequest />
      <ScenariosWithLastLottieWrapper useCases={pageData?.['use-cases'] || []} />
      <BigSquares squaresList={pageData?.numbers || []} blockLabel="VisionLabs in Figures" />
      <SolutionsInfoBlock description={pageData?.industry_block_description || ''} />
      <SolutionsPreview solutions={pageData?.industries || []} />
      <OurClients clients={pageData?.partners || []} />
      <NewsMediaPreview newsMediaList={newsMediaData?.data || []} />
      <Questions variantPaddingTop="zero-offset" buttonText="Submit request" title={questionsData?.title} description={questionsData?.description ?? QUESTIONS_DESCRIPTION} />
    </div>
  );
};

export default Main;
