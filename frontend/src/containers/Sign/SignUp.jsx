import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import every from 'lodash/every';
import findIndex from 'lodash/findIndex';
import { produce } from 'immer';
import { signUpForm, userInfoForm } from '../../utils/formData';
import { emailCheck, passwordCheck, nameCheck } from '../../utils/regexUtil';
import {
  socialSignAction,
  socialSignUpAction,
  signAction,
  signUpAction,
} from '../../store/module/auth';
import SignUpBox from './SignUpBox';
import UserInfoBox from './UserInfoBox';
import { SignWrap, SignInner, SignBody } from './style';

const formValidators = [
  [emailCheck, passwordCheck, passwordCheck],
  [emailCheck, nameCheck],
];

const SignUp = () => {
  const dispatch = useDispatch();

  const onSocialSign = useCallback(
    (payload) => dispatch(socialSignAction.REQUEST(payload)),
    [dispatch],
  );

  const onSocialSignUp = useCallback(
    (payload) => dispatch(socialSignUpAction.REQUEST(payload)),
    [dispatch],
  );

  const onSign = useCallback(
    (payload) => dispatch(signAction.REQUEST(payload)),
    [dispatch],
  );

  const onSignUp = useCallback(
    (payload) => dispatch(signUpAction.REQUEST(payload)),
    [dispatch],
  );

  const { isSocial, signInfo } = useSelector((state) => state.auth);

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(signUpForm);
  const [validator, setValidator] = useState(formValidators[0]);

  const isSignInfo = useMemo(() => {
    return !isEmpty(signInfo);
  }, [signInfo]);

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
    if (isSignInfo) {
      setFormData(
        produce(userInfoForm, (draft) => {
          const emailIndex = findIndex(userInfoForm, { name: 'email' });
          draft[emailIndex].value = signInfo.email;
          draft[emailIndex].isCheck = true;
          draft[emailIndex].isDisable = true;
        }),
      );
      setValidator(formValidators[1]);
    } else {
      setFormData(signUpForm);
      setValidator(formValidators[0]);
    }
  }, [signInfo, isSignInfo]);

  return (
    <SignWrap>
      <SignInner>
        <h4>sign up</h4>
        <SignBody>
          {!isSignInfo ? (
            <SignUpBox
              formData={formData}
              focusInput={focusInput}
              isActive={isActive}
              onInputFocus={onInputFocus}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
              onSign={onSign}
              onSocialSign={onSocialSign}
            />
          ) : (
            <UserInfoBox
              signInfo={signInfo}
              formData={formData}
              focusInput={focusInput}
              isActive={isActive}
              onInputFocus={onInputFocus}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
              onConfirm={isSocial ? onSocialSignUp : onSignUp}
            />
          )}
        </SignBody>
      </SignInner>
    </SignWrap>
  );
};

export default SignUp;
