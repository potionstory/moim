import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export const ButtonWrap = styled.div`
  a,
  button {
    display: flex;
    align-items: center;
    border-radius: 6px;
    background-color: ${palette.light.buttonGray};
    transition: all 0.2s ease-out;
    .spinner {
      display: none;
    }
    &:hover {
      background-color: transparent;
      .spinner {
        display: block;
      }
      .icon,
      .text {
        color: ${palette.light.theme};
      }
    }
  }
`;

export const ButtonIconWrap = styled.span`
  position: relative;
  height: 24px;
  width: 24px;
  padding: 8px;
`;

export const ButtonIcon = styled.span`
  display: block;
  width: 24px;
  height: 24px;
  font-size: 1rem;
  color: ${palette.light.title};
  text-align: center;
  line-height: 24px;
`;

export const ButtonText = styled.span`
  padding-left: 6px;
  padding-right: 12px;
  font-weight: 500;
  color: ${palette.light.title};
  text-transform: uppercase;
`;
