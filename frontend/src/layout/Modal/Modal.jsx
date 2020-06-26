import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalCloseAction } from '../../store/module/global';
import Sign from '../../containers/Sign';
import { ModalWrap, ModalInner, CloseButton } from './style';

const Modal = ({ isVisible, mode, type }) => {
  const dispatch = useDispatch();
  const onModalClose = useCallback(() => dispatch(modalCloseAction()), [
    dispatch,
  ]);

  const [modalVisible, setModalvisible] = useState(false);

  const onButtonClose = useCallback(() => setModalvisible(false));

  const onModalOpen = useCallback(() => console.log('111111'));

  const onModalAnimationEnd = useCallback((isStart) => {
    if (isStart) {
      onModalOpen();
    } else {
      onModalClose();
    }
  }, []);

  useEffect(() => {
    setModalvisible(isVisible);
  }, [isVisible]);

  return (
    <ModalWrap
      isVisible={isVisible || modalVisible}
      modalVisible={modalVisible}
      mode={mode}
      onAnimationEnd={() => onModalAnimationEnd(modalVisible)}
    >
      <ModalInner>
        <CloseButton onClick={onButtonClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        {type === 'SIGN' && <Sign />}
      </ModalInner>
    </ModalWrap>
  );
};

export default Modal;
