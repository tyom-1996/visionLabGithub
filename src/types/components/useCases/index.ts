import { SuccessStoryType } from '@/types/components/successStories';
import { ProductType } from '@/types/components/product';
import { SeoType } from '@/types';

type UseCasePageType = {
  heading_text: string,
  usecases: UseCaseType[],
  seo?: SeoType,
};

type UseCaseType = {
  id: string | number,
  name: string,
  code: string,
  description: string,
  image_svg?: string,
  image?: string,
  image_title?: string,
  image_alt?: string,
  logo_video?: string,
  lottie_file?: string,
  href?: string,
};

type UseCaseDetailsType = {
  id: string | number,
  code: string,
  name: string,
  preview_text: string,
  solving_problems: {
    image: string,
    alt: string,
    title: string,
    lottie_file?: string,
    parsedLottieFile?: unknown,
    list: {
      name: string,
      description: string,
    }[],
  },
  opportunities: {
    image: string,
    alt: string,
    title: string,
    list: {
      id: number,
      name: string,
      description: string,
      label?: string,
      big_text?: string,
    }[],
  },
  results: {
    name: string,
    description: string,
    is_big: boolean,
  }[],
  success_stories: SuccessStoryType[],
  products: ProductType[],
  use_cases: UseCaseType[],
  big_square_label: string,
  seo?: SeoType,
};

export type { UseCaseDetailsType, UseCaseType, UseCasePageType };
