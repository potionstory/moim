import styled from 'styled-components';

export const ContentWrap = styled.article`
  padding-top: 96px;
`;

export const Content = styled.div``;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  border-bottom: 1px solid ${({ theme }) => theme.title};
`;

export const TitleIcon = styled.span`
  flex: 1;
  margin-right: 12px;
`;

export const MoimList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
  padding-top: 24px;
`;
