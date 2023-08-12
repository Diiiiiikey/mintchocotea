import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputComponent from 'Components/InputComponent';
import Buttons from 'Components/Buttons';
import { emailValidate, passwordValidate, nicknameValidate } from '../utils/validata';
import { signup } from '../apis/api/signup';
import { Alert } from '@mui/material';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [nickname, setNickname] = useState('');
  const [NicknameError, setNicknameError] = useState('');

  const [userType, setUserType] = useState('writer');
  const [showArrAlert, setShowArrAlert] = useState(false);

  const handleChangeEmail = e => {
    if (e.target.value.length !== 0) setShowArrAlert(false);
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    if (e.target.value.length !== 0) setShowArrAlert(false);
    setPassword(e.target.value);
  };

  const handleChangeNickname = e => {
    if (e.target.value.length !== 0) setShowArrAlert(false);
    setNickname(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSignUp = async () => {
    window.scrollTo(0, 0);
    const roles = userType === 'writer' ? ['AUTHOR'] : ['USER'];
    try {
      const result = await signup({ email, password, nickname, roles }); // signup 함수 사용
      if (result.success) {
        navigate('/login', { state: { loginSuccess: true } });
      } else {
        setShowArrAlert(true);
        setEmail('');
        setPassword('');
        setNickname('');
      }
    } catch (error) {
      setShowArrAlert(true);
      setEmail('');
      setPassword('');
      setNickname('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isEmailValid = emailValidate(email, setEmailError);
    const isPasswordValid = passwordValidate(password, setPasswordError);
    const isNicknameValid = nicknameValidate(nickname, setNicknameError);

    if (!isEmailValid || !isPasswordValid || !isNicknameValid) {
      return;
    }

    handleSignUp();
  };

  return (
    <StyledContainer>
      <Container>
        {showArrAlert && <StyledAlert severity="error">회원가입에 실패했습니다.</StyledAlert>}
        <SignUpContainer>
          <OptionContainer>
            <OptionButton active={userType === 'writer'} onClick={() => setUserType('writer')}>
              Writer
            </OptionButton>
            <OptionButton active={userType === 'user'} onClick={() => setUserType('user')}>
              User
            </OptionButton>
          </OptionContainer>
          <InputComponent
            label="Email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={handleChangeEmail}
            onBlur={() => emailValidate(email, setEmailError)}
            error={emailError}
            handleKeyPress={handleKeyPress}
            handleSubmit={e => {
              e.preventDefault();
            }}
          />
          <InputComponent
            label="Password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={handleChangePassword}
            onBlur={() => passwordValidate(password, setPasswordError)}
            error={passwordError}
            type="password"
            handleSubmit={e => {
              e.preventDefault();
            }}
          />
          <InputComponent
            label="Nickname"
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChange={handleChangeNickname}
            onBlur={() => nicknameValidate(nickname, setNicknameError)}
            error={NicknameError}
            handleSubmit={e => {
              e.preventDefault();
            }}
          />
          <Buttons
            text="회원가입"
            buttonType="submit"
            handleClick={handleSubmit}
            buttonStyle="long"
          />
        </SignUpContainer>
      </Container>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: #f6f6f6;
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 420px;
  min-height: 100vh;
  padding: 10rem 0.5rem 5rem 0.5rem;
`;

const StyledAlert = styled(Alert)`
  position: absolute;
  width: 404px;
  top: 7rem;
`;

const SignUpContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 420px;
  height: 40rem;
  gap: 1rem;
  border: 1px solid #cecece;
  border-radius: 0.25rem;
  padding: 2rem;
  background-color: #fff;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  margin-bottom: 1rem;
`;

const OptionButton = styled.button`
  background-color: ${({ active }) => (active ? '#9fe4c5' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#9fe4c5')};
  border: ${({ active }) => (active ? 'none' : '1px solid #9fe4c5')};
  padding: 0.8rem 2rem;
  border-radius: 0.3rem;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export default SignUpPage;
