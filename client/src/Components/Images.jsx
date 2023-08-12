import styled from 'styled-components';

function Images({ url, imageAlt, imgStyle }) {
  return <StyledImg src={url} alt={imageAlt} imgStyle={imgStyle} />;
}

const StyledImg = styled.img.attrs(props => ({
  props,
}))`
  display: flex;
  width: 100%;
  align-items: center;
  height: auto;
  background-color: ${props => props.theme.images[props.imgStyle].backgroundColor};
  object-fit: ${props => props.theme.images[props.imgStyle].objectFit || 'cover'};
  aspect-ratio: ${props => props.theme.images[props.imgStyle].imgStyle};
  border-radius: ${props => props.theme.images[props.imgStyle].borderRadius};
  max-width: ${props => props.theme.images[props.imgStyle].width};
  border: ${props => props.theme.images[props.imgStyle].border};

  &:hover {
    object-fit: ${props => props.theme.images[props.imgStyle].hover};
  }
`;

export default Images;
