import { toast } from 'react-toastify';
import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { SuccessResponseType } from '@/types/api';
import { ApplicationFormResponse } from '@/types/components/applicationForm';
import { FormRequestBody } from './types';

export const postApplicationForm = async (body: FormRequestBody) => {
  const path = ApiUrl.FORM;
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  const res = await fetchData<SuccessResponseType>({ path, options });

  if (res?.data?.message) {
    toast.success(res.data.message);
  }

  return res;
};

export const getApplicationForm = async () => {
  const path = ApiUrl.FORM;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: ApplicationFormResponse}>({ path, revalidateOptions });

  return res?.data;
};
