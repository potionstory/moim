import styled from 'styled-components';

export const FooterWrap = styled.section`
  width: 100%;
  height: 96px;
  box-shadow: 0 -12px 24px 0 rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.main};
`;

export const FooterInnder = styled.div`
  width: 1280px;
  margin: 0 auto;
`;