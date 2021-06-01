import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import filter from 'lodash/filter';
import every from 'lodash/every';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import { produce } from 'immer';
import InputForm from '../../components/InputForm';
import {
  nameCheck,
  emailCheck,
  mobileCheck,
  passNumberCheck,
} from '../../utils/regexUtil';
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
    const { name, value } = e.target;

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
