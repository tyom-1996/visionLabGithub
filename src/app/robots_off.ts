// TODO: по просьбе заменили на файл robots.txt
import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Yandex',
        allow: '/',
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
