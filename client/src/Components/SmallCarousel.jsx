import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Images from './Images';

function SmallCarousel({ items }) {
  const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    arrows: true,
  };

  const filtered = items.filter((el, idx) => {
    return idx % 2 === 1 ? el : null;
  });

  return (
    <Container onClick={e => e.stopPropagation()}>
      <StyledSlider {...settings}>
        {filtered.map(item => {
          return (
            <ImageContainer key={item}>
              <Images url={item} imageAlt={item} imgStyle="smallCarousel" />
            </ImageContainer>
          );
        })}
      </StyledSlider>
    </Container>
  );
}

const Container = styled.div`
  &:hover {
    .slick-prev:before,
    .slick-next:before {
      display: flex;
    }
  }
`;

const StyledSlider = styled(Slider)`
  width: 8rem;

  .slick-prev {
    top: 3rem;
    left: -0.1rem;
    z-index: 2;
  }

  .slick-prev:before {
    display: none;
    font-size: 1.8rem;
    color: #000;
    opacity: 0.2;
  }

  .slick-next {
    top: 3rem;
    right: 0.5rem;
    z-index: 2;
  }

  .slick-next:before {
    display: none;
    font-size: 1.8rem;
    color: #000;
    opacity: 0.2;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
`;

export default SmallCarousel;
