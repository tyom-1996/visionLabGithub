enum BooleanStatus {
    YES = 'Y',
    NO = 'N'
}

type SuccessResponseType = {
    status: boolean,
    data: { message: string },
}

export { BooleanStatus };
export type { SuccessResponseType };
