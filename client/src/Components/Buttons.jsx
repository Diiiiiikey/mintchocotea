import styled from 'styled-components';

function Buttons({
  buttonType,
  text,
  handleClick,
  id,
  buttonStyle,
  color,
  margin,
  backgroundColor,
  border,
}) {
  return (
    <StyledButton
      id={id}
      type={buttonType}
      onClick={handleClick}
      buttonStyle={buttonStyle}
      color={color}
      margin={margin}
      backgroundColor={backgroundColor}
      border={border}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button.attrs(props => ({
  buttonStyle: props.buttonStyle,
}))`
  background-color: ${props =>
    props.theme.colors[props.backgroundColor] ||
    props.theme.buttons[props.buttonStyle].backgroundColor};
  border: ${props =>
    props.border
      ? `1px solid ${props.theme.colors[props.border]}`
      : props.theme.buttons[props.buttonStyle].border};
  border-radius: ${props => props.theme.buttons[props.buttonStyle].borderRadius};
  font-size: ${props => props.theme.buttons[props.buttonStyle].size};
  color: ${props =>
    props.theme.colors[props.color] || props.theme.buttons[props.buttonStyle].color};
  padding: ${props => props.theme.buttons[props.buttonStyle].padding};
  margin: ${props => props.margin};
  white-space: nowrap;
  width: ${props => props.theme.buttons[props.buttonStyle].width || 'fit-content'};
  height: ${props => props.theme.buttons[props.buttonStyle].height || 'fit-content'};
  font-weight: ${props => props.theme.buttons[props.buttonStyle].bold};

  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(70%);
    transform: translate(0, 1px);
  }
`;

export default Buttons;
