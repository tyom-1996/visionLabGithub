'use client';

import ServerError from '@/components/sections/ServerError';

type Props = {
  error: Error & { digest?: string },
  reset: () => void,
};

export default function ErrorPage({ error }: Props) {
  return <ServerError error={error} />;
}