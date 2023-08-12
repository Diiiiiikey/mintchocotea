import { useState } from 'react';

const mouseHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return { handleMouseEnter, handleMouseLeave, isHovered };
};

export default mouseHover;
