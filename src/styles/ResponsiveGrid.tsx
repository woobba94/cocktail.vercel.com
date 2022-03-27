import styled from 'styled-components';

export const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 70px 10px;
  grid-auto-flow: dense;
  padding-top: 50px;
`;
