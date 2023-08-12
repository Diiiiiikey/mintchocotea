import { useEffect, useState } from 'react';

const useScroll = () => {
  const [isY, setY] = useState(0);
  const handleScroll = () => {
    setY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  return isY;
};

export default useScroll;
