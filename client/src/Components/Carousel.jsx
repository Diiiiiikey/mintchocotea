import styled from 'styled-components';
import Slider from 'react-slick';
import Images from './Images';
import Typographies from './Typographies';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Carousel({ items, changeCarouselImage, tag }) {
  const navigate = useNavigate();
  const [img, setImg] = useState(0);

  const PrevArrow = ({ onClick }) => (
    <StyledPrevArrow onClick={onClick}>
      <IoIosArrowBack />
    </StyledPrevArrow>
  );

  const NextArrow = ({ onClick }) => (
    <StyledNextArroww onClick={onClick}>
      <IoIosArrowForward />
    </StyledNextArroww>
  );

  const settings = {
    dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    arrows: true,
    pauseOnHover: true,
    beforeChange: (_current, next) => {
      changeCarouselImage(items[next].imageUrl[1]);
      setImg(next);
    },
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleClick = item => {
    navigate(`/commission/${item.commissionId}`);
  };

  return (
    <Container>
      <Typographies
        variant="h1"
        text={
          (img === 0 && '새로운 커미션') ||
          (img === 1 && '인기 커미션') ||
          (img === 2 && `${tag} 태그 커미션`)
        }
        typoStyle="carousel"
        textShadow=" -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
      />

      <StyledSlider {...settings}>
        {items.map(item => {
          return (
            <ImageContainer key={item.commissionId} onClick={() => handleClick(item)}>
              <Images
                url={item.imageUrl[1]}
                imageAlt={item.imageUrl[1] + item.commissionId}
                imgStyle="carousel"
              />
            </ImageContainer>
          );
        })}
      </StyledSlider>
    </Container>
  );
}

const StyledPrevArrow = styled.button`
  position: absolute;
  left: -5rem;
  height: 100%;
  border: none;
  font-size: 5rem;
  background-color: rgba(0, 0, 0, 0.02);
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    background-color: rgba(86, 86, 86, 0.2);
  }

  &:active {
    transform: translate(1px, 2px);
  }
`;

const StyledNextArroww = styled(StyledPrevArrow)`
  left: auto;
  right: -5rem;
  top: 0;
`;

const Container = styled.div`
  max-width: 40rem;

  @media screen and (max-width: 800px) {
    max-width: 30rem;
  }

  @media screen and (max-width: 500px) {
    max-width: 20rem;
  }
`;

const StyledSlider = styled(Slider)`
  margin-top: 3rem;
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;

export default Carousel;
