import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { ContactsType } from '@/types/components/contacts';

export const getContactsData = async () => {
  const path = ApiUrl.CONTACTS;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: ContactsType}>({ path, revalidateOptions });

  return res?.data;
};
