import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { AdditionalInfo } from '@/types/components/additionalInfo';

export const getAdditionalData = async () => {
  const path = ApiUrl.BLOCKS;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: AdditionalInfo}>({ path, revalidateOptions });

  return res?.data;
};
