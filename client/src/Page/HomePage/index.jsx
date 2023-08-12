import styled from 'styled-components';
import Carousel from 'Components/Carousel';
import Commissions from 'Components/Commissions';
import AdComponent from 'Components/AdComponent';
import LoadingComponent from 'Components/LoadingComponent';
import { Container } from 'Container/Container';
import { useEffect, useState } from 'react';
import { getCommissionsFn, getTagsCommissionsFn } from 'customHook/getCommissionFetch';
import { getCommissions } from 'apis/api/commissions';
import ToTheTop from 'Components/ToTheTop';

function Home() {
  const [carouselBackground, setCarouselBackground] = useState(null);

  const changeCarouselImage = target => {
    setCarouselBackground(target);
  };

  const commissionsFilterdCommissionId = getCommissionsFn('commissionId', 10);
  const commissionsFilterdViewCount = getCommissionsFn('viewCount', 10);
  const { tagsCommissions, tag, loading } = getTagsCommissionsFn();

  useEffect(() => {
    const fetch = async () => {
      const data = await getCommissions('commissionId');
      setCarouselBackground(data[0].imageUrl[1]);
    };
    fetch();
  }, [setCarouselBackground]);

  return (
    <Container>
      {loading || !commissionsFilterdCommissionId[0] || !commissionsFilterdViewCount[0] ? (
        <LoadingComponent />
      ) : (
        <Contents>
          <CarouselBox>
            <Carousel
              items={[
                commissionsFilterdCommissionId[0],
                commissionsFilterdViewCount[0],
                tagsCommissions[0],
              ]}
              changeCarouselImage={changeCarouselImage}
              tag={tag}
            />
          </CarouselBox>
          <CarouselBoxBackground url={carouselBackground} />
          <SellContainer>
            <Commissions commissions={commissionsFilterdCommissionId} text="새로운 커미션" />
            <AdComponent />
            <Commissions commissions={commissionsFilterdViewCount} text="인기 커미션" />
            <Commissions commissions={tagsCommissions} text="추천 태그 커미션:" tag={tag} />
          </SellContainer>
        </Contents>
      )}
      <ToTheTop />
    </Container>
  );
}

const Contents = styled.div`
  display: grid;
  width: 100%;
  justify-items: center;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(auto, minmax(3.5rem, auto));
  gap: 5rem 0;
`;

const CarouselBox = styled.div`
  display: grid;
  justify-content: center;
  grid-column: 1 / span 12;
  grid-row: 1 / span 1;
  margin-bottom: 3rem;
`;

const CarouselBoxBackground = styled.div.attrs(props => ({
  url: props.url,
}))`
  width: 100%;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: 100%;
  grid-column: 1 / span 12;
  grid-row: 1 / span 1;
  filter: blur(2rem);
  opacity: 90%;
  z-index: -2;
`;

const SellContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 1 / span 12;
  flex-wrap: wrap;
  gap: 5rem;
`;

export default Home;
