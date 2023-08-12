import { useState } from 'react';
import styled from 'styled-components';

import Accordion from 'Components/Accordion';

import { MdAccountCircle } from 'react-icons/md';

function HeaderAccount() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickAccount = () => {
    setIsOpen(!isOpen);
  };

  document.body.addEventListener('click', e => {
    if (e.target.offsetParent === undefined || e.target.offsetParent === null) return;
    if (e.target.offsetParent.id !== 'accordion') {
      setIsOpen(false);
    }
    if (e.target.offsetParent.id === 'accordion') {
      setIsOpen(false);
    }
  });

  return (
    <>
      <StyledYour onClick={handleClickAccount}>
        <StyledIcon />
      </StyledYour>
      {isOpen ? <Accordion /> : null}
    </>
  );
}

const StyledYour = styled.button`
  display: flex;
  border: none;
  background-color: transparent;

  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(70%);
    transform: translate(0, 1px);
  }
`;

const StyledIcon = styled(MdAccountCircle)`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
`;

export default HeaderAccount;
