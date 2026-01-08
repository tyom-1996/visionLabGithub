import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { DocumentationPageType } from '@/types/components/documentation';

export const getDocumentationData = async () => {
  const path = ApiUrl.DOCUMENTATION;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: DocumentationPageType}>({ path, revalidateOptions });

  return res?.data;
};
