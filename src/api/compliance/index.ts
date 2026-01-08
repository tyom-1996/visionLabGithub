import { fetchData } from '../index';
import { ApiUrl } from '@/consts/apiUrl';
import { REVALIDATE_TIME } from '@/consts';
import { ComplianceType } from '@/types/components/compliance';

export const getComplianceData = async () => {
  const path = ApiUrl.COMPLIANCE;
  const revalidateOptions = { next: { revalidate: REVALIDATE_TIME.ONE_HOUR } };
  const res = await fetchData<{data: ComplianceType}>({ path, revalidateOptions });

  return res?.data;
};
