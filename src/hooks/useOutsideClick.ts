import { useEffect } from 'react';

type Args = {
  ref?: React.RefObject<HTMLElement | null>,
  callback: () => void,
}

const useOutsideClick = ({ ref, callback }: Args) => {
  const handleClick = (event: Event) => {
    if (!event.target) {
      return;
    }

    const target = event.target as HTMLElement;

    if (ref?.current && !ref.current.contains(target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
