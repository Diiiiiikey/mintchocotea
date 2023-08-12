import styled from 'styled-components';
import TextEditor from 'Components/Editor';
import Buttons from 'Components/Buttons';
import { useEffect, useRef, useState } from 'react';
import { postReview } from 'apis/api/reveiw';
import { useParams } from 'react-router-dom';
import Typographies from 'Components/Typographies';
import { MdExitToApp } from 'react-icons/md';

export function ReviewModal({ openReviewerHandler }) {
  const [currentWidth, setCurrentWidth] = useState();
  const [isBlank, setIsBlank] = useState(false);
  const ref = useRef(null);
  const reveiwRef = useRef(null);
  const { id } = useParams();

  const toolbarItems =
    currentWidth < 700
      ? currentWidth < 500
        ? [[]]
        : [['heading', 'bold', 'italic', 'strike']]
      : [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
        ];

  const handleClick = () => {
    const review = reveiwRef.current?.getInstance().getMarkdown();
    if (review.trim() === '') {
      setIsBlank(true);
    } else {
      setIsBlank(false);
      postReview({ commissionId: id, content: review });
    }
  };

  useEffect(() => {
    setCurrentWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [ref.current]);

  useEffect(() => {
    const checkContent = () => {
      if (reveiwRef.current) {
        const content = reveiwRef.current.getInstance().getMarkdown();
        if (content.trim().length > 0) {
          setIsBlank(false);
        }
      }
    };

    checkContent();

    if (reveiwRef.current) {
      reveiwRef.current.getInstance().addHook('change', checkContent);
    }

    return () => {
      if (reveiwRef.current) {
        reveiwRef.current.getInstance().removeHook('change', checkContent);
      }
    };
  }, [isBlank]);

  return (
    <StyledContainer onClick={openReviewerHandler}>
      <ModalView onClick={e => e.stopPropagation()} ref={ref}>
        <StyledContent>
          <StyledModalButton onClick={openReviewerHandler}>
            <Exit />
          </StyledModalButton>
          <StyledMain>
            <TextEditor
              currentWidth={currentWidth}
              toolbarItems={toolbarItems}
              editorRef={reveiwRef}
              editorHolder="리뷰를 입력해주세요."
            />
          </StyledMain>
          <StyledSubButton>
            {isBlank ? <Typographies text="리뷰를 작성해주세요." typoStyle="err" /> : null}
            <Buttons text="리뷰 등록" buttonStyle="write" handleClick={handleClick} />
          </StyledSubButton>
        </StyledContent>
      </ModalView>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 50%;
  min-width: 20rem;
  height: 50%;
  min-height: 22rem;
  flex-direction: column;
  padding: 0.5rem 2rem 1.5rem 2rem;
  border-radius: 0.5rem;
`;

const StyledModalButton = styled.div`
  display: flex;
  justify-content: end;
  font-size: 2rem;
  cursor: pointer;
  flex: 1;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledMain = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex: 9;
`;

const StyledSubButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  align-items: center;
  gap: 0.5rem;
`;

const Exit = styled(MdExitToApp)`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;
export default ReviewModal;
