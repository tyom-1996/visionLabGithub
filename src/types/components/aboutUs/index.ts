import { SeoType } from '@/types';
import { ClientType } from '../client';
import { SuccessStoryType } from '../successStories';
import { UseMockImage } from '@/types/components/index';

type CompanyHistoryType = {
  id: number,
  title: string,
  description: string,
};

type AboutUsPageDataType = {
  name: string,
  image_main: string,
  alt_main: string,
  title_main: string,
  what_we_do_text: string,
  about: UseMockImage & {
    alt: string,
    image: string,
    title: string,
    lottie?: string,
    parsedLottieFile?: string,
    list: {
        description: string,
        image: string,
        alt: string,
        title: string,
    }[],
  },
  clients: ClientType[],
  partners: SuccessStoryType[],
  stories_text: string,
  stories: CompanyHistoryType[],
  geography_text: string,
  geography: {
    markers: string[],
    info_list: {
      title: string,
      description: string,
    }[],
  },
  awards_text: string,
  awards: {
    id: number,
    title: string,
    image: string,
    year: string,
  }[],
  seo?: SeoType,
};

export type { AboutUsPageDataType, CompanyHistoryType };
