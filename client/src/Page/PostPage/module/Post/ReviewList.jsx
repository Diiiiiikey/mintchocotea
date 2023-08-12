import Typographies from 'Components/Typographies';
import styled from 'styled-components';

function ReviewList({ info }) {
  return (
    <StyledSummaryBox>
      <Typographies text={info.content} typoStyle="base_2" color="gray_3" />
      <StyledWriterContainer>
        <Typographies text={info.writer} typoStyle="name_2" />
      </StyledWriterContainer>
      <StyledDateContainer>
        <Typographies text={info.date} typoStyle="base_2" />
      </StyledDateContainer>
    </StyledSummaryBox>
  );
}

const StyledSummaryBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #cecece;
  white-space: nowrap;
`;

const StyledWriterContainer = styled.div`
  display: flex;
  flex: 2;
`;

const StyledDateContainer = styled.div`
  display: flex;
  flex: 2;
`;

export default ReviewList;
