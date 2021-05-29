import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import filter from 'lodash/filter';
import every from 'lodash/every';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import { produce } from 'immer';
import InputForm from '../../components/InputForm';
import { nameCheck, emailCheck, mobileCheck } from '../../utils/regexUtil';
import { moimJoinForm } from '../../utils/formData';
import { postMoimJoinAction } from '../../store/module/detail';
import { MoimDetailJoinWrap } from './style';

const validator = {
  name: nameCheck,
  email: emailCheck,
  mobile: mobileCheck,
};

const MoimDetailJoin = () => {
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const { memberSetting } = moim;

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(
    filter(
      moimJoinForm,
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
        draft[i].name = name;
        draft[i].value = value;
        draft[i].isCheck = validator[name](value);
      }),
    );
  }, []);

  const onJoin = useCallback(
    (formData) => {
      const { meetingId, memberList } = moim;

      if (
        every(
          map(formData, (form) =>
            findIndex(memberList, { [form.name]: form.value }),
          ),
          (item) => item === -1,
        )
      ) {
        dispatch(
          postMoimJoinAction.REQUEST({
            meetingId,
            formData,
          }),
        );
      } else {
        alert('이름 / 전화번호 / 이메일에서 이미 존재하는 항목이 있습니다.');
      }
    },
    [dispatch, moim],
  );

  return (
    <MoimDetailJoinWrap>
      <div className="joinInner">
        <h4>JOIN</h4>
        <div className="joinBody">
          <InputForm
            formData={formData}
            focusInput={focusInput}
            onInputFocus={onInputFocus}
            onInputChange={onInputChange}
            onInputBlur={onInputBlur}
            isActive={isActive}
            onConfirm={onJoin}
            confirmText="ok"
          />
        </div>
      </div>
    </MoimDetailJoinWrap>
  );
};

export default MoimDetailJoin;
