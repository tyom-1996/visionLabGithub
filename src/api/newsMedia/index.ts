import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { NewsMediaDetailsType, NewsMediaListResponseType } from '@/types/components/newsMedia';

export const getNewsMediaData = async ({ pageCount = 1 }: { pageCount?: number } = {}) => {
  const path = `${ApiUrl.NEWS_MEDIA}/?page=${pageCount}`;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<NewsMediaListResponseType>({ path, revalidateOptions });

  return res ?? undefined;
};

export const getOneNewsMedia = async (code: string) => {
  const path = ApiUrl.NEWS_MEDIA_ONE.replace(':code', `${code}`);
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: NewsMediaDetailsType}>({ path, revalidateOptions });

  return res?.data;
};
