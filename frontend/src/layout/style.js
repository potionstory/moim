import styled from 'styled-components';

export const LayoutWrap = styled.div`
  margin-top: 80px;

  @media screen and (max-width: 768px) {
    margin-top: 60px;
  }
`;

export const Container = styled.section`
  width: 1280px;
  margin: 0 auto;
  padding: 80px 0;

  @media screen and (max-width: 768px) {
    width: auto;
    padding: 10px;
  }
`;
