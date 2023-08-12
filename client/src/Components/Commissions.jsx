import styled from 'styled-components';
import Tags from './Tags';
import Typographies from 'Components/Typographies';
import Images from './Images';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Commissions({ commissions, text, tag, where }) {
  const [isCommissions, setIsCommissions] = useState(null);
  const navigate = useNavigate();

  const handleClick = id => {
    navigate(`/commission/${id}`);
    window.location.reload('/');
  };

  const windowResize = () => {
    const width = window.innerWidth;
    if (width <= 1024) {
      setIsCommissions(commissions.slice(0, 8));
      if (where === 'search') {
        if (commissions.length > 20) {
          setIsCommissions(commissions.slice(0, commissions.length));
        } else {
          setIsCommissions(commissions.slice(0, 20));
        }
      }
    }

    if (width <= 500 || width > 1024) {
      setIsCommissions(commissions);
    }
  };

  useEffect(() => {
    windowResize();
    window.addEventListener(`resize`, windowResize);
    return () => {
      window.removeEventListener(`resize`, windowResize);
    };
  }, [commissions]);

  return (
    <StyledContainer>
      <StyledTagCommissionTitle>
        <Typographies text={text} typoStyle="title_1" variant="h2" />
        <Typographies text={tag} typoStyle="title_1" variant="h2" />
      </StyledTagCommissionTitle>
      {isCommissions && (
        <CommissionBox>
          {isCommissions.map(item => {
            return (
              <StyledCommissionContainer key={item.commissionId}>
                <Tags tags={item.tags} />
                <SellBox onClick={() => handleClick(item.commissionId)}>
                  <Images
                    url={item.imageUrl[1]}
                    imageAlt={item.imageUrl[1]}
                    imgStyle="commissions"
                  />
                  <Typographies text={item.title} typoStyle="commissions" line="1" />
                  <Typographies text={item.memberName} typoStyle="base_2" />
                </SellBox>
              </StyledCommissionContainer>
            );
          })}
        </CommissionBox>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledTagCommissionTitle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CommissionBox = styled.div.attrs(props => ({
  mobile: props.theme.device.mobile,
  tablet: props.theme.device.tablet,
  laptop: props.theme.device.laptop,
}))`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem 1rem;
  max-width: 100%;

  @media ${props => props.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${props => props.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledCommissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SellBox = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  outline: none;
  border: none;
  border-radius: 0.25rem;
  background-color: white;
  justify-content: start;
  gap: 0.25;
  z-index: 1;

  cursor: pointer;
`;

export default Commissions;
