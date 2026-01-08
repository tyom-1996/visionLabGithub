import { useRef, useCallback, MutableRefObject } from 'react';

const useArrayRef = <T>(): [MutableRefObject<T[]>, (index: number) => (element: T | null) => void] => {
  const refs = useRef<T[]>([]);

  const setRef = useCallback((index: number) => (element: T | null) => {
    if (element) {
      refs.current[index] = element;
    }
  }, []);

  return [refs, setRef];
};

export default useArrayRef;
