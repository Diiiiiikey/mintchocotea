import styled, { css } from 'styled-components';

export function InputText({ label, handleChange, defaultText, editorHeight }) {
  return (
    <InputContainer>
      <InputLabel label={label}>{label}</InputLabel>
      <InputWrapper>
        <Textarea
          onChange={handleChange}
          defaultValue={defaultText}
          placeholder="간단한 내용을 입력하세요."
          editorHeight={editorHeight}
        />
      </InputWrapper>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 20rem;
`;

const InputLabel = styled.label`
  ${({ label }) => {
    if (label) {
      return css`
        display: flex;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        font-weight: bold;
        color: #3f321d;
      `;
    }
  }}
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 20rem;
  height: 100%;
  border-radius: 0.25rem;
  border: 1px solid #cecece;
  padding: 1rem;
  margin: 0.5rem 0;
  justify-self: center;
  align-items: center;
  box-shadow: inset 0 0 5px 0 #ececec;
  :focus-within {
    border: 1px solid #9fe4c5;
    box-shadow: inset 0 0 5px 0 #cae4d8;
  }
  transition: border-color 0.3s ease-in-out;
`;

const Textarea = styled.textarea`
  border: none;
  width: 100%;
  height: ${props => props.editorHeight || '100%'};
  resize: none;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #c1c1c1;
  }
`;
