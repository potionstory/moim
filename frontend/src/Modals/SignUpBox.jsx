import React, { memo } from 'react';
import InputForm from '../Components/InputForm';
import SocialList from '../Components/SocialList';
import { SocialWrap } from './style';

const SignUpBox = memo(
  ({
    formData,
    focusInput,
    isActive,
    onInputFocus,
    onInputChange,
    onInputBlur,
    onSign,
    onSocialSign,
  }) => {
    return (
      <>
        <InputForm
          formData={formData}
          focusInput={focusInput}
          onInputFocus={onInputFocus}
          onInputChange={onInputChange}
          onInputBlur={onInputBlur}
          isActive={isActive}
          onConfirm={onSign}
          confirmText="sign info"
        />
        <SocialWrap>
          <span className="subTitle">social login</span>
          <div className="socialList">
            <SocialList onSocialSign={onSocialSign} />
          </div>
        </SocialWrap>
      </>
    );
  },
);

export default SignUpBox;
