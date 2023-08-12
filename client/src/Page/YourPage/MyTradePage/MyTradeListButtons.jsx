import styled from 'styled-components';

function MyTradeListButtons({ text, handleClick, isClicked, idx }) {
  return (
    <StyledButton onClick={handleClick} isClicked={isClicked} id={idx}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.div`
  display: table-cell;
  text-align: center;
  max-width: 10rem;
  width: 20%;
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
  white-space: nowrap;
  color: ${props => (props.isClicked ? '#9fe4c5' : '#666666')};
  background-color: white;
  border: ${props => (props.isClicked ? '2px solid #cae4d8' : '1px solid #cecece')};
  border-bottom: ${props => (props.isClicked ? 'none' : '2px solid #cae4d8')};
  z-index: 1;

  cursor: pointer;
`;

export default MyTradeListButtons;
