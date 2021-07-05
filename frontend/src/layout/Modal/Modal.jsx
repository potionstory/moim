import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalCloseAction } from '../../store/module/global';
import { signUserResetAction } from '../../store/module/auth';
import SignIn from '../../containers/Sign/SignIn';
import SignUp from '../../containers/Sign/SignUp';
import MoimDetailJoin from '../../containers/MoimDetail/MoimDetailJoin';
import MoimDetailExit from '../../containers/MoimDetail/MoimDetailExit';
import MoimDetailPassNumber from '../../containers/MoimDetail/MoimDetailPassNumber';
import { ModalWrap, ModalInner, CloseButton } from './style';

const Modal = () => {
  const dispatch = useDispatch();

  const onModalClose = useCallback(() => {
    dispatch(modalCloseAction());
    dispatch(signUserResetAction());
  }, [dispatch]);

  const { theme, modal } = useSelector(({ global }) => global);
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
      case 'MOIM_JOIN':
        return <MoimDetailJoin />;
      case 'MOIM_EXIT':
        return <MoimDetailExit />;
      case 'MOIM_PASSNUMBER':
        return <MoimDetailPassNumber />
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
      isLight={theme}
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
