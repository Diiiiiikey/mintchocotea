import styled from 'styled-components';
import InputComponent from 'Components/InputComponent';
import Buttons from 'Components/Buttons';
import { Container } from 'Container/Container';
import TextEditor from 'Components/Editor';
import { Dropzone, CreateTag, InputText } from './module';
import { postCommission, patchCommission, getCommission } from 'apis/api/commission';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import Typographies from 'Components/Typographies';

function CreatePost() {
  const [isImages, setIsImages] = useState([]);
  const [isTags, setIsTags] = useState([]);
  const [isTitle, setTitle] = useState('');
  const [isSubContent, setSubContent] = useState('');
  const [commission, setCommission] = useState(null);
  const [isBlank, setIsBlank] = useState(false);

  const [titleMax, setTitleMax] = useState(false);
  const [subContentMax, setSubContentMax] = useState(false);

  const contentRef = useRef(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (pathname === `/create-commission`) {
      if (isTitle.trim().length > 32) {
        setTitleMax(true);
      } else {
        setTitleMax(false);
      }
      if (isSubContent.trim().length > 700) {
        setSubContentMax(true);
      } else {
        setSubContentMax(false);
      }
      if (
        isTitle.trim().length === 0 ||
        isSubContent.trim().length === 0 ||
        contentRef.current?.getInstance().getMarkdown() === '' ||
        isImages.length === 0 ||
        isTags.length === 0
      ) {
        setIsBlank(true);
      } else if (!titleMax && !subContentMax) {
        const formData = new FormData();
        isImages.forEach(file => formData.append('multipartFile', file));
        isTags.forEach(tag => formData.append('tags', tag));
        formData.append('title', isTitle.trim());
        formData.append('subContent', isSubContent.trim());
        formData.append('content', contentRef.current?.getInstance().getMarkdown());
        const response = await postCommission(formData);
        navigate(`/commission/${response.commissionId}`);
      }
    } else {
      if (
        isTitle.trim().length === 0 ||
        isSubContent.trim().length === 0 ||
        contentRef.current?.getInstance().getMarkdown() === ''
      ) {
        setIsBlank(true);
      } else if (!titleMax && !subContentMax) {
        const data = {
          title: isTitle.trim(),
          subContent: isSubContent.trim(),
          content: contentRef.current?.getInstance().getMarkdown(),
        };
        patchCommission(data, id);
        navigate(`/commission/${id}`);
      }
    }
  };

  if (pathname === `/edit-commission/${id}`) {
    useEffect(() => {
      const fetch = async () => {
        const { data, status } = await getCommission(id);
        if (status < 300) {
          setCommission(data);
        }
      };
      fetch();
    }, []);
  }

  useEffect(() => {
    if (isSubContent.trim().length > 700) {
      setSubContentMax(true);
    } else {
      setSubContentMax(false);
    }
    if (isTitle.trim().length > 32) {
      setTitleMax(true);
    } else {
      setTitleMax(false);
    }
  }, [subContentMax, titleMax, isTitle, isSubContent]);

  return (
    <Container paddingTop="5rem">
      <StyledNotice>
        <Typographies variant="li" text="<주의사항>" typoStyle="base" />
        <Typographies
          variant="li"
          text="커미션 소개글을 최대한 자세하게 작성해주세요."
          typoStyle="base_2"
        />
        <Typographies
          variant="li"
          text="제목은 최대 32자까지 입력 가능합니다."
          typoStyle="base_2"
        />
        <Typographies
          variant="li"
          text="소개글은 최대 700자까지 입력 가능합니다."
          typoStyle="base_2"
        />
        <Typographies
          variant="li"
          text="사진은 최대 12개까지 게시 가능합니다."
          typoStyle="base_2"
        />
        <Typographies
          variant="li"
          text="사진의 최대 크기는 1024 * 1000 입니다."
          typoStyle="base_2"
        />
        <Typographies
          variant="li"
          text="태그는 최대 10개까지 게시 가능합니다."
          typoStyle="base_2"
        />
      </StyledNotice>
      {(commission || pathname === '/create-commission') && (
        <>
          <Content>
            <ImgBox>
              <Dropzone
                setIsImages={setIsImages}
                defaultImage={commission ? commission.imageUrl : null}
              />
            </ImgBox>
            <PostDetail>
              <InputComponent
                label="제목"
                placeholder="제목을 입력하세요."
                onChange={e => setTitle(e.target.value)}
                defaultText={commission && commission.title}
              />
              {titleMax && (
                <StyledTitleMaxErr>
                  <Typographies text="제목은 최대 32자까지 입력할 수 있습니다." typoStyle="err" />
                </StyledTitleMaxErr>
              )}
              <InputText
                label="소개글"
                handleChange={e => setSubContent(e.target.value)}
                defaultText={commission && commission.subContent}
                editorHeight="18rem"
              />
              {subContentMax && (
                <StyledSubContentMaxErr>
                  <Typographies
                    text="소개글은 최대 700자까지 입력할 수 있습니다."
                    typoStyle="err"
                  />
                </StyledSubContentMaxErr>
              )}
              <CreateTag setIsTags={setIsTags} defaultTags={commission && commission.tags} />
            </PostDetail>
          </Content>
          <Toast>
            <TextEditor
              editorHeight={'30rem'}
              editorRef={contentRef}
              editorValue={commission && commission.content}
            />
          </Toast>
          {isBlank && (
            <Alert severity="error">
              이미지, 제목, 소개글, 본문, 태그 중 하나라도 비어있으면 게시물 등록이 되지않습니다
            </Alert>
          )}
          <ButtonBox>
            <Buttons
              text="등록"
              buttonType="submit"
              handleClick={handleSubmit}
              buttonStyle="write"
            />
          </ButtonBox>
        </>
      )}
    </Container>
  );
}

const Content = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledNotice = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2rem 1rem;
  margin: 2rem 0;
  gap: 0.5rem;
  background-color: #f6f6f6;
`;

const ImgBox = styled.div`
  display: flex;
  min-height: 650px;
  flex: 2;
`;

const PostDetail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 650px;
  height: fit-content;
  flex: 1;
  padding: 2rem;
  border: 1px solid #9fe4c5;
  border-radius: 0.25rem;
  gap: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Toast = styled.div`
  margin-top: 3rem;
  border-radius: 0.25rem;
`;

const StyledTitleMaxErr = styled.div`
  position: absolute;
  top: 7.5rem;
`;
const StyledSubContentMaxErr = styled(StyledTitleMaxErr)`
  position: absolute;
  top: 29.5rem;
`;
export default CreatePost;
