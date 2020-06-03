import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export const HeaderWrap = styled.section`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 96px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.08);
  background-color: ${palette.light.main};
`;

export const LeftHead = styled.div`
  padding: 24px;
  background-color: blue;
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

export const User = styled.div``;
