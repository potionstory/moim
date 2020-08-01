import styled from 'styled-components';
import { fadeIn, fadeOut } from '../../lib/styles/keyframe';

export const ModalWrap = styled.section`
  overflow: auto;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 360px;
  max-width: calc(100% - 1.5rem);
  max-height: calc(100% - 1.5rem);
  backdrop-filter: blur(32px);
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
  ${({ mode }) =>
    mode
      ? 'background-color: rgba(33, 33, 33, 0.5);'
      : 'background-color: rgba(250, 250, 250, 0.5);'};
  animation: ${({ modalVisible }) => (modalVisible ? fadeIn : fadeOut)} 0.2s
    ease-out forwards;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  width: 24px;
  height: 24px;
  padding: 8px;
  box-sizing: content-box;
  border-radius: 4px;
  text-align: center;
  line-height: 24px;
  opacity: 0.6;
  transition: all 0.2s ease-out;
  svg {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.main};
  }
  &:hover {
    opacity: 1;
  }
`;

export const ModalInner = styled.div`
  position: relative;
  padding: 1.5rem;
`;