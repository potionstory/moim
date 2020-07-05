import styled from 'styled-components';

export const SocialListWrap = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SocialItem = styled.li`
  a {
    overflow: hidden;
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border: 3px solid ${({ theme }) => theme.main};
    border-radius: 20px;
    background-color: ${({ bgColor }) => bgColor};
    transition: all 0.2s ease-out;
    img {
      width: 24px;
      height: 24px;
    }
    &:hover {
      border: 3px solid ${({ theme }) => theme.theme};
    }
  }
`;
