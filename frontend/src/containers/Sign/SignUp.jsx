import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import every from 'lodash/every';
import { produce } from 'immer';
import { signup } from '../../utils/formData';
import {
  emailCheck,
  passwordCheck,
  usernameCheck,
} from '../../utils/regexUtil';
import { socialSignUpAction, signUpAction } from '../../store/module/auth';
import InputBox from '../../components/InputBox';
import SocialList from '../../components/SocialList';
import {
  SignWrap,
  SignArea,
  SignBox,
  InputSubmit,
  ValidationText,
  SocialBox,
} from './style';

const validators = [emailCheck, passwordCheck, passwordCheck, usernameCheck];

const SignUp = () => {
  const dispatch = useDispatch();

  const onSocialSignUp = useCallback(
    (payload) => dispatch(socialSignUpAction.REQUEST(payload)),
    [dispatch],
  );

  const onSignUp = useCallback(
    (payload) => dispatch(signUpAction.REQUEST(payload)),
    [dispatch],
  );

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(signup);

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
        draft[i].isCheck = validators[i](value);
      }),
    );
  }, []);

  return (
    <SignWrap>
      <SignArea>
        <h4>sign up</h4>
        <SignBox>
          {map(formData, (form, index) => (
            <InputBox
              key={index}
              isActive={form.name === focusInput}
              index={index}
              form={form}
              onInputFocus={onInputFocus}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
            />
          ))}
          <InputSubmit isActive={isActive}>
            <button
              type="button"
              onClick={() => {
                isActive && onSignUp(formData);
              }}
            >
              sign up
            </button>
          </InputSubmit>
          {/* <ValidationText>
            <span>이메일 형식이 올바르지 않습니다.</span>
            <span>패스워드 형식이 올바르지 않습니다.</span>
          </ValidationText> */}
        </SignBox>
        <SocialBox>
          <span className="subTitle">social login</span>
          <div className="socialList">
            <SocialList onSocialSign={onSocialSignUp} />
          </div>
        </SocialBox>
      </SignArea>
    </SignWrap>
  );
};

export default SignUp;
