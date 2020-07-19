import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import every from 'lodash/every';
import findIndex from 'lodash/findIndex';
import { produce } from 'immer';
import { signUpForm, socialUpForm } from '../../utils/formData';
import { emailCheck, passwordCheck, nameCheck } from '../../utils/regexUtil';
import {
  socialSignAction,
  socialSignUpAction,
  signUpAction,
} from '../../store/module/auth';
import SignUpBox from './SignUpBox';
import SocialUpBox from './SocialUpBox';
import { SignWrap, SignInner, SignBody } from './style';

const formValidators = [
  [emailCheck, passwordCheck, passwordCheck, nameCheck],
  [emailCheck, nameCheck],
];

const SignUp = () => {
  const socialInfo = useSelector((state) => state.auth.socialInfo);

  const dispatch = useDispatch();

  const onSocialSign = useCallback(
    (payload) => dispatch(socialSignAction.REQUEST(payload)),
    [dispatch],
  );

  const onSocialSignUp = useCallback(
    (payload) => dispatch(socialSignUpAction.REQUEST(payload)),
    [dispatch],
  );

  const onSignUp = useCallback(
    (payload) => dispatch(signUpAction.REQUEST(payload)),
    [dispatch],
  );

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(signUpForm);
  const [validator, setValidator] = useState(formValidators[0]);

  const isSocial = useMemo(() => {
    return !isEmpty(socialInfo);
  }, [socialInfo]);

  const isActive = useMemo(() => {
    return every(formData, (item) => item.isCheck);
  }, [formData]);

  const onInputFocus = useCallback((e) => {
    setFocusInput(e.target.name);
  }, []);

  const onInputBlur = useCallback((e) => {
    setFocusInput(null);
  }, []);

  const onInputChange = useCallback(
    (e, i) => {
      const { name, value } = e.target;

      setFormData(
        produce((draft) => {
          draft[i].name = name;
          draft[i].value = value;
          draft[i].isCheck = validator[i](value);
        }),
      );
    },
    [validator],
  );

  useEffect(() => {
    if (isSocial) {
      setFormData(
        produce(socialUpForm, (draft) => {
          const emailIndex = findIndex(socialUpForm, { name: 'email' });
          draft[emailIndex].value = socialInfo.email;
          draft[emailIndex].isCheck = true;
          draft[emailIndex].isDisable = true;
        }),
      );
      setValidator(formValidators[1]);
    } else {
      setFormData(signUpForm);
      setValidator(formValidators[0]);
    }
  }, [socialInfo, isSocial]);

  return (
    <SignWrap>
      <SignInner>
        <h4>{!isSocial ? 'sign up' : 'social up'}</h4>
        <SignBody>
          {!isSocial ? (
            <SignUpBox
              formData={formData}
              focusInput={focusInput}
              isActive={isActive}
              onInputFocus={onInputFocus}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
              onConfirm={onSignUp}
              onSocialSign={onSocialSign}
            />
          ) : (
            <SocialUpBox
              socialInfo={socialInfo}
              formData={formData}
              focusInput={focusInput}
              isActive={isActive}
              onInputFocus={onInputFocus}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
              onConfirm={onSocialSignUp}
            />
          )}
        </SignBody>
      </SignInner>
    </SignWrap>
  );
};

export default SignUp;
