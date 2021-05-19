import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import every from 'lodash/every';
import { produce } from 'immer';
import { signInForm } from '../../utils/formData';
import { emailCheck, passwordCheck } from '../../utils/regexUtil';
import { socialSignInAction, signInAction } from '../../store/module/auth';
import InputForm from '../../components/InputForm';
import SocialList from '../../components/SocialList';
import { SignWrap, SignInner, SignBody, SocialArea } from './style';

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
    <SignWrap>
      <SignInner>
        <h4>sign in</h4>
        <SignBody>
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
          <SocialArea>
            <span className="subTitle">social login</span>
            <div className="socialList">
              <SocialList onSocialSign={onSocialSignIn} />
            </div>
          </SocialArea>
        </SignBody>
      </SignInner>
    </SignWrap>
  );
};

export default SignIn;
