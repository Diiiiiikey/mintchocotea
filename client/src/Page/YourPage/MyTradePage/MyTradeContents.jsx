import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getTradesFn } from 'customHook/getTradeFetch';
import ProgressListModule from './ProgressListModule';

function MyTradeContents({ info, isClicked }) {
  const isPage = 1;
  const { id } = useParams();

  const authorData = { email: info.email, page: isPage };
  const memberData = { memberId: id, page: isPage };

  let tradeInfo;

  if (info.roles[0] === 'AUTHOR') {
    tradeInfo = getTradesFn(authorData);
  } else {
    tradeInfo = getTradesFn(memberData);
  }

  const filtered = isClicked.indexOf(true);

  return (
    <StyledContentContainer>
      {tradeInfo[0] && (
        <ProgressListModule infos={Object.values(tradeInfo[filtered])[0]} role={info.roles[0]} />
      )}
    </StyledContentContainer>
  );
}

const StyledContentContainer = styled.div`
  display: flex;
  padding: 3rem;
  border: 1px solid #cae4d8;
  border-top: none;
`;

export default MyTradeContents;
