import styled from 'styled-components';
import { getMemberInfoFn } from 'customHook/getMemberInfoFetch';
import { useParams } from 'react-router-dom';
import LoadingComponent from 'Components/LoadingComponent';
import Typographies from 'Components/Typographies';
import { MdAccountCircle } from 'react-icons/md';

function MyProfilePage() {
  const { id } = useParams();
  const { currentMemberInfo, loading } = getMemberInfoFn(id);

  return (
    <StyledContainer>
      {loading || !currentMemberInfo ? (
        <LoadingComponent />
      ) : (
        <StyledContents>
          <StyledBackgroundColor>
            <StyledInfoContainer>
              <Typographies
                text={`since ${currentMemberInfo.createdAt.substr(0, 10)}`}
                typoStyle="base_2"
              />
              <Typographies
                text={currentMemberInfo.nickname}
                typoStyle="name"
                width="fit-content"
                color="gray_3"
              />
            </StyledInfoContainer>
            <StyledIconContainer>
              <StyledIcon />
            </StyledIconContainer>
          </StyledBackgroundColor>
          <Typographies
            text={
              currentMemberInfo.roles[0] === 'AUTHOR'
                ? '이 유저는 작가입니다.'
                : '이 유저는 신청자입니다.'
            }
            typoStyle="base"
            color="gray_3"
            backgraoundColor="gray_4"
            padding="1rem"
          />
        </StyledContents>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding: 5rem 1rem;
  overflow: hidden;
`;

const StyledContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledBackgroundColor = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 15rem;
  justify-content: center;
  background-color: #cae4d8;
`;

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledIconContainer = styled.div`
  position: absolute;
  top: 10rem;
  background-color: white;
  border-radius: 50%;
  border: 1px solid #9fe4c5;
`;

const StyledIcon = styled(MdAccountCircle)`
  display: flex;
  color: #555555;
  width: 10rem;
  height: 10rem;

  @media screen and (max-width: 800px) {
    width: 7rem;
    height: 7rem;
  }
`;

export default MyProfilePage;
