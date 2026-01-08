import { getAdditionalData } from '@/api/additionalData';
import { getNavigationData } from '@/api/navigation';
import Footer from '.';
import { headers } from 'next/headers';

const FooterWrapper = async () => {
  const additionalData = await getAdditionalData();
  const navigation = await getNavigationData();
  const siteUrl = (await headers()).get('host') || '';

  return (
    <Footer additionalData={additionalData} navigation={navigation} siteUrl={siteUrl} />
  );
};

export default FooterWrapper;
