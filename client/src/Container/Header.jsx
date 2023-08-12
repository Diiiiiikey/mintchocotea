import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import InputComponent from 'Components/InputComponent';
import Buttons from 'Components/Buttons';
import HeaderAccount from './HeaderAccount';

import mainLogo from 'assets/MCTLoGo.png';

function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const isLogined = localStorage.getItem('authorization') ? true : false;

  const handleClickLogo = () => {
    window.location.replace('/');
  };
  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleClickSignUp = () => {
    navigate('/signup');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search === null || search === '') {
      return;
    } else {
      navigate(`/search/${search}`);
    }
    setSearch('');
  };

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <StyledHeaderArea>
      <StyledContainer>
        <StyledLogoContainer>
          <StyledLogo src={mainLogo} alt="logo" onClick={handleClickLogo} />
        </StyledLogoContainer>
        <StyledInputContainer>
          <InputComponent
            placeholder="태그 검색"
            handleSubmit={handleSubmit}
            onChange={onChangeSearch}
          />
        </StyledInputContainer>
        {isLogined ? (
          <StyledYourContainer>
            <HeaderAccount />
          </StyledYourContainer>
        ) : (
          <StyledButtons>
            <Buttons
              text="로그인"
              handleClick={handleClickLogin}
              buttonStyle="header"
              color="mint_1"
            />
            <Buttons
              text="회원가입"
              handleClick={handleClickSignUp}
              buttonStyle="header"
              margin="0 1rem 0 0"
            />
          </StyledButtons>
        )}
      </StyledContainer>
    </StyledHeaderArea>
  );
}

const StyledHeaderArea = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  justify-content: space-around;
  height: 5rem;
  z-index: 10;
  border-bottom: 1px solid #cecece;
  box-shadow: 0 0 5px 0 #999999;
  background-color: #fff;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 80rem;
  width: 100%;
  max-height: 100%;
  align-items: center;
  justify-items: end;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  flex: 3;
`;

const StyledLogo = styled.img`
  width: 110px;
  cursor: pointer;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex: 5;
  cursor: text;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-self: end;
  align-items: center;
  gap: 2rem;
`;

const StyledYourContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0 4rem 0 2rem;
`;

export default Header;
