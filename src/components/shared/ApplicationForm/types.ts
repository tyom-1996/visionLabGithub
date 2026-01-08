import { ApplicationFormResponse } from '@/types/components/applicationForm';

type FormDataType = {
    name: string,
    phoneNumber: string,
    email: string,
    agreePolicy: boolean,
    advertisement: boolean,
    category: string,
}

type FormikActions = {
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void,
}

type CurrentData = ApplicationFormResponse & {
    selectOptions: { value: string, label: string }[],
    selectedCategory?: string,
}

export type { CurrentData, FormDataType, FormikActions };
