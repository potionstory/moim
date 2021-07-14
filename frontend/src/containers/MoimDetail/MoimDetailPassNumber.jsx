import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map, filter, every, isEqual, findIndex, fromPairs } from 'lodash';
import { produce } from 'immer';
import InputForm from '../../components/InputForm';
import { passNumberCheck } from '../../utils/regexUtil';
import { moimPassNumberForm } from '../../utils/formData';
import { putMoimPassnumberAction } from '../../store/module/detail';
import { MoimDetailModalWrap } from './style';

const MoimDetailPassWord = () => {
  const { moim } = useSelector(({ detail }) => detail);
  const { category } = useSelector(({ global }) => global);

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
      if (isEqual(formData[0].value, formData[1].value)) {
        dispatch(
          putMoimPassnumberAction.REQUEST({
            id: moim[`${category}Id`],
            category,
            formData,
          })
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
        map(draft, form => {
          form.isCheck = passNumberCheck(form.value);

          return form;
        });
      }),
    );
  }, [formData]);

  return (
    <MoimDetailModalWrap>
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
    </MoimDetailModalWrap>
  );
};

export default MoimDetailPassWord;
