import styled from 'styled-components';
import Typographies from './Typographies';
import useScroll from 'customHook/useScroll';

function ToTheTop() {
  const scrollY = useScroll();

  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <StyledButton onClick={handleClick} display={scrollY}>
      <Typographies text="맨위로" typoStyle="base_3" color="white" />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: fixed;
  padding: 0.5rem 1rem;
  bottom: ${props => (props.display ? '2rem' : '-3rem')};
  right: 1rem;
  z-index: 10;
  border-radius: 4rem;
  border: none;
  box-shadow: 0 0 5px 2px #ececec;
  background-color: #8e785c;

  :hover {
    cursor: pointer;
    box-shadow: 0 0 5px 2px #999999;
  }

  transition: bottom 0.2s ease-in-out;
`;

export default ToTheTop;
