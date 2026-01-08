import { SolutionType } from '../solutions';
import { ClientType } from '../client';
import { ProductType } from '../product';
import { UseCaseType } from '../useCases';
import { AchievementType } from '../achievements';
import { SeoType } from '@/types';

type NumberBlockType = {
    name: string,
    preview_text: string,
    is_big: boolean,
}

type ComputerVisionType = {
    title: string,
    text: string,
}

type MainPageDataType = {
    computer_vision: ComputerVisionType,
    achievements: AchievementType[],
    whoweare: string,
    industries: SolutionType[],
    numbers: NumberBlockType[],
    partners: ClientType[],
    products: ProductType[],
    'use-cases': UseCaseType[],
    industry_block_description?: string,
    seo?: SeoType,
}

export type { MainPageDataType, NumberBlockType, ComputerVisionType };
