import { getOneNewsMedia } from '@/api/newsMedia';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import NewsMediaItemContent from '@/components/sections/NewsMediaItemContent';
import NewsMediaPreview from '@/components/sections/NewsMediaPreview';
import Questions from '@/components/sections/Questions';
import { QUESTIONS_BLOCK_TEXT } from '@/consts';
import styles from './page.module.scss';
import { SOCIAL_MEDIA_DATA_MOCK } from '@/consts/mock';
import { getQuestionsData } from '@/api/questions';
import { cleanHTML } from '@/utils/helpers';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const generateMetadata = async ({ params }: { params: Promise<{ code: string }> }, parent: ResolvingMetadata): Promise<Metadata> => {
  const code = (await params).code;
  const parentMetadata = await parent;
  const newsMediaItem = await getOneNewsMedia(code);

  return {
    title: newsMediaItem?.seo?.title ?? newsMediaItem?.title ?? parentMetadata.title,
    description: newsMediaItem?.seo?.description ?? parentMetadata.description,
    keywords: newsMediaItem?.seo?.keywords ?? parentMetadata.keywords,
    openGraph: {
      ...parentMetadata.openGraph,
      url: `${siteUrl}/media-news/${code}`,
      title: (newsMediaItem?.seo?.title ?? newsMediaItem?.title) || parentMetadata.openGraph?.title,
      images: newsMediaItem?.image ? [{ url: newsMediaItem.image }] : parentMetadata.openGraph?.images ?? [],
    },
  };
};

const NewsMediaItemPage = async ({ params }: { params: Promise<{ code: string }> }) => {
  const code = (await params).code;
  const newsMediaItem = await getOneNewsMedia(code);
  const questionsData = await getQuestionsData('media-news');

  if (!newsMediaItem) {
    notFound(); // Если новость не найдена, показываем 404
  }

  const preTitle = `${newsMediaItem.publish_at} // ${newsMediaItem.resource}`;
  const { MORE_TITLE, TELEGRAM_DESCRIPTION } = QUESTIONS_BLOCK_TEXT;

  return (
    <div className={styles.newsMediaItemWrapper}>
      <div data-menu-visibility>
        <p className={styles.preTitle}>{preTitle}</p>
        <AdvancedTextBlock
          title={cleanHTML(newsMediaItem.title)}
          titleVariant="h1"
        />
      </div>
      <NewsMediaItemContent newsMediaItem={newsMediaItem} />
      <NewsMediaPreview newsMediaList={newsMediaItem.news_list} />
      <Questions
        variantPaddingTop="md-zero"
        title={questionsData?.title || MORE_TITLE}
        description={questionsData?.description || TELEGRAM_DESCRIPTION}
        buttonText="Subscribe"
        btnHref={`https://t.me/${SOCIAL_MEDIA_DATA_MOCK.telegramChannel}`}
      />
    </div>
  );
};

export default NewsMediaItemPage;
