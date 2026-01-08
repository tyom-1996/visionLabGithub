import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { PartnersType } from '@/types/components/partners';

export const getPartnersData = async ({ pageCount = 1 }: { pageCount?: number } = {}) => {
  const path = `${ApiUrl.PARTNERS}/?page=${pageCount}`;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{ data: PartnersType }>({ path, revalidateOptions });

  return res?.data;
};
