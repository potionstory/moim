import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faLaugh } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'boring-avatars';
import InputForm from '../Components/InputForm';
import { UserImage } from './style';

const UserInfoBox = ({
  userImage,
  userAvatar,
  isActive,
  formData,
  focusInput,
  onImageChange,
  onSignAvatarReset,
  onInputFocus,
  onInputChange,
  onInputBlur,
  onConfirm,
}) => {
  const { name, colors } = userAvatar;

  return (
    <>
      <UserImage>
        <label className="btnUpload">
          <FontAwesomeIcon icon={faImage} />
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            onChange={onImageChange}
          />
        </label>
        <span className="imageBox">
          {!userImage ? (
            <Avatar size="100%" name={name} variant="beam" colors={colors} />
          ) : (
            <img src={userImage} />
          )}
        </span>
        <button type="button" className="btnReset" onClick={onSignAvatarReset}>
          <FontAwesomeIcon icon={faLaugh} />
        </button>
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
