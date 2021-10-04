import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isNull, filter, every, findIndex } from 'lodash';
import { produce } from 'immer';
import { toast } from 'react-toastify';
import InputForm from '../Components/InputForm';
import {
  nameCheck,
  emailCheck,
  mobileCheck,
  passNumberCheck,
} from '../utils/regexUtil';
import { moimMemberForm } from '../utils/formData';
import { postMoimExitAction } from '../store/module/detail';
import { ModalContentWrap } from './style';

const validator = {
  name: nameCheck,
  email: emailCheck,
  mobile: mobileCheck,
  passNumber: passNumberCheck,
};

const MoimExit = () => {
  const { userInfo } = useSelector(({ auth }) => auth);
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const { memberSetting } = moim;

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(
    filter(
      moimMemberForm,
      (item) => item.isReadOnly || memberSetting.formData[item.name],
    ),
  );

  const isActive = useMemo(() => {
    return every(formData, (item) => item.isCheck);
  }, [formData]);

  const onInputFocus = useCallback((e) => {
    setFocusInput(e.target.name);
  }, []);

  const onInputBlur = useCallback(
    (e, i) => {
      setFocusInput(null);

      const { name } = e.target;

      if (name !== 'passNumber' && !formData[i].isCheck) {
        switch (name) {
          case 'name':
            return toast.error(
              '유저네임 형식이 틀렸습니다. (4~12자리 한글, 영문)',
            );
          case 'email':
            return toast.error('이메일 형식이 아닙니다.');
          case 'mobile':
            return toast.error('모바일 형식이 아닏니다.');
          default:
            return false;
        }
      }
    },
    [formData],
  );

  const onInputChange = useCallback((e, i) => {
    const { name, value } = e.target;

    setFormData(
      produce((draft) => {
        draft[i].name = name;
        draft[i].value = value;
        draft[i].isCheck = validator[name](value);
      }),
    );
  }, []);

  const onInputPassDigitChange = useCallback((e, i, j) => {
    const { value } = e.target;

    if (value <= 9) {
      setFormData(
        produce((draft) => {
          draft[i].value[j] = value;
        }),
      );
    }
  }, []);

  const onExit = useCallback(
    (formData) => {
      const { meetingId } = moim;

      dispatch(
        postMoimExitAction.REQUEST({
          meetingId,
          formData,
        }),
      );
    },
    [dispatch, moim],
  );

  useEffect(() => {
    const name = 'passNumber';
    const index = findIndex(formData, { name });

    setFormData(
      produce((draft) => {
        draft[index].isCheck = validator[name](formData[index].value);
      }),
    );
  }, [formData]);

  useEffect(() => {
    if (!isNull(userInfo)) {
      const { userName, email } = userInfo;

      setFormData(
        produce((draft) => {
          const nameIndex = findIndex(formData, { name: 'name' });
          const emailIndex = findIndex(formData, { name: 'email' });

          if (nameIndex !== -1) {
            draft[nameIndex].value = userName;
            draft[nameIndex].isCheck = true;
          }

          if (emailIndex !== -1) {
            draft[emailIndex].value = email;
            draft[emailIndex].isCheck = true;
          }
        }),
      );
    }
  }, [userInfo]);

  return (
    <ModalContentWrap>
      <div className="modalInner">
        <h4>exit</h4>
        <div className="modalBody">
          <InputForm
            formData={formData}
            focusInput={focusInput}
            onInputFocus={onInputFocus}
            onInputChange={onInputChange}
            onInputPassDigitChange={onInputPassDigitChange}
            onInputBlur={onInputBlur}
            isActive={isActive}
            onConfirm={onExit}
            confirmText="ok"
          />
        </div>
      </div>
    </ModalContentWrap>
  );
};

export default MoimExit;
