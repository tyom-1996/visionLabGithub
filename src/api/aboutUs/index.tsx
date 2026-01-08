import { fetchData, getFile } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { AboutUsPageDataType } from '@/types/components/aboutUs';

export const getAboutUsPageData = async () => {
  const path = ApiUrl.ABOUT_US;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: AboutUsPageDataType}>({ path, revalidateOptions });
  const data = res?.data;

  if (!data) {
    return;
  }

  const parsedLottieFile = await getFile(data?.about?.lottie);
  const updatedRes = {
    ...data,
    about: {
      ...data?.about,
      parsedLottieFile,
    },
  };

  return updatedRes;
};
