import { isInViewportArea } from '@/utils/helpers';
import { useState, useEffect } from 'react';

type Props = {
  ref: React.RefObject<HTMLElement | HTMLElement[] | null>,
  area?: number,
  options?: IntersectionObserverInit,
  once?: boolean,
  callback?: (entry: HTMLElement, ratio: number) => void,
}

const useInViewport = ({ ref, area = 0, options = {}, once = false, callback }: Props) => {
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  useEffect(() => {
    // Флаг если получили массив элементов
    const IsArray = Array.isArray(ref.current);

    if (!ref.current || (IsArray && ref.current.length === 0)) {
      return;
    }

    // Проверяем поддержку IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver is not supported in this browser');
      // Fallback
      if (IsArray) {
        ref.current.filter(el => Boolean(el)).forEach(el => setIsInViewport(isInViewportArea(el, area)));
      } else {
        setIsInViewport(isInViewportArea(ref.current, area));
      }
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: area,
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsInViewport(entry.isIntersecting);

        // Вызов колбэка при пересечении
        if (entry.isIntersecting && callback) {
          callback(entry.target as HTMLElement, entry.intersectionRatio);
        }

        // Однократное срабатывание
        if (entry.isIntersecting && once) {
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      });
    }, observerOptions);

    if (IsArray) {
      ref.current.filter(el => Boolean(el)).forEach(el => observer.observe(el));
    } else {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return isInViewport;
};

export default useInViewport;
