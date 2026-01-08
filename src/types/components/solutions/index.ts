import { SeoType } from '@/types';
import { ProductType } from '../product';
import { SuccessStoryType } from '../successStories';

type SolutionsPageType = {
    heading_text: string,
    solutions: SolutionType[],
    seo?: SeoType,
};

type SolutionType = {
    id: number,
    name: string,
    code: string,
    preview_text: string,
    preview_picture: string,
    alt: string,
    title: string,
    logo_video?: string | null,
};

type SolvingTaskChildType = {
    id: number,
    name: string,
    description: string,
    image: string,
    image_alt: string,
    image_title: string,
    lottie_file?: string,
    parsedLottieFile?: unknown,
};

type SolvingTaskListType = {
    name: string,
    children: SolvingTaskChildType[],
};

type SolutionSolvingTaskType = {
    preview_text: string,
    list: SolvingTaskListType[],
};

type SolutionDetailsType = {
    id: string | number,
    code: string,
    name: string,
    logo_video: string,
    preview_text: string,
    preview_picture: string,
    alt: string,
    title: string,
    what_we_offer: string,
    solving_task: SolutionSolvingTaskType,
    indicators: {
        name: string,
        preview_text: string,
        is_big: boolean,
    }[],
    success_stories: SuccessStoryType[],
    products: ProductType[],
    big_square_label: string,
    seo?: SeoType,
};

export type {
  SolutionDetailsType,
  SolutionType,
  SolutionSolvingTaskType,
  SolvingTaskListType,
  SolvingTaskChildType,
  SolutionsPageType
};
