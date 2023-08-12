import styled from 'styled-components';
import { getMemberInfoFn } from 'customHook/getMemberInfoFetch';
import { useParams } from 'react-router-dom';
import LoadingComponent from 'Components/LoadingComponent';
import Typographies from 'Components/Typographies';
import { Container } from 'Container/Container';
import MyCommissionsLists from './MyCommissionsLists';
import ToTheTop from 'Components/ToTheTop';

function MyCommissionsPage() {
  const { id } = useParams();
  const { currentMemberInfo, loading } = getMemberInfoFn(id);

  return (
    <Container>
      {loading ? (
        <LoadingComponent />
      ) : (
        <StyledContainer>
          <Typographies variant="h2" text="내 커미션 목록" typoStyle="title_1" margin="1rem" />
          <MyCommissionsLists info={currentMemberInfo} />
        </StyledContainer>
      )}
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

export default MyCommissionsPage;
