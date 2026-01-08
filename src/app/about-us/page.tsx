import styles from './page.module.scss';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import HeaderElements from '@/components/shared/HeaderElements';
// import OurClients from '@/components/sections/OurClients';
import { getAboutUsPageData } from '@/api/aboutUs';
import Questions from '@/components/sections/Questions';
import ImageWithStackedCards from '@/components/sections/ImageWithStackedCards';
import Image from 'next/image';
// import LogosSlider from '@/components/sections/LogosSlider';
// import OurPartners from '@/components/sections/OurPartners';
import Geography from '@/components/sections/Geography';
import History from '@/components/sections/History';
import { ApiUrl } from '@/consts/apiUrl';
import { notFound } from 'next/navigation';
import { AboutUsPageDataType } from '@/types/components/aboutUs';
import { getQuestionsData } from '@/api/questions';
import { cleanHTML, generateMetadataFromSeoParam } from '@/utils/helpers';

const TITLE = 'Who We Are?';
const HEADING_COUNT = 6;

export const generateMetadata = generateMetadataFromSeoParam(getAboutUsPageData);

const AboutList = ({ list, isUseMockImage }: { list: AboutUsPageDataType['about']['list'], isUseMockImage?: boolean }) => {
  return (
    <div className={styles.aboutList}>
      {list?.map((element, index) => (
        <div className={styles.aboutCard} key={element.alt + index}>
          <div className={styles.aboutImage}>
            <Image
              src={isUseMockImage ? element.image : ApiUrl.MAIN + element.image}
              alt={element.alt}
              title={element.title}
              width={72}
              height={72} />
          </div>
          <div className={styles.aboutDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(element.description) }}></div>
        </div>
      ))}
    </div>
  );
};

const AboutUsPage = async () => {
  const pageData = await getAboutUsPageData();
  const questionsData = await getQuestionsData('about-us');

  if (!pageData) {
    notFound();
  }

  const headerImageData = {
    src: pageData.image_main,
    alt: pageData.alt_main,
    title: pageData.title_main,
  };

  return (
    <div className={styles.aboutUsWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          description={pageData.name}
          descriptionVariant="md"
          descriptionLabel={HEADING_COUNT}
          isLabelInParentheses
        />
        <HeaderElements imageData={headerImageData}/>
        <AdvancedTextBlock
          description={pageData.what_we_do_text || 'We develop face/object recognition solutions for finance, telecommunications, transport, manufacturing industry, and retail'}
          descriptionVariant="md"
          descriptionLabel="What We Do"
        />
      </div>

      <ImageWithStackedCards
        title="Independent Evaluation"
        titleLabel='01'
        image={pageData.about.image}
        imageAlt={pageData.about.alt}
        imageTitle={pageData.about.title}
        isUseMockImage={pageData.about?.isUseMockImage}
        parsedLottieFile={pageData.about?.parsedLottieFile}
        lottiePath={pageData.about?.lottie}
        content={<AboutList list={pageData.about.list} isUseMockImage={pageData.about?.isUseMockImage} />}
      />

      <div>
        <AdvancedTextBlock
          title="History"
          titleVariant="h2"
          descriptionLabel='02'
          description={pageData.stories_text || 'From Startup to International Recognition. The history of the company is a journey of innovation, partnership, and achieving new heights'}
          descriptionVariant="md"
        />
        <History stories={pageData?.stories || []} />
      </div>

      <div className={styles.geographySectionWrapper}>
        <AdvancedTextBlock
          title="Technologies Used Worldwide"
          titleVariant="h2"
          descriptionLabel='03'
          description={pageData.geography_text || 'VisionLabs is a world-leading company that develops products based on computer vision and machine learning technologies.'}
          descriptionVariant="md"
        />
        {pageData?.geography &&
          <Geography geography={pageData.geography} />
        }
      </div>

      {/* <div className={styles.awardsSectionWrapper}>
        <AdvancedTextBlock
          title="Awards"
          titleVariant="h2"
          descriptionLabel='04'
          description={pageData.awards_text || 'Our technologies set the standard and gain expert recognition, becoming a benchmark for quality and innovation within their industry.'}
          descriptionVariant="md"
        />
        <LogosSlider awards={pageData?.awards || []} />
      </div>

      <OurClients clients={pageData?.clients || []} titleLabel={'05'} /> */}

      {/* <OurPartners partners={pageData?.partners || []} titleLabel={'06'} /> */}

      <Questions variantPaddingTop="md" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default AboutUsPage;
