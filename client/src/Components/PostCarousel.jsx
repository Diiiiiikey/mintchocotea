import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Images from './Images';
import { useState } from 'react';

function PostCarousel({ items, handleClick }) {
  const [border, setBorder] = useState(items[0].url);
  const [isIdx, setIsIdx] = useState(1);
  const settings = {
    focusOnSelect: true,
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    slidesToShow: Number(`${items.length > 5 ? 5 : items.length}`), // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Number(`${items.length > 4 ? 4 : items.length}`),
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Number(`${items.length > 3 ? 3 : items.length}`),
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: Number(`${items.length > 2 ? 2 : items.length}`),
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: Number(`${items.length > 4 ? 4 : items.length}`),
        },
      },
      {
        breakpoint: 625,
        settings: {
          slidesToShow: Number(`${items.length > 3 ? 3 : items.length}`),
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: Number(`${items.length > 2 ? 2 : items.length}`),
        },
      },
    ],
  };

  const handleBorder = idx => {
    setBorder(items[idx].url);
    setIsIdx(idx + 1);
  };

  return (
    <>
      <StyledSlider {...settings}>
        {items.map((item, idx) => (
          <ImageContainer
            border={item.url === border}
            key={item.url + idx}
            onClick={() => {
              handleClick(idx);
              handleBorder(idx);
            }}
          >
            <Images url={item.url} imageAlt={item.url} imgStyle="postCarousel" />
          </ImageContainer>
        ))}
      </StyledSlider>
      <StyledCountContainer>
        <StyledCount>
          {isIdx} / {items.length}
        </StyledCount>
      </StyledCountContainer>
    </>
  );
}

const StyledSlider = styled(Slider)`
  max-width: 40rem;
  width: 100%;

  @media screen and (max-width: 1280px) {
    max-width: 32rem;
  }
  @media screen and (max-width: 1024px) {
    max-width: 24rem;
  }
  @media screen and (max-width: 800px) {
    max-width: 16rem;
  }
  @media screen and (max-width: 700px) {
    max-width: 32rem;
  }
  @media screen and (max-width: 625px) {
    max-width: 24rem;
  }

  @media screen and (max-width: 500px) {
    max-width: 16rem;
  }

  .slick-track {
    display: flex;
    justify-content: center;
  }
  .slick-slide {
    max-width: fit-content;
    width: 100%;
    padding: 0.5rem;
  }
  .slick-prev {
    top: 3rem;
    left: -2rem;
    z-index: 2;
  }

  .slick-prev:before {
    font-size: 1.8rem;
    color: #000;
    opacity: 0.3;
  }

  .slick-next {
    top: 3rem;
    right: -1.4rem;
    z-index: 2;
  }

  .slick-next:before {
    font-size: 1.8rem;
    color: #000;
    opacity: 0.3;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 0.25rem;
  border: ${props => (props.border ? '3px solid #9fe4c5' : 'none')};

  cursor: pointer;
`;

const StyledCountContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StyledCount = styled.div`
  padding: 0.25rem 1rem;
  border-radius: 2rem;
  color: #fff;
  background-color: #cecece;
`;

export default PostCarousel;
