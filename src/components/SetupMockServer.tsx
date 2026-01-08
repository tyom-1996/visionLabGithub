'use client';
import { useEffect } from 'react';
import startMockServer from '../../mirage';

export function SetupMockServer() {
  useEffect(() => {
    const isMockServerUse =
      process.env.NEXT_PUBLIC_IS_MOCK_SERVER_USE === 'true' && typeof window !== 'undefined';

    if (isMockServerUse) {
      startMockServer();
    }
  }, []);

  return null;
}
