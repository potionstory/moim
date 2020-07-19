import React from 'react';
import InputBox from '../../components/InputBox';
import { SocialBox } from './style';

const SocialUpBox = ({
  socialInfo,
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
      <SocialBox>
        <span className="userImage">
          <img src={socialInfo.userImageUrl} />
        </span>
      </SocialBox>
      <InputBox
        formData={formData}
        focusInput={focusInput}
        onInputFocus={onInputFocus}
        onInputChange={onInputChange}
        onInputBlur={onInputBlur}
        isActive={isActive}
        onConfirm={onConfirm}
        confirmText="social up"
      />
    </>
  );
};

export default SocialUpBox;
