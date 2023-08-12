import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Buttons from 'Components/Buttons';
import Commission from 'Components/Commissions';
import { PostDetail, PostMain, PostImage } from './module/Post';
import { Container } from 'Container/Container';
import { getCommission, deleteCommission } from 'apis/api/commission';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentMemberFn } from 'customHook/getMemberInfoFetch';
import LoadingComponent from 'Components/LoadingComponent';
import { getTagsSearch } from 'apis/api/tags';
import Typographies from 'Components/Typographies';

function Post() {
  const [commission, setCommission] = useState(null);
  const [tagCommissions, setTagCommission] = useState(null);
  const [tag, setTag] = useState(null);
  const [resize, setResize] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { currentMemberInfo, loading } = getCurrentMemberFn();

  const onclickEdit = () => {
    navigate(`/edit-commission/${id}`);
  };

  const onclickDelete = async () => {
    await deleteCommission(id);
    setCommission(null); // 현재 commission 상태를 업데이트하기 전에 null 값으로 초기화
    navigate('/');
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 700) {
      setResize(true);
    } else {
      setResize(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getCommission(id);
      setCommission(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async randomNum => {
      const data = await getTagsSearch(commission.data.tags[randomNum]);
      setTagCommission(data.data.data);
      setTag(commission.data.tags[randomNum]);
    };
    if (commission) {
      const randomNum = Math.floor(Math.random() * commission.data.tags.length);
      fetch(randomNum);
    }
  }, [commission]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize); //clean up
    };
  }, []);

  return (
    <Container>
      {loading || !commission || !tagCommissions ? (
        <LoadingComponent />
      ) : (
        <StyledContainer>
          <PostDetailBox resize={resize}>
            <ImageWrapper>
              <PostImage commission={commission.data} />
            </ImageWrapper>
            <PostDetailWrapper>
              <PostDetail commission={commission.data} />
            </PostDetailWrapper>
          </PostDetailBox>
          <StyledHr />
          <PostMain commission={commission.data} />
          {currentMemberInfo !== null &&
            currentMemberInfo.nickname === commission.data.memberName && (
              <EditButton>
                <Buttons text="수정" handleClick={onclickEdit} buttonStyle="edit" />
                <Buttons text="삭제" handleClick={onclickDelete} buttonStyle="edit" />
              </EditButton>
            )}
          <StyledDiv>
            <Typographies text={`${tag} 태그 커미션`} variant="h2" typoStyle="title_1" />
            <Commission commissions={tagCommissions} />
          </StyledDiv>
        </StyledContainer>
      )}
    </Container>
  );
}

const StyledContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
`;

const PostDetailBox = styled.div`
  display: flex;
  flex-direction: ${props => (props.resize ? 'column' : 'none')};
  width: 100%;
  gap: 3rem;
  padding: 0 2rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 3;
`;

const StyledHr = styled.hr`
  display: flex;
  opacity: 0.3;
`;

const PostDetailWrapper = styled.div`
  display: flex;
  flex: 2;
  width: 100%;
  border-radius: 0.25rem;
`;

const EditButton = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
`;

const StyledDiv = styled.div`
  margin-top: 5rem;
`;

export default Post;
