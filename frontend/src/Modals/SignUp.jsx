import React, { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, every, findIndex } from 'lodash';
import { produce } from 'immer';
import { toast } from 'react-toastify';
import { avatars } from '../lib/const';
import { color } from '../lib/styles/palette';
import { signUpForm, userInfoForm } from '../utils/formData';
import { emailCheck, passwordCheck, nameCheck } from '../utils/regexUtil';
import {
  socialSignAction,
  socialSignUpAction,
  signAction,
  signUpAction,
  signUserImageAction,
  signAvatarResetAction,
} from '../store/module/auth';
import SignUpBox from './SignUpBox';
import UserInfoBox from './UserInfoBox';
import { ModalContentWrap } from './style';

const formValidators = [
  [emailCheck, passwordCheck, passwordCheck],
  [emailCheck, nameCheck],
];

const SignUp = memo(() => {
  const dispatch = useDispatch();

  const onSocialSign = useCallback(
    (payload) => {
      const userAvatar = {
        name: avatars[Math.floor(Math.random() * 99)],
        colors: [
          color.red,
          color.orange,
          color.green,
          color.blue,
          color.pink,
        ].sort(() => Math.random() - 0.5),
      };

      return dispatch(
        socialSignAction.REQUEST({
          service: payload,
          userAvatar,
        }),
      );
    },
    [dispatch],
  );

  const onSocialSignUp = useCallback(
    (payload) => dispatch(socialSignUpAction.REQUEST(payload)),
    [dispatch],
  );

  const onSign = useCallback(
    (payload) => {
      const userAvatar = {
        name: avatars[Math.floor(Math.random() * 99)],
        colors: [
          color.red,
          color.orange,
          color.green,
          color.blue,
          color.pink,
        ].sort(() => Math.random() - 0.5),
      };

      return dispatch(
        signAction.REQUEST({
          formData: payload,
          userAvatar,
        }),
      );
    },
    [dispatch],
  );

  const onSignUp = useCallback(
    (payload) => dispatch(signUpAction.REQUEST(payload)),
    [dispatch],
  );

  const onImageUpload = useCallback(
    (payload) => dispatch(signUserImageAction(payload)),
    [dispatch],
  );

  const onSignAvatarReset = useCallback(() => {
    const userAvatar = {
      name: avatars[Math.floor(Math.random() * 99)],
      colors: [
        color.red,
        color.orange,
        color.green,
        color.blue,
        color.pink,
      ].sort(() => Math.random() - 0.5),
    };

    dispatch(signAvatarResetAction(userAvatar));
  }, [dispatch]);

  const isSocial = useSelector(({ auth }) => auth.isSocial);
  const signInfo = useSelector(({ auth }) => auth.signInfo);

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(signUpForm);
  const [validator, setValidator] = useState(formValidators[0]);
  const [userImage, setUserImage] = useState(null);

  const isSignInfo = useMemo(() => {
    return !isEmpty(signInfo);
  }, [signInfo]);

  const isActive = useMemo(() => {
    return every(formData, (item) => item.isCheck);
  }, [formData]);

  const onImageChange = useCallback(
    (e) => {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);

      onImageUpload(file);
    },
    [dispatch],
  );

  const onInputFocus = useCallback((e) => {
    setFocusInput(e.target.name);
  }, []);

  const onInputBlur = useCallback(
    (e, i) => {
      setFocusInput(null);

      const { name } = e.target;

      if (!formData[i].isCheck) {
        switch (name) {
          case 'email':
            return toast.error('이메일 형식이 아닙니다.');
          case 'password':
            return toast.error(
              '패스워드 형식이 틀렸습니다. (8~15자리 영문 대소문자, 숫자, 특수 문자 포함(!@#$%^&+=))',
            );
          case 'confirmPassword':
            return toast.error('비밀번호가 일치하지 않습니다.');
          case 'userName':
            return toast.error(
              '유저네임 형식이 틀렸습니다. (4~12자리 한글, 영문)',
            );
          default:
            return false;
        }
      }
    },
    [formData],
  );

  const onInputChange = useCallback(
    (e, i) => {
      const { name, value } = e.target;

      setFormData(
        produce((draft) => {
          draft[i].name = name;
          draft[i].value = value;

          if (name !== 'confirmPassword') {
            draft[i].isCheck = validator[i](value);
          } else {
            draft[i].isCheck =
              validator[i](value) &&
              formData[findIndex(formData, { name: 'password' })].value ===
                value;
          }
        }),
      );
    },
    [formData, validator],
  );

  useEffect(() => {
    if (isSignInfo) {
      setFormData(
        produce(userInfoForm, (draft) => {
          if (signInfo.email) {
            const emailIndex = findIndex(userInfoForm, { name: 'email' });

            draft[emailIndex].value = signInfo.email;
            draft[emailIndex].isCheck = true;
            draft[emailIndex].isDisable = true;
          }
        }),
      );
      setValidator(formValidators[1]);
      setUserImage(signInfo.userImageUrl);
    } else {
      setFormData(signUpForm);
      setValidator(formValidators[0]);
    }
  }, [signInfo, isSignInfo]);

  return (
    <ModalContentWrap>
      <div className="modalInner">
        <h4>sign up</h4>
        <div className="modalBody">
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
              userImage={userImage}
              userAvatar={signInfo.userAvatar}
              isActive={isActive}
              formData={formData}
              focusInput={focusInput}
              onImageChange={onImageChange}
              onSignAvatarReset={onSignAvatarReset}
              onInputFocus={onInputFocus}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
              onConfirm={isSocial ? onSocialSignUp : onSignUp}
            />
          )}
        </div>
      </div>
    </ModalContentWrap>
  );
});

export default SignUp;
