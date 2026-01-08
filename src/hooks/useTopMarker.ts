import { useState, useEffect } from 'react';

const useTopMarker = () => {
  const [isOnTop, setIsOnTop] = useState<boolean>(true);

  useEffect(() => {
    const topMarker = document.createElement('div');
    topMarker.style.position = 'absolute';
    topMarker.style.top = '0';
    topMarker.style.height = '1px';
    document.body.prepend(topMarker);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsOnTop(entry.isIntersecting);
      });
    }, {
      root: null,
      threshold: 1,
    });

    observer.observe(topMarker);

    return () => {
      observer.disconnect();
      topMarker.remove();
    };
  }, []);

  return isOnTop;
};

export default useTopMarker;
