import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isNull, filter, every, findIndex } from 'lodash';
import { produce } from 'immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'boring-avatars';
import InputForm from '../Components/InputForm';
import {
  nameCheck,
  emailCheck,
  mobileCheck,
  passNumberCheck,
} from '../utils/regexUtil';
import { avatars } from '../lib/const';
import { color } from '../lib/styles/palette';
import { moimMemberForm } from '../utils/formData';
import { postMoimJoinAction } from '../store/module/detail';
import { ModalContentWrap, MemberImage } from './style';

const validator = {
  name: nameCheck,
  email: emailCheck,
  mobile: mobileCheck,
  passNumber: passNumberCheck,
};

const MoimJoin = () => {
  const { userInfo } = useSelector(({ auth }) => auth);
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const { memberSetting } = moim;

  const [userAvatar, setUserAvatar] = useState({
    name: avatars[Math.floor(Math.random() * 99)],
    colors: [color.red, color.orange, color.green, color.blue, color.pink].sort(
      () => Math.random() - 0.5,
    ),
  });
  const [focusInput, setFocusInput] = useState(null);
  const [formData, setFormData] = useState(
    filter(
      moimMemberForm,
      (form) => form.isReadOnly || memberSetting.formData[form.name],
    ),
  );

  const isActive = useMemo(() => {
    return every(formData, (form) => form.isCheck);
  }, [formData]);

  const onAvatarReset = useCallback(() => {
    setUserAvatar({
      name: avatars[Math.floor(Math.random() * 99)],
      colors: [
        color.red,
        color.orange,
        color.green,
        color.blue,
        color.pink,
      ].sort(() => Math.random() - 0.5),
    });
  }, []);

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

  const onJoin = useCallback(
    (formData) => {
      const { userName, memberList, meetingId } = moim;
      const formName =
        formData[findIndex(formData, (form) => form.name === 'name')].value;

      if (
        findIndex(memberList, {
          userName: formName,
        }) !== -1
      ) {
        alert('참여명이 이미 존재합니다.');
      } else if (userName === formName) {
        alert('참여명은 클라이언트의 이름으로 할 수 없습니다.');
      } else {
        dispatch(
          postMoimJoinAction.REQUEST({
            meetingId,
            formData,
            userId: !isNull(userInfo) ? userInfo.userId : null,
            userImage: !isNull(userInfo) ? userInfo.userImage : null,
            userAvatar,
          }),
        );
      }
    },
    [dispatch, moim, userInfo, userAvatar, formData],
  );

  useEffect(() => {
    if (!isNull(userInfo) && isNull(userInfo.userImage)) {
      setUserAvatar(userInfo.userAvatar);
    } else {
      setUserAvatar({
        name: avatars[Math.floor(Math.random() * 99)],
        colors: [
          color.red,
          color.orange,
          color.green,
          color.blue,
          color.pink,
        ].sort(() => Math.random() - 0.5),
      });
    }
  }, [userInfo]);

  useEffect(() => {
    const name = 'passNumber';
    const index = findIndex(formData, { name });

    setFormData(
      produce((draft) => {
        draft[index].isCheck = validator[name](formData[index].value);
      }),
    );
  }, [formData]);

  useEffect(() => {
    if (!isNull(userInfo)) {
      const { userName, email } = userInfo;

      setFormData(
        produce((draft) => {
          const nameIndex = findIndex(formData, { name: 'name' });
          const emailIndex = findIndex(formData, { name: 'email' });

          if (nameIndex !== -1) {
            draft[nameIndex].value = userName;
            draft[nameIndex].isCheck = true;
          }

          if (emailIndex !== -1) {
            draft[emailIndex].value = email;
            draft[emailIndex].isCheck = true;
          }
        }),
      );
    }
  }, [userInfo]);

  const { name, colors } = userAvatar;

  return (
    <ModalContentWrap>
      <div className="modalInner">
        <h4>join</h4>
        <div className="modalBody">
          <MemberImage isAuth={!isNull(userInfo)}>
            <button
              type="button"
              className="btnReset"
              onClick={() => isNull(userInfo) && onAvatarReset()}
            >
              <FontAwesomeIcon icon={faLaugh} />
            </button>
            <span className="imageBox">
              {isNull(userInfo) || isNull(userInfo.userImage) ? (
                <Avatar
                  size="100%"
                  name={name}
                  variant="beam"
                  colors={colors}
                />
              ) : (
                <img src={userInfo.userImage} />
              )}
            </span>
            <button
              type="button"
              className="btnReset"
              onClick={() => isNull(userInfo) && onAvatarReset()}
            >
              <FontAwesomeIcon icon={faLaugh} />
            </button>
          </MemberImage>
          <InputForm
            formData={formData}
            focusInput={focusInput}
            onInputFocus={onInputFocus}
            onInputChange={onInputChange}
            onInputPassDigitChange={onInputPassDigitChange}
            onInputBlur={onInputBlur}
            isActive={isActive}
            onConfirm={onJoin}
            confirmText="ok"
          />
        </div>
      </div>
    </ModalContentWrap>
  );
};

export default MoimJoin;
