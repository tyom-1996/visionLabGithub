import { fetchData, getFile } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { MainPageDataType } from '@/types/components/mainPage';

export const getMainPageData = async () => {
  const path = ApiUrl.MAIN_PAGE;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: MainPageDataType}>({ path, revalidateOptions });
  const data = res?.data;

  // Выгружаем lottie файлы в объект parsedLottieFile
  const updatedAchievements = await Promise.all(data?.achievements?.map(async (achievement) => {
    const parsedLottieFile = await getFile(achievement.json);

    return {
      ...achievement,
      parsedLottieFile,
    };
  }) ?? []);

  const updatedData = {
    ...data,
    achievements: updatedAchievements,
  };

  return updatedData;
};
