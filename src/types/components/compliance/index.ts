import { SeoType } from '@/types';

type ComplianceContactType = {
    name: string,
    value: string,
    is_phone?: boolean,
    is_email?: boolean,
    is_site?: boolean,
};

type ComplianceDocumentType = {
    name: string,
    elements: {
        name: string,
        path: string,
        file_size: string,
    }[],
};

type CompliancePageMiscType = {
    text: string,
    subtext: string,
    email: string,
    contacts_text: string,
    hotline_title: string,
    hotline_text: string,
    secondary_text: string,
};

type ComplianceType = {
    contacts: ComplianceContactType[],
    documents: ComplianceDocumentType[],
    misc: CompliancePageMiscType,
    seo?: SeoType,
};

export type {
  ComplianceType,
  ComplianceContactType,
  ComplianceDocumentType,
  CompliancePageMiscType
};
