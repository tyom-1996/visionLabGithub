import { fetchData, getFile } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { UseCaseDetailsType, UseCasePageType } from '@/types/components/useCases';

export const getUseCasesData = async () => {
  const path = ApiUrl.USE_CASES;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: UseCasePageType}>({ path, revalidateOptions });
  return res?.data;
};

export const getOneUseCase = async (code: string) => {
  const path = ApiUrl.USE_CASE_ONE.replace(':code', `${code}`);
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: UseCaseDetailsType}>({ path, revalidateOptions });
  const data = res?.data;

  if (!data) {
    return;
  }

  const parsedLottieFile = await getFile(data?.solving_problems?.lottie_file);
  const updatedRes = {
    ...data,
    solving_problems: {
      ...data?.solving_problems,
      parsedLottieFile,
    },
  };

  return updatedRes;
};
