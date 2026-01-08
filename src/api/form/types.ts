import { BooleanStatus } from '@/types/api';

type FormRequestBody = {
    name: string,
    phone_number: string,
    email: string,
    agree_policy: BooleanStatus,
    consent_to_advertising_information?: BooleanStatus,
    category: string,
}

export type { FormRequestBody };
