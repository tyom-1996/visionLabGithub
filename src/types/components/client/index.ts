import { UseMockImage } from '@/types/components/index';

type ClientType = UseMockImage & {
    id: number,
    title: string,
    subtitle?: string,
    description: string,
    logo: string | null,
    logo_alt: string,
    logo_title: string,
    hint?: string | null,
}

export type { ClientType };
