import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import mainLogo from 'assets/MCTLoGo.png';
import InputComponent from 'Components/InputComponent';
import Buttons from 'Components/Buttons';
import { emailValidate, passwordValidate } from 'utils/validata';
import { login } from 'apis/api/login';
import { Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showArrAlert, setShowArrAlert] = useState(false);

  const location = useLocation();

  const loginSuccess = location.state && location.state.loginSuccess;

  const handleChangeEmail = e => {
    if (e.target.value.length !== 0) setShowArrAlert(false);
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    if (e.target.value.length !== 0) setShowArrAlert(false);
    setPassword(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleLogin = async () => {
    window.scrollTo(0, 0);
    try {
      const result = await login({ email, password });
      if (result.success) {
        window.location.replace('/');
      } else {
        setShowArrAlert(true);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setShowArrAlert(true);
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isEmailValid = emailValidate(email, setEmailError);
    const isPasswordValid = passwordValidate(password, setPasswordError);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    handleLogin();
  };

  useEffect(() => {
    if (loginSuccess) setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [loginSuccess]);

  return (
    <StyledContainer>
      <Container>
        {showAlert && <StyledAlert severity="success">회원가입을 완료했습니다.</StyledAlert>}
        {showArrAlert && (
          <StyledAlert severity="error">아이디와 비밀번호를 확인해주세요.</StyledAlert>
        )}
        <LoginContainer>
          <StyledLogo src={mainLogo} width={110} alt="logo" />
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
            handleKeyPress={handleKeyPress}
            handleSubmit={e => {
              e.preventDefault();
            }}
          />

          <Buttons
            text="로그인"
            buttonType="submit"
            handleClick={handleSubmit}
            buttonStyle="long"
          />
        </LoginContainer>
      </Container>
    </StyledContainer>
  );
};

// axios.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('authorization');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

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
  overflow-x: hidden;
`;

const StyledAlert = styled(Alert)`
  position: absolute;
  width: 404px;
  top: 7rem;
`;

const LoginContainer = styled.div`
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

const StyledLogo = styled.img`
  display: flex;
  justify-self: center;
  width: 150px;
`;

export default Login;
