import styled from 'styled-components';
import ProgressListSingleModule from './ProgressListSingleModule';
import ProgressListSingleModuleUser from './ProgressListSingleModuleUser';
import Buttons from 'Components/Buttons';
import { useState } from 'react';
import { getTradeSubInfoFn } from 'customHook/getTradeSubInfoFetch';
import LoadingComponent from 'Components/LoadingComponent';
import Typographies from 'Components/Typographies';

export function ProgressListModule({ infos, role }) {
  const [isMore, setIsMore] = useState(false);

  const moreClicked = () => {
    setIsMore(!isMore);
  };

  const filteredInfos = getTradeSubInfoFn(infos);

  return (
    <StyledContainer>
      {filteredInfos && filteredInfos.length === infos.length ? (
        filteredInfos.length === 0 ? (
          <Typographies text="커미션이 없습니다." typoStyle="base" />
        ) : (
          <>
            {filteredInfos.map(filteredInfo =>
              role === 'USER' ? (
                <ProgressListSingleModuleUser key={filteredInfo.tradeId} info={filteredInfo} />
              ) : (
                <ProgressListSingleModule key={filteredInfo.tradeId} info={filteredInfo} />
              )
            )}
            <StyledButtonArea>
              {isMore ? (
                <Buttons
                  text="줄이기"
                  handleClick={moreClicked}
                  buttonStyle="header"
                  margin="1.5rem 0 0 0"
                />
              ) : (
                <Buttons
                  text="더보기"
                  handleClick={moreClicked}
                  buttonStyle="header"
                  margin="1.5rem 0 0 0"
                />
              )}
            </StyledButtonArea>
          </>
        )
      ) : (
        <LoadingComponent />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  gap: 3rem;
`;

const StyledButtonArea = styled.div`
  display: grid;
  justify-content: center;
`;

export default ProgressListModule;
