import NotFounf from '@/components/sections/NotFounf';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested page does not exist',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Page not found',
    description: 'The requested page does not exist',
  },
};

export default NotFounf;
