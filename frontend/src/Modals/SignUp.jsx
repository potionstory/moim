import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, every, findIndex } from 'lodash';
import { produce } from 'immer';
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

const SignUp = () => {
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

  const { isSocial, signInfo } = useSelector(({ auth }) => auth);

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
};

export default SignUp;
