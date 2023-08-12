import styled, { css } from 'styled-components';
import { ImSearch } from 'react-icons/im';

function InputComponent({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  titleRef,
  type = 'text',
  handleKeyPress,
  defaultText,
  handleSubmit,
}) {
  return (
    <InputContainer onSubmit={handleSubmit}>
      <InputLabel label={label}>{label}</InputLabel>
      <InputWrapper error={error}>
        {placeholder === '태그 검색' ? (
          <IconWrapper>
            <ImSearch />
          </IconWrapper>
        ) : null}
        <InputField
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultText}
          onChange={onChange}
          onBlur={onBlur}
          ref={titleRef}
          onKeyDown={handleKeyPress}
        />
      </InputWrapper>
      {error && <ErrorMessage visible={'visible'}>{error}</ErrorMessage>}
    </InputContainer>
  );
}

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
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
  height: 2.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ error }) => (error ? 'red' : '#cecece')};
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  justify-self: center;
  align-items: center;
  box-shadow: inset 0 0 5px 0 #ececec;
  :focus-within {
    border: 1px solid #9fe4c5;
    box-shadow: inset 0 0 5px 0 #9fe4c5;
  }
  transition: border-color 0.3s ease-in-out;

  ${({ error }) =>
    error &&
    css`
      box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
    `}
`;

const InputField = styled.input`
  border: none;
  width: 100%;
  &:focus {
    outline: none;
  }

  ::placeholder {
    color: #c1c1c1;
  }
  background-color: #fff;
`;

const IconWrapper = styled.div`
  display: flex;
  margin-right: 0.5rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  padding-left: 1rem;
  color: red;
`;

export default InputComponent;
