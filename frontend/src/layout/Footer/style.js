import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const FooterWrap = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.main};
  box-shadow: 12px 0 24px 0 rgb(0 0 0 / 8%);
  height: 80px;
  p {
    font-size: 0.75rem;
    color: ${color.gray};
    text-align: center;
    b {
      font-weight: bold;
      color: ${({ theme }) => theme.theme};
    }
    a {
    font-weight: bold;
    color: ${color.title};
    transition: all 0.2s ease-out;
      &:hover {
        color: ${({ theme }) => theme.theme};
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: 40px;
  }
`;