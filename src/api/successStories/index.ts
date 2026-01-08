import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { SuccessStoryesPageType } from '@/types/components/successStories';

export const getSuccessStoriesData = async () => {
  const path = ApiUrl.SUCCESS_STORIES;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: SuccessStoryesPageType}>({ path, revalidateOptions });

  return res?.data;
};
