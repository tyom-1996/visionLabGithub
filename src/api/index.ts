import { IS_CACHE_ENABLE, IS_MOCKED_RESPONSE_USE } from '@/consts';
import { ApiUrl } from '@/consts/apiUrl';
import { mocks } from '@/mocks/api';
import { toast } from 'react-toastify';

type FetchDataArgs = {
  path: string,
  options?: RequestInit;
  revalidateOptions?: RequestInit;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showToast = (error: any) => {
  if (typeof window === 'undefined') {
    return;
  }

  // Если с бека пришли подробности об ошибке
  const isHaveMessageObject = error?.message && typeof error.message === 'object';
  if (isHaveMessageObject) {
    Object.keys(error.message).forEach(key => {
      toast.error(`${key}: ${error.message[key]}`);
    });
    return;
  }

  // Если ошибки передаются в виде объекта
  if (typeof error === 'object') {
    Object.keys(error).forEach(key => {
      toast.error(`${key}: ${error[key]}`);
    });
    return;
  }

  // Если ошибки передаются в виде массива
  if (Array.isArray(error)) {
    error.forEach((error: string) => {
      toast.error(error);
    });
    return;
  }

  toast.error(`Oops, something went wrong. ${error}`);
};

export const fetchData = async <T>({ path, options, revalidateOptions }: FetchDataArgs): Promise<T | null> => {
  try {
    // Используем моки, чтобы показать заказчику готовый UI и параллельно разрабатывать функционал
    if (IS_MOCKED_RESPONSE_USE) {
      // Ищем мок-данные по пути
      const mockPath = path
        .replace(/\?.*/, '') // Убираем параметры запроса
        .replace(/\/$/, '') // Убираем завершающий слеш
        .replace(/^\/([^/]+)\/([^/]+)$/, '/$1/:code'); // Заменяем второй сегмент на :code
      const mockData = mocks[mockPath as keyof typeof mocks];

      if (mockData) {
        const result = 'data' in mockData ? mockData : { data: mockData };
        return result as T;
      } else {
        console.error(`Mock data not found for path: ${path}`);
        return null;
      }
    }

    if (!ApiUrl.MAIN) {
      return null;
    }
    const url = `${ApiUrl.API_BASE_URL}${path}/`;

    const baseHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const cacheControlHeaders = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    };
    const optionsWithCache = { headers: baseHeaders, ...options, ...revalidateOptions };
    const optionsWithOutCache = { headers: { ...baseHeaders, ...cacheControlHeaders }, ...options };
    const fetchOptions = IS_CACHE_ENABLE ? optionsWithCache : optionsWithOutCache;

    const response = await fetch(url, fetchOptions);
    const data = await response?.json();

    if (!response.ok) {
      throw data || `Error ${response?.status}. ${response?.statusText}`;
    }

    return data;
  } catch (error) {
    console.error(error);
    showToast(error);
    return null;
  }
};

// TODO: привести в порядок hotfix. Убрать fetchDataV2 вразница в слэше в конце урла
export const fetchDataV2 = async <T>({ path, options }: FetchDataArgs): Promise<T | null> => {
  try {
    // Используем моки, чтобы показать заказчику готовый UI и параллельно разрабатывать функционал
    if (IS_MOCKED_RESPONSE_USE) {
      // Ищем мок-данные по пути
      const mockPath = path
        .replace(/\?.*/, '') // Убираем параметры запроса
        .replace(/\/$/, '') // Убираем завершающий слеш
        .replace(/^\/([^/]+)\/([^/]+)$/, '/$1/:code'); // Заменяем второй сегмент на :code
      const mockData = mocks[mockPath as keyof typeof mocks];

      if (mockData) {
        const result = 'data' in mockData ? mockData : { data: mockData };
        return result as T;
      } else {
        console.error(`Mock data not found for path: ${path}`);
        return null;
      }
    }

    if (!ApiUrl.MAIN) {
      return null;
    }
    const url = `${ApiUrl.API_BASE_URL}${path}`;

    const baseHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const cacheControlHeaders = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    };
    const optionsWithCache = { headers: baseHeaders, ...options };
    const optionsWithOutCache = { headers: { ...baseHeaders, ...cacheControlHeaders } };
    const fetchOptions = IS_CACHE_ENABLE ? optionsWithCache : optionsWithOutCache;

    const response = await fetch(url, fetchOptions);
    const data = await response?.json();

    if (!response.ok) {
      throw data || `Error ${response?.status}. ${response?.statusText}`;
    }

    return data;
  } catch (error) {
    console.error(error);
    showToast(error);
    return null;
  }
};

export const getFile = async (filePath?: string): Promise<unknown | undefined> => {
  try {
    if (!filePath) {
      return;
    }

    const url = ApiUrl.MAIN + filePath;
    const response = await fetch(`${IS_MOCKED_RESPONSE_USE ? process.env.NEXT_PUBLIC_SITE_URL : ''}${url}`);
    const data = await response?.json();
    return data;
  } catch (error) {
    console.error('Error retrieving file: ', error);
    showToast(error);
  }
};
