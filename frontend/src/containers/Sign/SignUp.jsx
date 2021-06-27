import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import every from 'lodash/every';
import findIndex from 'lodash/findIndex';
import { produce } from 'immer';
import { avatars } from '../../lib/const';
import { color } from '../../lib/styles/palette';
import { signUpForm, userInfoForm } from '../../utils/formData';
import { emailCheck, passwordCheck, nameCheck } from '../../utils/regexUtil';
import {
  socialSignAction,
  socialSignUpAction,
  signAction,
  signUpAction,
  signUserImageAction,
} from '../../store/module/auth';
import SignUpBox from './SignUpBox';
import UserInfoBox from './UserInfoBox';
import { SignWrap } from './style';

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

      dispatch(
        signUpAction.REQUEST({
          formData: payload,
          userAvatar,
        }),
      );
    },
    [dispatch],
  );

  const onImageUpload = useCallback(
    (payload) => dispatch(signUserImageAction(payload)),
    [dispatch],
  );

  const { isSocial, signInfo } = useSelector(({ auth }) => auth);

  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(signUpForm);
  const [validator, setValidator] = useState(formValidators[0]);
  const [userImage, serUserImage] = useState(null);

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
        serUserImage(reader.result);
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
      serUserImage(signInfo.userImageUrl);
    } else {
      setFormData(signUpForm);
      setValidator(formValidators[0]);
    }
  }, [signInfo, isSignInfo]);

  return (
    <SignWrap>
      <div className="signInner">
        <h4>sign up</h4>
        <div className="signBody">
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
              isActive={isActive}
              formData={formData}
              focusInput={focusInput}
              onImageChange={onImageChange}
              onInputFocus={onInputFocus}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
              onConfirm={isSocial ? onSocialSignUp : onSignUp}
            />
          )}
        </div>
      </div>
    </SignWrap>
  );
};

export default SignUp;
