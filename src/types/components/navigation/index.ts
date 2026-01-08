type NavigationChildDataType = {
    code: string,
    description: string,
    id?: number,
    iblock_id?: string | number,
    name_logo: string,
    image_logo?: string,
    alt_logo?: string,
    title_logo?: string,
}

type NavigationDataType = {
    id: number | string,
    iblock_id?: string,
    code: string,
    name: string,
    can_located_separately?: boolean,
    children: NavigationChildDataType[],
}

export type { NavigationDataType, NavigationChildDataType };
