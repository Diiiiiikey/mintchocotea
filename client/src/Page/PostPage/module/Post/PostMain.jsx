import Typographies from 'Components/Typographies';
import styled from 'styled-components';
import { getreviewsFn } from 'customHook/getReviewFetch';
import LoadingComponent from 'Components/LoadingComponent';
import ReviewList from './ReviewList';
import Buttons from 'Components/Buttons';
import { useEffect, useState, useRef } from 'react';
import { Viewer } from '@toast-ui/react-editor';

export function PostMain({ commission }) {
  const [scroll, setScroll] = useState('detail');

  const { reviews, loading } = getreviewsFn(commission.commissionId);
  const detailInfoRef = useRef();
  const reveiwRef = useRef();

  const handleDetailInfoClick = () => {
    detailInfoRef.current.scrollIntoView({
      block: 'start',
    });
    window.scrollTo(0, detailInfoRef.current.offsetTop - 160);
  };

  const handleReveiwRefoClick = () => {
    reveiwRef.current.scrollIntoView({
      block: 'start',
    });
    window.scrollTo(0, reveiwRef.current.offsetTop - 160);
  };

  const handleScroll = () => {
    if (window.scrollY >= reveiwRef.current.offsetTop - 161) {
      setScroll('review');
    } else {
      setScroll('detail');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  return (
    <StyledContainer>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <StyledMenubarContainer>
            <StyledMenubar scroll={scroll} id="detail">
              <Buttons
                text="상세설명"
                buttonStyle="long"
                color={scroll === 'detail' ? 'white' : 'choco_2'}
                backgroundColor="transparent"
                handleClick={handleDetailInfoClick}
              />
            </StyledMenubar>
            <StyledMenubar scroll={scroll} id="review">
              <Buttons
                text="리뷰"
                buttonStyle="long"
                color={scroll === 'review' ? 'white' : 'choco_2'}
                backgroundColor="transparent"
                handleClick={handleReveiwRefoClick}
              />
            </StyledMenubar>
          </StyledMenubarContainer>
          <StyledPostMainMenuContainer>
            <div ref={detailInfoRef}>
              <Typographies text="상세설명" typoStyle="title_2" />
            </div>
            <Viewer initialValue={commission.content} />
          </StyledPostMainMenuContainer>
          <StyledHr />
          <StyledPostMainMenuContainer>
            <div ref={reveiwRef}>
              <Typographies text="리뷰" typoStyle="title_2" />
            </div>
            {reviews.length === 0 ? (
              <Typographies text="등록된 리뷰가 없습니다." typoStyle="base_2" />
            ) : (
              <>
                {reviews.map(el => {
                  return <ReviewList info={el} key={el.writer + el.date} />;
                })}
              </>
            )}
          </StyledPostMainMenuContainer>
          <StyledHr />
        </>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledMenubarContainer = styled.nav`
  display: flex;
  position: sticky;
  top: 5rem;
  z-index: 9;
  border-radius: 0.25rem;
  border: 1px solid #8e785c;
`;

const StyledMenubar = styled.div`
  display: flex;
  height: 3rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.scroll === props.id ? '#8e785c' : 'white')};
  border-radius: 0.25rem;
`;

const StyledPostMainMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  padding: 1rem;
  gap: 1rem;
  border-radius: 0.25rem;
`;

const StyledHr = styled.hr`
  display: flex;
  opacity: 0.7;
  border-color: #9fe4c5;
`;
