import { SeoType } from '@/types';
import { UseMockImage } from '@/types/components/index';

type SuccessStoryesPageType = {
    heading_text: string,
    stories: SuccessStoryType[],
    seo?: SeoType,
};

type SuccessStoryType = UseMockImage & {
    id: number | string,
    title: string,
    subtitle?: string,
    description: string,
    logo: string | null,
    logo_alt: string,
    logo_title: string,
    hint?: string | null,
};

export type { SuccessStoryType, SuccessStoryesPageType };
