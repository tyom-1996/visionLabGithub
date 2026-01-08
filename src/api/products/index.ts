import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { ProductDetailsType, ProductsPageType } from '@/types/components/product';

export const getProductsData = async () => {
  const path = ApiUrl.PRODUCTS;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: ProductsPageType}>({ path, revalidateOptions });

  return res?.data;
};

export const getOneProduct = async (code: string) => {
  const path = ApiUrl.PRODUCT_ONE.replace(':code', `${code}`);
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: ProductDetailsType}>({ path, revalidateOptions });

  return res?.data;
};
