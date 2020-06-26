import styled from 'styled-components';
import { fadeIn, fadeOut } from '../../lib/styles/keyframe';

export const ModalWrap = styled.section`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  padding: 24px;
  z-index: 100;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
  backdrop-filter: blur(32px);
  ${({ mode }) =>
    mode
      ? 'background-color: rgba(33, 33, 33, 0.5);'
      : 'background-color: rgba(250, 250, 250, 0.5);'};
  transform: translate(-50%, -50%);
  animation: ${({ modalVisible }) => (modalVisible ? fadeIn : fadeOut)} 0.2s
    ease-out forwards;
`;

export const ModalInner = styled.div`
  display: flex;
  position: relative;
  color: ${({ theme }) => theme.main};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  padding: 8px;
  box-sizing: content-box;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.title};
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
