import Typographies from 'Components/Typographies';
import styled from 'styled-components';
import { Viewer } from '@toast-ui/react-editor';

function TradeModuleBox({ info }) {
  return (
    <StyledSummaryBox>
      <Typographies text="신청할 커미션의 상세내용" typoStyle="title_2" />
      <StyledSection>
        <Viewer initialValue={info.commission.content} />
      </StyledSection>
    </StyledSummaryBox>
  );
}

const StyledSummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledSection = styled.div`
  padding: 3rem 2rem;
  gap: 1rem;
  background-color: #f6f6f6;
`;

export default TradeModuleBox;
