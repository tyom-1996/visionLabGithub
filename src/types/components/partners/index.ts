import { SeoType } from '@/types';
import { SuccessStoryType } from '../successStories';

type PartnersType = {
  heading_text: string,
  image_main: string,
  alt_main: string,
  title_main: string,
  what_offer_text: string,
  reasons: {
    title: string,
    list: {
      id: number,
      name: string,
      preview_text: string,
    }[],
  },
  leaders: {
    count: number,
    is_last: boolean,
    list: SuccessStoryType[],
  },
  seo?: SeoType,
};

export type { PartnersType };
