import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import filter from 'lodash/filter';
import every from 'lodash/every';
import findIndex from 'lodash/findIndex';
import { produce } from 'immer';
import InputForm from '../../components/InputForm';
import {
  nameCheck,
  emailCheck,
  mobileCheck,
  passNumberCheck,
} from '../../utils/regexUtil';
import { avatars } from '../../lib/const';
import { color } from '../../lib/styles/palette';
import { moimMemberForm } from '../../utils/formData';
import { postMoimJoinAction } from '../../store/module/detail';
import { MoimDetailModalWrap } from './style';

const validator = {
  name: nameCheck,
  email: emailCheck,
  mobile: mobileCheck,
  passNumber: passNumberCheck,
};

const MoimDetailJoin = () => {
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

  const onInputBlur = useCallback((e) => {
    setFocusInput(null);
  }, []);

  const onInputChange = useCallback((e, i) => {
    const { name, value } = e.target;

    setFormData(
      produce((draft) => {
        draft[i].value = value;
        draft[i].isCheck = validator[name](value);
      }),
    );
  }, []);

  const onInputPassNumberChange = useCallback((e, i, j) => {
    const { value } = e.target;

    if (value <= 9) {
      setFormData(
        produce((draft) => {
          draft[i].value[j] = value;
        }),
      );
    }
  }, []);

  const onJoin = useCallback(
    (formData) => {
      const { userName, memberList, meetingId } = moim;
      const formName =
        formData[findIndex(formData, (form) => form.name === 'name')].value;

      if (
        findIndex(memberList, {
          name: formName,
        }) !== -1
      ) {
        alert('참여명이 이미 존재합니다.');
      } else if (userName === formName) {
        alert('참여명은 클라이언트의 이름으로 할 수 없습니다.');
      } else {
        const userAvatar = {
          name: avatars[Math.floor(Math.random() * 99)],
          colors: [
            color.red,
            color.orange,
            color.green,
            color.blue,
            color.pink,
          ].sort(() => Math.random() - 0.5),
        };

        dispatch(
          postMoimJoinAction.REQUEST({
            meetingId,
            formData,
            userAvatar,
          }),
        );
      }
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

  return (
    <MoimDetailModalWrap>
      <div className="modalInner">
        <h4>JOIN</h4>
        <div className="modalBody">
          <InputForm
            formData={formData}
            focusInput={focusInput}
            onInputFocus={onInputFocus}
            onInputChange={onInputChange}
            onInputPassNumberChange={onInputPassNumberChange}
            onInputBlur={onInputBlur}
            isActive={isActive}
            onConfirm={onJoin}
            confirmText="ok"
          />
        </div>
      </div>
    </MoimDetailModalWrap>
  );
};

export default MoimDetailJoin;
