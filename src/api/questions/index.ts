import { fetchDataV2 } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { QuestionsType } from '@/types/components/questions';

export const getQuestionsData = async (slug?: string) => {
  const path = `${ApiUrl.QUESTIONS}${slug ? `?slug=${slug}` : ''}`;
  const options = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchDataV2<{data: QuestionsType}>({ path, options });

  return res?.data;
};
