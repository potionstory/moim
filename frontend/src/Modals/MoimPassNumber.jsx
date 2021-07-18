import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map, every } from 'lodash';
import { produce } from 'immer';
import InputForm from '../Components/InputForm';
import { passNumberCheck } from '../utils/regexUtil';
import { moimPassNumberForm } from '../utils/formData';
import { postMoimPassNumberCheckAction } from '../store/module/detail';
import { ModalContentWrap } from './style';

const MoimPassNumber = () => {
  const { moim } = useSelector(({ detail }) => detail);
  const { id, category } = useSelector(({ global }) => global);

  const dispatch = useDispatch();

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(moimPassNumberForm);

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

  const onPassWordConfirm = useCallback(
    (formData) => {
      dispatch(
        postMoimPassNumberCheckAction.REQUEST({
          id,
          category,
          formData,
        }),
      );
    },
    [id, category, dispatch],
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
            onConfirm={onPassWordConfirm}
            confirmText="ok"
          />
        </div>
      </div>
    </ModalContentWrap>
  );
};

export default MoimPassNumber;
