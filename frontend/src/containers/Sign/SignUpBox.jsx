import React from 'react';
import InputForm from '../../components/InputForm';
import SocialList from '../../components/SocialList';
import { SocialArea } from './style';

const SignUpBox = ({
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
      <SocialArea>
        <span className="subTitle">social login</span>
        <div className="socialList">
          <SocialList onSocialSign={onSocialSign} />
        </div>
      </SocialArea>
    </>
  );
};

export default SignUpBox;
