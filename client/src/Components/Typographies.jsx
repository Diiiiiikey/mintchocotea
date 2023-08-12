import styled from 'styled-components';

function Typographies({
  text,
  variant,
  typoStyle,
  margin,
  color,
  backgraoundColor,
  padding,
  width,
  height,
  lineHeight,
  line,
  space,
  size,
  bold,
}) {
  return (
    <StyledFont
      as={variant}
      typoStyle={typoStyle}
      margin={margin}
      color={color}
      backgraoundColor={backgraoundColor}
      padding={padding}
      width={width}
      height={height}
      lineHeight={lineHeight}
      line={line}
      space={space}
      size={size}
      bold={bold}
    >
      {text}
    </StyledFont>
  );
}

const StyledFont = styled.span.attrs(props => ({
  props,
}))`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-wrap: break-word;
  width: '100%';
  margin: ${props => props.margin};
  padding: ${props => (props.padding ? props.padding : props.theme.typos[props.typoStyle].padding)};
  max-width: ${props => (props.width ? props.width : props.theme.typos[props.typoStyle].width)};
  height: ${props =>
    props.height ? props.theme.sizes[props.height] : props.theme.typos[props.typoStyle].height};
  color: ${props =>
    props.color ? props.theme.colors[props.color] : props.theme.typos[props.typoStyle].color};
  font-weight: ${props => (props.bold ? props.bold : props.theme.typos[props.typoStyle].bold)};
  font-size: ${props =>
    props.size ? props.theme.fontSizes[props.size] : props.theme.typos[props.typoStyle].size};
  white-space: ${props => (props.space ? props.space : props.theme.typos[props.typoStyle].space)};
  -webkit-line-clamp: ${props =>
    props.line ? props.line : props.theme.typos[props.typoStyle].line};
  line-height: ${props =>
    props.lineHeight
      ? props.theme.fontSizes[props.lineHeight]
      : props.theme.typos[props.typoStyle].lineHeight};
  background-color: ${props =>
    props.backgraoundColor
      ? props.theme.colors[props.backgraoundColor]
      : props => props.theme.typos[props.typoStyle].backgroundColor};
  text-shadow: ${props => props.theme.typos[props.typoStyle].textShadow};
`;

export default Typographies;
