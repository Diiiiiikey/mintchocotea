import styled from 'styled-components';
import Typographies from 'Components/Typographies';
import { getMemberCommissionFn } from 'customHook/getMemberCommissionFetch';
import CommissionListSingleModule from './CommissionListSingleModule';
import Buttons from 'Components/Buttons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function MyCommissionsLists({ info }) {
  const [isMore, setIsMore] = useState(10);

  const navigate = useNavigate();

  const authorCommissions = getMemberCommissionFn(info.email);

  const moreClicked = () => {
    setIsMore(isMore + 10);
  };

  const handleCreate = () => {
    navigate('/create-commission');
  };

  const handleCommission = e => {
    const id = e.currentTarget.id;
    navigate(`/commission/${id}`);
  };
  return (
    <>
      <StyledLengthContainer>
        <StyledTypoContainer>
          <Typographies
            variant="h2"
            text={authorCommissions.length}
            typoStyle="title_2"
            width="fit-content"
            margin="0 1rem 0 0"
          />
          <Typographies variant="h2" text="개의 커미션이 있습니다." typoStyle="base" />
        </StyledTypoContainer>
        <Buttons text="커미션등록" handleClick={handleCreate} buttonStyle="write" />
      </StyledLengthContainer>
      <StyledCommissionsContainer>
        {authorCommissions.length ? null : (
          <Typographies text="현재 등록된 커미션이 없습니다." typoStyle="base_2" />
        )}
        {authorCommissions.slice(0, isMore).map(el => (
          <CommissionListSingleModule
            key={el.commissionId}
            info={el}
            handleClick={handleCommission}
          />
        ))}
        {isMore <= authorCommissions.length && (
          <StyledButtonArea>
            <Buttons
              text="더보기"
              handleClick={moreClicked}
              buttonStyle="header"
              margin="1.5rem 0 0 0"
            />
          </StyledButtonArea>
        )}
      </StyledCommissionsContainer>
    </>
  );
}

const StyledLengthContainer = styled.div`
  display: flex;
  margin: 1rem;
  justify-content: space-between;
`;

const StyledTypoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCommissionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  background-color: #f6f6f6;
`;

const StyledButtonArea = styled.div`
  display: grid;
  justify-content: center;
`;

export default MyCommissionsLists;
