import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { every } from 'lodash';
import { produce } from 'immer';
import { signInForm } from '../utils/formData';
import { emailCheck, passwordCheck } from '../utils/regexUtil';
import { socialSignInAction, signInAction } from '../store/module/auth';
import InputForm from '../Components/InputForm';
import SocialList from '../Components/SocialList';
import { ModalContentWrap, SocialWrap } from './style';

const validator = [emailCheck, passwordCheck];

const SignIn = () => {
  const dispatch = useDispatch();

  const onSocialSignIn = useCallback(
    (payload) => dispatch(socialSignInAction.REQUEST(payload)),
    [dispatch],
  );

  const onSignIn = useCallback(
    (payload) => dispatch(signInAction.REQUEST(payload)),
    [dispatch],
  );

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(signInForm);

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

  return (
    <ModalContentWrap>
      <div className="modalInner">
        <h4>sign in</h4>
        <div className="modalBody">
          <InputForm
            formData={formData}
            focusInput={focusInput}
            onInputFocus={onInputFocus}
            onInputChange={onInputChange}
            onInputBlur={onInputBlur}
            isActive={isActive}
            onConfirm={onSignIn}
            confirmText="sign in"
          />
          <SocialWrap>
            <span className="subTitle">social login</span>
            <div className="socialList">
              <SocialList onSocialSign={onSocialSignIn} />
            </div>
          </SocialWrap>
        </div>
      </div>
    </ModalContentWrap>
  );
};

export default SignIn;
