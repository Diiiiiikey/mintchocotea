import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import Buttons from 'Components/Buttons';
import TradeModuleBox from './module/TradeModuleBox';
import TextEditor from 'Components/Editor';
import { Container } from 'Container/Container';
import InputComponent from 'Components/InputComponent';
import { postTrade } from 'apis/api/trade';
import { getCommissionFn } from 'customHook/getCommissionFetch.js';
import Typographies from 'Components/Typographies';
import LoadingComponent from 'Components/LoadingComponent';

function TradePage() {
  const [isTitle, setTitle] = useState('');
  const [titleErr, setTitleErr] = useState(false);
  const [titleMax, setTitleMax] = useState(false);
  const [isContent, setContent] = useState('');
  const [contentErr, setContentErr] = useState(false);
  // const [statusArr, setStatusArr] = useState(false);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const info = getCommissionFn(id);

  const handleSubmit = async e => {
    e.preventDefault();

    const title = isTitle.trim();
    const content = isContent.trim();
    if (title.length === 0) {
      setTitleErr(true);
    }
    if (content.length === 0) {
      setContentErr(true);
    }

    if (title.length !== 0 && content.length !== 0 && !titleMax) {
      const value = {
        title: title,
        content: content,
        commissionId: id,
      };
      try {
        const { status, memberId } = await postTrade(value);
        if (status < 300) navigate(`/mytrades/${memberId}`);
      } catch (err) {
        // setStatusArr(true);
      }
    }
  };

  const onEditorChange = () => {
    const content = editorRef.current.getInstance().getMarkdown().trim();
    setContent(content);
  };

  useEffect(() => {
    if (isTitle.trim().length !== 0) {
      setTitleErr(false);
    }
    if (isContent.trim().length !== 0) {
      setContentErr(false);
    }
    if (isTitle.trim().length < 33) {
      setTitleMax(false);
    } else {
      setTitleMax(true);
    }
  }, [isTitle, isContent, titleMax]);

  return (
    <Container>
      {info.commission ? (
        <StyledContainer>
          <StyledHeader>
            <Typographies text={info.commission.memberName} typoStyle="name" width="fit-content" />
            <Typographies text="작가의 커미션 신청 페이지" typoStyle="base" />
          </StyledHeader>
          <TradeModuleBox info={info} />
          <StyledHr />
          <StyledSection>
            <StyledNotice>
              <Typographies text="<주의사항>" typoStyle="base" />
              <Typographies text="최대한 자세하게 신청폼을 작성해주세요." typoStyle="base_2" />
              <Typographies text="제목은 최대 32자까지 입력 가능합니다." typoStyle="base_2" />
            </StyledNotice>
            <InputComponent
              placeholder="제목을 입력해주세요"
              onChange={e => setTitle(e.target.value)}
            />
            <StyledMaxErr>
              {titleMax && (
                <Typographies text="제목은 최대 32자까지 입력 가능합니다" typoStyle="err" />
              )}
            </StyledMaxErr>
            <TextEditor
              editorRef={editorRef}
              editorHeight={'25rem'}
              onEditorChange={onEditorChange}
            />
            <StyledErr count={+titleErr + +contentErr || 0}>
              {titleErr && <Typographies text="제목을 입력해주세요." typoStyle="err" />}
              {contentErr && <Typographies text="내용을 입력해주세요." typoStyle="err" />}
            </StyledErr>
          </StyledSection>
          <Buttons
            type="submit"
            text="신청서 보내기"
            buttonStyle="write"
            handleClick={handleSubmit}
          />
        </StyledContainer>
      ) : (
        <LoadingComponent />
      )}
    </Container>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 100%;
  max-width: 50rem;
  gap: 3rem;
`;

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
`;

const StyledHr = styled.hr`
  display: flex;
  opacity: 0.3;
`;

const StyledSection = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 1rem;
`;

const StyledNotice = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f6f6f6;
  gap: 0.5rem;
`;

const StyledErr = styled.div`
  position: absolute;
  bottom: ${props => (props.count === 1 ? '-2rem' : '-2.5rem')};
  left: 0;
`;

const StyledMaxErr = styled.div`
  position: absolute;
  bottom: 25.3rem;
  left: 0;
`;

export default TradePage;
