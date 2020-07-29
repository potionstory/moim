import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InputBox from '../../components/InputBox';
import { UserImage } from './style';

const UserInfoBox = ({
  userImage,
  signInfo,
  isActive,
  formData,
  focusInput,
  onImageUpload,
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
          <label>
            <FontAwesomeIcon icon={faPlus} />
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              onChange={onImageUpload}
            />
          </label>
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
