import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InputForm from '../../components/InputForm';
import { UserImage, InputAvatar } from './style';

const UserInfoBox = ({
  userImage,
  isActive,
  formData,
  focusInput,
  onImageChange,
  onInputFocus,
  onInputChange,
  onInputBlur,
  onConfirm,
}) => {
  return (
    <>
      <UserImage>
        <span className="userImage">
          {userImage && <img src={userImage} />}
          <label>
            <FontAwesomeIcon icon={faPlus} />
            <InputAvatar
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              onChange={onImageChange}
            />
          </label>
        </span>
      </UserImage>
      <InputForm
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
