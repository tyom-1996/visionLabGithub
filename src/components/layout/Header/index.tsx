import { getNavigationData } from '@/api/navigation';
import ClientHeader from './ClientHeader';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const ServerHeader = async () => {
  const navigation = await getNavigationData();

  const headerSchema = {
    '@context': 'https://schema.org',
    '@type': 'WPHeader',
    headline: 'VisionLabs',
    description: 'Website header with a navigation menu and logo',
    url: siteUrl,
    image: `${siteUrl}/content/logo/header-logo.svg`,
  };

  return (
    <>
      <script
        id='header-schema'
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(headerSchema),
        }}
      />
      <ClientHeader navigation={navigation || []} />
    </>
  );
};

export default ServerHeader;
