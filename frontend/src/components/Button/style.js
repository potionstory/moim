import styled from 'styled-components';

export const ButtonWrap = styled.div`
  a,
  button {
    display: flex;
    align-items: center;
    &:hover {
      .icon {
        background-color: ${({ theme }) => theme.theme};
        svg {
          color: ${({ theme }) => theme.main};
        }
      }
      .text {
        color: ${({ theme }) => theme.theme};
      }
    }
  }
`;

export const ButtonIcon = styled.span`
  display: block;
  width: 24px;
  height: 24px;
  padding: 8px;
  box-sizing: content-box;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.sub};
  text-align: center;
  line-height: 24px;
  transition: all 0.2s ease-out;
  svg {
    font-size: 1rem;
    color: ${({ theme }) => theme.gray};
    transition: all 0.2s ease-out;
  }
`;

export const ButtonText = styled.span`
  padding-left: 6px;
  padding-right: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.gray};
  text-transform: uppercase;
  transition: all 0.2s ease-out;
`;
