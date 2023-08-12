import Typographies from 'Components/Typographies';
// import Images from 'Components/Images';
import SmallCarousel from 'Components/SmallCarousel';
import styled from 'styled-components';
import Tags from 'Components/Tags';

function CommissionListSingleModule({ info, handleClick }) {
  return (
    <StyledSummaryBox onClick={handleClick} id={info.commissionId}>
      <SmallCarousel items={info.imageUrl} />
      <TextContainer>
        <Typographies text={info.title} typoStyle="title_2" line="1" />
        <Typographies text={info.subContent} typoStyle="base" line="1" />
        <StyledTagsContainer>
          <Tags tags={info.tags} where="list" varient="span" />
        </StyledTagsContainer>
      </TextContainer>
    </StyledSummaryBox>
  );
}

const StyledSummaryBox = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  gap: 1.5rem;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.5rem 0 #999999;

  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const StyledTagsContainer = styled.div`
  margin-top: 0.5rem;
`;

export default CommissionListSingleModule;
