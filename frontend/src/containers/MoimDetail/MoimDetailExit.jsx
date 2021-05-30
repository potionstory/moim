import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import filter from 'lodash/filter';
import every from 'lodash/every';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import { produce } from 'immer';
import InputForm from '../../components/InputForm';
import { nameCheck, emailCheck, mobileCheck } from '../../utils/regexUtil';
import { moimMemberForm } from '../../utils/formData';
import { postMoimExitAction } from '../../store/module/detail';
import { MoimDetailModalWrap } from './style';

const validator = {
  name: nameCheck,
  email: emailCheck,
  mobile: mobileCheck,
};

const MoimDetailExit = () => {
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
        draft[i].name = name;
        draft[i].value = value;
        draft[i].isCheck = validator[name](value);
      }),
    );
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

  return (
    <MoimDetailModalWrap>
      <div className="modalInner">
        <h4>EXIT</h4>
        <div className="modalBody">
          <InputForm
            formData={formData}
            focusInput={focusInput}
            onInputFocus={onInputFocus}
            onInputChange={onInputChange}
            onInputBlur={onInputBlur}
            isActive={isActive}
            onConfirm={onExit}
            confirmText="ok"
          />
        </div>
      </div>
    </MoimDetailModalWrap>
  );
};

export default MoimDetailExit;
