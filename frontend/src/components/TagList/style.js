import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const TagListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    height: 1rem;
    margin: 0 6px 6px 0;
    button {
      height: 1rem;
      padding: 0 8px;
      border-radius: 8px;
      background-color: ${color.blue};
      font-size: 0.625rem;
      font-weight: 600;
      color: ${color.white};
      line-height: 1rem;
      transition: all 0.2s ease-out;
      &:hover {
        background-color: ${({ theme }) => theme.theme};
      }
    }
  }
`;
