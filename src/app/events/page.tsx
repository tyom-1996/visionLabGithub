import styles from './page.module.scss';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import HeaderElements from '@/components/shared/HeaderElements';
import { getAboutUsPageData } from '@/api/aboutUs';
import Questions from '@/components/sections/Questions';
import { notFound } from 'next/navigation';
import { getQuestionsData } from '@/api/questions';
import NewEventLink from '@/components/sections/NewEventLink';
import EventsListGrid from '@/components/sections/EventsListGrid';
import { confs, newEvents, webinars } from './data';

const TITLE = 'События';

const EventsPage = async () => {
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
    <div className={styles.eventsWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={TITLE}
          titleVariant="h1"
          description="VisionLabs — один из мировых лидеров в области технологий распознавания на базе компьютерного зрения"
          descriptionVariant="md"
          isLabelInParentheses
        />
        <HeaderElements imageData={headerImageData}/>
      </div>

      <NewEventLink
        title="Independent Evaluation"
        newEvents={newEvents}
        titleLabel='Новое событие'
      />

      <EventsListGrid
        title="Вебинары"
        list={webinars}
      />

      <EventsListGrid
        title="Конференции"
        list={confs}
      />

      <Questions variantPaddingTop="md" title={questionsData?.title} description={questionsData?.description} />
    </div>
  );
};

export default EventsPage;
