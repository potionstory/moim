import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalCloseAction } from '../../store/module/global';
import { signUserResetAction } from '../../store/module/auth';
import SignIn from '../../Modals/SignIn';
import SignUp from '../../Modals/SignUp';
import MoimJoin from '../../Modals/MoimJoin';
import MoimExit from '../../Modals/MoimExit';
import MoimPassNumber from '../../Modals/MoimPassNumber';
import MoimPassNumberSetting from '../../Modals/MoimPassNumberSetting';
import { ModalWrap } from './style';

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
        return <MoimJoin />;
      case 'MOIM_EXIT':
        return <MoimExit />;
      case 'MOIM_PASSNUMBER':
        return <MoimPassNumber />;
      case 'MOIM_PASSNUMBER_SETTING':
        return <MoimPassNumberSetting />;
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
      <button type="button" className="btnModalClose" onClick={onButtonClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="modalContent">{getModalContent()}</div>
    </ModalWrap>
  );
};

export default Modal;
