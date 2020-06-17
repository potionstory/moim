import styled from 'styled-components';

export const HeaderWrap = styled.section`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 96px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.main};
  z-index: 100;
`;

export const LeftHead = styled.div`
  display: flex;
  padding: 24px;
`;

export const Logo = styled.h1`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const ModeToggle = styled.button`
  display: block;
  width: 48px;
  height: 48px;
  position: relative;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.theme};
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  text-align: center;
  line-height: 48px;
  transition: all 0.2s ease-out;
`;

export const RightHead = styled.div`
  display: flex;
  flex: 1;
  padding: 24px;
  align-items: center;
  justify-content: flex-end;
`;

export const Menu = styled.div`
  ul {
    display: flex;
    li {
      padding-left: 12px;
      &:first-child {
        padding-left: 0;
      }
    }
  }
`;

export const User = styled.div`
  display: flex;
  margin-left: 24px;
`;

export const Profile = styled.button`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.sub};
  border-radius: 24px;
  transition: all 0.2s ease-out;
  &:hover {
    border-color: ${({ theme }) => theme.theme};
  }
`;
