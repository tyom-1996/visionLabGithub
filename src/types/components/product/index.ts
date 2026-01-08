import { UseMockImage } from '@/types/components/index';
import { SuccessStoryType } from '../successStories';
import { SeoType } from '@/types';

type ProductsPageType = {
    heading_text: string,
    products: ProductType[],
    seo?: SeoType,
}

type ProductType = UseMockImage & {
    id: number,
    code: string,
    preview_text: string,
    image: string,
    alt: string,
    title: string,
    image_logo: string | null,
    name_logo: string | null,
    alt_logo: string | null,
    title_logo: string | null,
    logo_video?: string | null,
    video_main_page_products?: string,
};

type ProductDetailsType = {
    id: number,
    code: string,
    detail_logo: string,
    detail_title: string,
    detail_logo_alt: string,
    detail_logo_title: string,
    detail_subtitle: string,
    image_main?: string,
    alt_main?: string,
    title_main?: string,
    video_main?: string | null,
    detail_description: {
        text: string,
        type?: string,
    },
    task_list: {
        description: string,
        value: string,
    }[],
    possibilities_logo: string,
    possibilities_logo_alt?: string,
    possibilities_logo_title?: string,
    possibilities: {
        id: number,
        bottom_title: string,
        bottom_subtitle: string,
        title: string,
        subtitle: string,
    }[],
    modules: {
        value: string,
        description: string,
    }[],
    advantages_logo: string,
    advantages_logo_alt: string,
    advantages_logo_title: string,
    advantages: string[],
    clients: SuccessStoryType[],
    related_products: ProductType[],
    what_recognize: string,
    seo?: SeoType,
};

export type { ProductDetailsType, ProductType, ProductsPageType };
