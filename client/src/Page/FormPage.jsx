import { Container } from 'Container/Container';
import { useLocation } from 'react-router-dom';
import Typographies from 'Components/Typographies';
import styled from 'styled-components';

function FormPage() {
  const location = useLocation();
  const { name, createdAt, who, title, content } = location.state;

  return (
    <Container>
      <StyledContainer>
        <StyledStartContainer>
          <StyledHead>
            <Typographies text={name} typoStyle="name" width="fit-content" />
            {who === 'user' ? (
              <Typographies
                text="님의 커미션을 신쳥했습니다."
                typoStyle="base_2"
                width="fit-content"
              />
            ) : (
              <Typographies
                text="님이 커미션을 신청했습니다."
                typoStyle="base_2"
                width="fit-content"
              />
            )}
          </StyledHead>
          <StyledHead>
            <Typographies text="신청일:" typoStyle="base_2" width="fit-content" />
            <Typographies text={createdAt} typoStyle="base_2" />
          </StyledHead>
        </StyledStartContainer>
        <StyledSectionContainer>
          <StyledContentContainer>
            <Typographies text="제목" typoStyle="title_2" color="choco_1" />
            <StyledContent>
              <Typographies text={title} typoStyle="base" />
            </StyledContent>
            <Typographies text="내용" typoStyle="title_2" color="choco_1" />
            <StyledContent>
              <Typographies text={content} typoStyle="base" />
            </StyledContent>
          </StyledContentContainer>
        </StyledSectionContainer>
      </StyledContainer>
    </Container>
  );
}

const StyledContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 60rem;
  align-self: center;
`;

const StyledStartContainer = styled.header`
  display: flex;
  margin: 0 1rem 1rem 1rem;
  justify-content: space-between;
`;

const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
`;

const StyledHead = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledContentContainer = styled.article`
  display: flex;
  width: 90%;
  margin: 3rem 0 1rem 0;
  flex-direction: column;
`;

const StyledContent = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  margin: 1rem 0 3rem 0;
  border: 1px solid #cecece;
  border-radius: 0.25rem;
  background-color: #fff;
`;

export default FormPage;
