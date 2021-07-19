import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map, every, isEqual } from 'lodash';
import { produce } from 'immer';
import InputForm from '../Components/InputForm';
import { passNumberCheck } from '../utils/regexUtil';
import { moimPassNumberSettingForm } from '../utils/formData';
import { putMoimPassNumberSettingAction } from '../store/module/detail';
import { ModalContentWrap } from './style';

const MoimPassNumberSetting = () => {
  const { moim } = useSelector(({ detail }) => detail);
  const { category } = useSelector(({ global }) => global);

  const dispatch = useDispatch();

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(moimPassNumberSettingForm);

  const isActive = useMemo(() => {
    return every(formData, (item) => item.isCheck);
  }, [formData]);

  const onInputFocus = useCallback((e) => {
    setFocusInput(e.target.name);
  }, []);

  const onInputBlur = useCallback((e) => {
    setFocusInput(null);
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

  const onConfirm = useCallback(
    (formData) => {
      if (isEqual(formData[0].value, formData[1].value)) {
        dispatch(
          putMoimPassNumberSettingAction.REQUEST({
            id: moim[`${category}Id`],
            category,
            formData,
          }),
        );
      } else {
        console.log('passnumber not equal'); // toast
      }
    },
    [moim, category, dispatch],
  );

  useEffect(() => {
    setFormData(
      produce((draft) => {
        map(draft, (form) => {
          form.isCheck = passNumberCheck(form.value);

          return form;
        });
      }),
    );
  }, [formData]);

  return (
    <ModalContentWrap>
      <div className="modalInner">
        <h4>passnumber</h4>
        <div className="modalBody">
          <InputForm
            formData={formData}
            focusInput={focusInput}
            onInputFocus={onInputFocus}
            onInputPassDigitChange={onInputPassDigitChange}
            onInputBlur={onInputBlur}
            isActive={isActive}
            onConfirm={onConfirm}
            confirmText="ok"
          />
        </div>
      </div>
    </ModalContentWrap>
  );
};

export default MoimPassNumberSetting;
