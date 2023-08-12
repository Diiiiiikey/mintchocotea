import PostCarousel from 'Components/PostCarousel';
import { useState } from 'react';
import styled from 'styled-components';
import { imageProcess } from 'utils/imageProcess';

export const PostImage = ({ commission }) => {
  const images = imageProcess(commission.imageUrl);
  const [currItem, setCurrItem] = useState(images[0].url);

  const onView = idx => {
    setCurrItem(images[idx].url);
  };

  return (
    <StyledContainer>
      <StyledThumnail src={currItem} alt={currItem} />
      <PostCarousel items={images} handleClick={onView} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  align-items: center;
`;

const StyledThumnail = styled.img`
  object-fit: contain;
  aspect-ratio: 4/3;
  width: 100%;
  max-width: 43rem;
  max-height: 43rem;
  width: 100%;
  height: 100%;
  border: 1px solid #cecece;
  border-radius: 0.25rem;
`;
