import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { NavigationDataType } from '@/types/components/navigation';

export const getNavigationData = async () => {
  const path = ApiUrl.MENU;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: NavigationDataType[]}>({ path, revalidateOptions });

  return res?.data || [];
};
