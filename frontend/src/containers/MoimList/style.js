import styled from 'styled-components';

export const MoimListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 48px 24px;

  @media screen and (max-width: 768px) {
    gap: 40px 0;
  }
`;
