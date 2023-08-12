import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding: ${props => props.paddingTop || '10rem'} 1rem 5rem 1rem;
`;
