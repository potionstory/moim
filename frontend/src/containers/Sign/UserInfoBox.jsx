import React from 'react';
import InputBox from '../../components/InputBox';
import { UserImage } from './style';

const UserInfoBox = ({
  signInfo,
  formData,
  focusInput,
  isActive,
  onInputFocus,
  onInputChange,
  onInputBlur,
  onConfirm,
}) => {
  return (
    <>
      <UserImage>
        <span className="userImage">
          <img src={signInfo.userImageUrl} />
        </span>
      </UserImage>
      <InputBox
        formData={formData}
        focusInput={focusInput}
        onInputFocus={onInputFocus}
        onInputChange={onInputChange}
        onInputBlur={onInputBlur}
        isActive={isActive}
        onConfirm={onConfirm}
        confirmText="sign up"
      />
    </>
  );
};

export default UserInfoBox;
