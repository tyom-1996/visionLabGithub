import { SeoType } from '@/types';

type NewsMediaPreviewType = {
    id: number,
    logo: string,
    logo_title: string,
    logo_alt: string,
    image: string | null,
    image_title: string | null,
    image_alt: string | null,
    publish_at: string,
    resource: string,
    title: string,
    href?: string,
}

type NewsMediaListResponseType = {
    data: NewsMediaPreviewType[],
    count: number,
    is_last: boolean,
    seo?: SeoType,
}

type NewsMediaDetailsType = {
    id: number,
    image: string | null,
    image_title: string | null,
    image_alt: string | null,
    publish_at: string,
    resource: string,
    title: string,
    content: string,
    feedback_email?: string,
    news_list: NewsMediaPreviewType[],
    seo?: SeoType,
}

export type {
  NewsMediaDetailsType,
  NewsMediaListResponseType,
  NewsMediaPreviewType
};
