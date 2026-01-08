import { SeoType } from '@/types';

type ContactsType = {
    contacts: ContactType[],
    seo?: SeoType,
};

type ContactType = {
    id: string | number,
    name: string,
    text: {
        value: string,
        description: string,
        is_email?: boolean,
    }[]
};

export type { ContactType, ContactsType };
