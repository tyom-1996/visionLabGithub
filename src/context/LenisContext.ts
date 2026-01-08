'use client';

import { createContext, useContext, MutableRefObject } from 'react';
import type { LenisRef } from 'lenis/react';

export const LenisContext = createContext<MutableRefObject<LenisRef | null> | null>(null);

export const useLenis = () => useContext(LenisContext);
