import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getMemberRoleFn } from 'customHook/getMemberInfoFetch';

function Accordion() {
  const navigate = useNavigate();
  const { currentMemberRole } = getMemberRoleFn();

  const BASE_URL = process.env.REACT_APP_API_URL;

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/logout`);
      localStorage.removeItem('authorization');
      localStorage.removeItem('memberId');
      window.location.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const memberId = localStorage.getItem('memberId');

  const handleClickMyProfile = () => {
    navigate(`/myprofile/${memberId}`);
  };

  const handleClickMyCommissionList = () => {
    navigate(`/mycommissions/${memberId}`);
  };

  const handleClickMyTradeList = () => {
    navigate(`/mytrades/${memberId}`);
  };

  return (
    currentMemberRole && (
      <StyledAccordion id="accordion">
        <StyledButton onClick={handleClickMyProfile}>내 프로필</StyledButton>
        <StyledHr />
        {currentMemberRole === 'AUTHOR' ? (
          <>
            <StyledButton onClick={handleClickMyCommissionList}>내 커미션목록</StyledButton>
            <StyledHr />
          </>
        ) : null}
        <StyledButton onClick={handleClickMyTradeList}>내 진행목록</StyledButton>
        <StyledHr />
        <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
      </StyledAccordion>
    )
  );
}

const StyledAccordion = styled.div`
  position: absolute;
  top: 3rem;
  right: -3.5rem;
  width: 10rem;
  height: fit-content;
  border: 1px solid #cecece;
  background: white;
  z-index: 50;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  width: 100%;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #666666;
  background-color: transparent;
  border: none;

  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(70%);
    transform: translate(0, 1px);
  }
`;

const StyledHr = styled.hr`
  display: flex;
  width: 100%;
  opacity: 0.3;
`;

export default Accordion;
