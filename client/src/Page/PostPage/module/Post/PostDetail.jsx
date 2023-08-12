import styled from 'styled-components';
import Buttons from 'Components/Buttons';
import Typographies from 'Components/Typographies';
import { useNavigate, useParams } from 'react-router-dom';
import { getMemberRoleFn } from 'customHook/getMemberInfoFetch';
import LoadingComponent from 'Components/LoadingComponent';
import Tags from 'Components/Tags';
import { Viewer } from '@toast-ui/react-editor';

export function PostDetail({ commission }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentMemberRole, loading } = getMemberRoleFn();

  const handleClick = () => {
    navigate(`/trade/${id}`);
  };

  const currentRoleFn = () => {
    if (currentMemberRole === 'USER') {
      return <Buttons text="신청하기" handleClick={handleClick} buttonStyle="long" />;
    }
    if (currentMemberRole === 'AUTHOR') {
      return (
        <Typographies
          text="신청자만 신청할 수 있습니다."
          typoStyle="base_2"
          backgraoundColor="gray_4"
          padding="1rem"
        />
      );
    }
    if (currentMemberRole === null) {
      return (
        <Typographies
          text="신청하기는 로그인이 필요합니다."
          typoStyle="base_2"
          backgraoundColor="gray_4"
          padding="1rem"
        />
      );
    }
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Summary>
          <Typographies text={commission.title} variant="h2" typoStyle="title_1" line={2} />
          <StyledSubContent>
            <Viewer initialValue={commission.subContent} />
          </StyledSubContent>
          <Tags tags={commission.tags} where="post" />
          <Typographies text={commission.memberName} typoStyle="name" />
          {currentRoleFn()}
        </Summary>
      )}
    </>
  );
}

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const StyledSubContent = styled.div`
  flex: 1;
`;
