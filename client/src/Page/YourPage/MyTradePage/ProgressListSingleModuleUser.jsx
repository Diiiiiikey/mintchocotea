import styled from 'styled-components';
import Typographies from 'Components/Typographies';
import Buttons from 'Components/Buttons';
import { useState, useEffect } from 'react';
import ReviewModal from './ReviewModal';
import LoadingComponent from 'Components/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import SmallCarousel from 'Components/SmallCarousel';
import mouseHover from 'customHook/mouseHover';

function ProgressListSingleModuleUser({ info }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const navigate = useNavigate();

  const openReviewerHandler = () => {
    setIsOpen(!isOpen);
  };

  const clickedOpen = () => {
    navigate(`/form/${info.tradeId}`, {
      state: {
        name: info.commission.memberName,
        createdAt: info.createdAt.substr(0, 10),
        who: 'user',
        title: info.title,
        content: info.content,
      },
    });
  };

  const { handleMouseEnter, handleMouseLeave, isHovered } = mouseHover();

  const windowResize = () => {
    const width = window.innerWidth;
    if (width < 700) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }
  };

  const resizeRender = () => {
    if (isSmall) {
      return (
        <StyledComponentContainer status={info.status}>
          <StyledCommission_ClientContainer>
            <StyledCommissionContainer>
              <Typographies text={info.commission.title} variant="h4" typoStyle="base" line="1" />
              <SmallCarousel items={info.commission.imageUrl} />
            </StyledCommissionContainer>
            <StyledHr />
            <StyledClientContainer isSmall={isSmall}>
              <StyledClient>
                <Typographies text="커미션주:" typoStyle="base_2" />
                <Typographies text={info.commission.memberName} typoStyle="name_2" />
              </StyledClient>
              <Typographies text={info.createdAt.substr(0, 10)} typoStyle="base_2" />
            </StyledClientContainer>
          </StyledCommission_ClientContainer>
          <StyledHr />

          <StyledFormContainer
            onClick={clickedOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Typographies
              text={info.title}
              typoStyle="title_2"
              variant="h3"
              line="1"
              color="gray_3"
            />
            <StyledSubContentContainer isSmall={isSmall}>
              <Typographies text={info.content} typoStyle="base" line="7" color="gray_3" />
            </StyledSubContentContainer>
            <StyledExplainClick isHovered={isHovered} isSmall={isSmall}>
              <Typographies
                text="클릭하면 신청 내용을 확인할 수 있습니다."
                typoStyle="base"
                size="s"
                color="mint_1"
              />
            </StyledExplainClick>
          </StyledFormContainer>
        </StyledComponentContainer>
      );
    } else {
      return (
        <StyledComponentContainer status={info.status}>
          <StyledCommissionContainer>
            <Typographies text={info.commission.title} variant="h4" typoStyle="base" line="1" />
            <SmallCarousel items={info.commission.imageUrl} />
          </StyledCommissionContainer>
          <StyledHr />
          <StyledFormContainer
            onClick={clickedOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Typographies
              text={info.title}
              typoStyle="title_2"
              variant="h3"
              line="1"
              color="gray_3"
            />
            <StyledSubContentContainer>
              <Typographies text={info.content} typoStyle="base" line="3" color="gray_3" />
            </StyledSubContentContainer>
            <StyledExplainClick isHovered={isHovered}>
              <Typographies
                text="클릭하면 신청 내용을 확인할 수 있습니다."
                typoStyle="base"
                size="s"
                color="mint_1"
              />
            </StyledExplainClick>
          </StyledFormContainer>
          <StyledHr />
          <StyledClientContainer>
            <StyledClient>
              <Typographies text="커미션주:" typoStyle="base_2" />
              <Typographies text={info.commission.memberName} typoStyle="name_2" />
            </StyledClient>
            <Typographies text={info.createdAt.substr(0, 10)} typoStyle="base_2" />
          </StyledClientContainer>
        </StyledComponentContainer>
      );
    }
  };

  useEffect(() => {
    windowResize();
    window.addEventListener(`resize`, windowResize);
    return () => {
      window.removeEventListener(`resize`, windowResize);
    };
  }, []);

  return (
    <>
      {info ? (
        <StyledContainer>
          {resizeRender()}
          {info.status === '완료' ? (
            <StyledButtonContainer>
              <Buttons
                text="리뷰작성"
                handleClick={openReviewerHandler}
                buttonStyle="write"
                margin="0.5rem 0"
              />
              {isOpen === true ? <ReviewModal openReviewerHandler={openReviewerHandler} /> : null}
            </StyledButtonContainer>
          ) : null}
        </StyledContainer>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCommission_ClientContainer = styled.div``;

const StyledComponentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  border: 1px solid #cecece;
  border-radius: 0.25rem;
  background-color: #fff;
`;

const StyledCommissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding: 1rem 1rem 0.5rem 1rem;
  gap: 0.5rem;
`;

const StyledFormContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  flex: 20;
  padding: 1rem 1rem 0.5rem 1rem;
  gap: 0.5rem;
`;

const StyledSubContentContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  height: ${props => (props.isSmall ? '75%' : '65%')};
  background-color: #f6f6f6;
`;

const StyledExplainClick = styled.div`
  display: ${props => (props.isHovered ? 'flex' : 'none')};
  width: 100%;
  position: absolute;
  bottom: ${props => (props.isSmall ? '0.5rem' : '0.1rem')};
  left: 50%;
  margin-left: 1rem;
  transform: translate(-50%, 0);
`;

const StyledClientContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  height: 100%;
  padding: 1rem 1rem 0.5rem 1rem;
  gap: ${props => (props.isSmall ? '1rem' : '2.5rem')};
`;

const StyledClient = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const StyledButtonContainer = styled.div``;

const StyledHr = styled.hr`
  display: flex;
  align-self: normal;
  opacity: 0.3;
`;

export default ProgressListSingleModuleUser;
