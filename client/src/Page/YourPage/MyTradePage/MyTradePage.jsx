import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getMemberInfoFn } from 'customHook/getMemberInfoFetch';
import LoadingComponent from 'Components/LoadingComponent';
import { Container } from 'Container/Container';
import MyTradeListButtons from './MyTradeListButtons';
import Typographies from 'Components/Typographies';
import MyTradeContents from './MyTradeContents';
import ToTheTop from 'Components/ToTheTop';

function MyTradePage() {
  const [isClicked, setIsClicked] = useState([true, false, false]);
  const { id } = useParams();
  const { currentMemberInfo, loading } = getMemberInfoFn(id);

  const buttons = () => {
    if (currentMemberInfo === 'USER') {
      return ['신청받은 커미션', '진행중인 커미션', '종료된 커미션'];
    } else {
      return ['신청한 커미션', '진행중인 커미션', '종료된 커미션'];
    }
  };

  const handleClick = e => {
    const newClicked = [false, false, false];
    newClicked[e.target.id] = true;
    setIsClicked(newClicked);
  };

  return (
    <Container>
      <StyledContainer>
        <Typographies text="내 진행목록" typoStyle="title_1" margin="1rem 1rem 3rem 1rem" />
        {loading || !currentMemberInfo ? (
          <LoadingComponent />
        ) : (
          <>
            <StyledButtons>
              <StyeldBlank />
              {buttons().map((el, idx) => {
                return (
                  <MyTradeListButtons
                    text={el}
                    handleClick={handleClick}
                    isClicked={isClicked[idx]}
                    key={el}
                    idx={idx}
                  />
                );
              })}
              <StyeldBlank />
            </StyledButtons>
            <MyTradeContents info={currentMemberInfo} isClicked={isClicked} />
          </>
        )}
      </StyledContainer>
      <ToTheTop />
    </Container>
  );
}

const StyledContainer = styled.article`
  display: flex;
  max-width: 960px;
  width: 100%;
  align-self: center;
  flex-direction: column;
`;

const StyledButtons = styled.div`
  display: table;
  border-collapse: collapse;
`;

const StyeldBlank = styled.div`
  display: table-cell;
  max-width: 10rem;
  width: 20%;
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
  color: #9fe4c5;
  background-color: white;
  border-bottom: 2px solid #cae4d8;
  z-index: 1;
`;

export default MyTradePage;
