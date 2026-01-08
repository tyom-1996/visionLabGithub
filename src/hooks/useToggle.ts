import { useState } from 'react';

const useToggle = () => {
  const [isOpened, setIsOpened] = useState(false);

  const close = () => {
    setIsOpened(false);
  };

  const open = () => {
    setIsOpened(true);
  };

  return { isOpened, open, close };
};

export default useToggle;
