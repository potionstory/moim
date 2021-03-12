import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalCloseAction } from '../../store/module/global';
import SignIn from '../../containers/Sign/SignIn';
import SignUp from '../../containers/Sign/SignUp';
import { ModalWrap, ModalInner, CloseButton } from './style';

const Modal = () => {
  const dispatch = useDispatch();

  const onModalClose = useCallback(() => dispatch(modalCloseAction()), [
    dispatch,
  ]);

  const { mode, modal } = useSelector(({ global }) => global);
  const { isVisible, name } = modal;

  const [modalVisible, setModalVisible] = useState(false);

  const onButtonClose = useCallback(() => setModalVisible(false));

  const onModalOpen = useCallback(() => console.log('onModalOpen'));

  const onModalAnimationEnd = useCallback((isStart) => {
    if (isStart) {
      onModalOpen();
    } else {
      onModalClose();
    }
  }, []);

  const getModalContent = useCallback(() => {
    switch (name) {
      case 'SIGN_IN':
        return <SignIn />;
      case 'SIGN_UP':
        return <SignUp />;
      default:
        return;
    }
  }, [name]);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <ModalWrap
      isVisible={isVisible || modalVisible}
      mode={mode ? 1 : 0}
      modalVisible={modalVisible}
      onAnimationEnd={() => onModalAnimationEnd(modalVisible)}
    >
      <CloseButton onClick={onButtonClose}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseButton>
      <ModalInner>{getModalContent()}</ModalInner>
    </ModalWrap>
  );
};

export default Modal;
