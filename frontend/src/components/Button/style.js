import styled, { css } from 'styled-components';

export const ButtonWrap = styled.div`
  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    ${({ isFull }) =>
      isFull &&
      css`
        width: 100%;
      `};
    height: 40px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    text-align: center;
    line-height: 40px;
    transition: all 0.2s ease-out;
    svg {
      font-size: 1rem;
      color: ${({ theme }) => theme.gray};
      transition: all 0.2s ease-out;
    }
    .text {
      padding-left: 12px;
      font-size: 0.875rem;
      font-weight: 600;
      color: ${({ theme }) => theme.gray};
      text-transform: uppercase;
      transition: all 0.2s ease-out;
    }
    &:hover {
      background-color: ${({ theme }) => theme.theme};
      svg {
        color: ${({ theme }) => theme.title};
      }
      .text {
        color: ${({ theme }) => theme.title};
      }
    }
  }
`;
