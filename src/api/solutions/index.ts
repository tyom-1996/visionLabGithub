import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { SolutionDetailsType, SolutionsPageType } from '@/types/components/solutions';

export const getSolutionsData = async () => {
  const path = ApiUrl.SOLUTIONS;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: SolutionsPageType}>({ path, revalidateOptions });

  return res?.data;
};

export const getOneSolution = async (code: string) => {
  const path = ApiUrl.SOLUTIONS_ONE.replace(':code', `${code}`);
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: SolutionDetailsType}>({ path, revalidateOptions });

  return res?.data;
};
