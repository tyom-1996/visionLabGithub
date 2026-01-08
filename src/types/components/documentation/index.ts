import { SeoType } from '@/types';

type DocumentationPageType = {
  heading_text: string,
  documentation: DocumentSection[],
  seo?: SeoType,
};

type DocumentsList = {
  name: string,
  elements: {
    name: string,
    path: string,
    file_size: string,
  }[],
};

type DocumentSection = {
  name: string,
  children: DocumentsList[],
};

export type { DocumentSection, DocumentationPageType };
