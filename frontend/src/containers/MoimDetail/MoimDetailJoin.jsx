import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import every from 'lodash/every';
import { produce } from 'immer';
import InputForm from '../../components/InputForm';
import { nameCheck, mobileCheck } from '../../utils/regexUtil';
import { moimJoinForm } from '../../utils/formData';
import { postMoimJoinAction } from '../../store/module/detail';
import { MoimDetailJoinWrap } from './style';

const validator = [nameCheck, mobileCheck];

const MoimDetailJoin = () => {
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(moimJoinForm);

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
        draft[i].isCheck = validator[i](value);
      }),
    );
  }, []);

  const onJoin = useCallback(
    (formData) => {
      const { meetingId } = moim;

      dispatch(
        postMoimJoinAction.REQUEST({
          meetingId,
          formData,
        }),
      );
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
