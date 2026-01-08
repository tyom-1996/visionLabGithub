import { isInViewportArea, throttle } from '@/utils/helpers';
import { useEffect, useState } from 'react';

type Props = {
  ref: React.RefObject<HTMLElement | null>,
  bottom?: number,
}

const useBlockIsVisible = ({ ref, bottom = 1 }: Props) => {
  const [isBlockAnimated, setBlockAnimated] = useState<boolean>(false);

  useEffect(() => {
    if (!ref) {
      return;
    }

    const handleScroll = () => {
      const blockInViewport = isInViewportArea(ref.current, bottom);
      setBlockAnimated(blockInViewport);
    };

    if (typeof window !== 'undefined') {
      const throttleHandleScroll = throttle(handleScroll, 100);

      handleScroll();
      window.addEventListener('scroll', throttleHandleScroll);

      return () => {
        window.removeEventListener('scroll', throttleHandleScroll);
      };
    }
  }, [isBlockAnimated]);

  return isBlockAnimated;
};

export default useBlockIsVisible;
