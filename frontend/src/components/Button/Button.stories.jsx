import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner';
import { ButtonWrap, ButtonIconWrap, ButtonIcon, ButtonText } from './style';

export const TextButton = memo(() => {
  return (
    <ButtonWrap>
      <button>
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon className="icon" icon={faFlag} />
          </ButtonIcon>
        </ButtonIconWrap>
        <ButtonText className="text">Button</ButtonText>
      </button>
    </ButtonWrap>
  );
});

export const IconButton = memo(() => {
  return (
    <ButtonWrap>
      <button>
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon className="icon" icon={faFlag} />
          </ButtonIcon>
        </ButtonIconWrap>
      </button>
    </ButtonWrap>
  );
});

export const LinkTextButton = memo(() => {
  return (
    <ButtonWrap>
      <a href="#">
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon className="icon" icon={faFlag} />
          </ButtonIcon>
        </ButtonIconWrap>
        <ButtonText className="text">Button</ButtonText>
      </a>
    </ButtonWrap>
  );
});

export const LinkIconButton = memo(() => {
  return (
    <ButtonWrap>
      <a href="#">
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon className="icon" icon={faFlag} />
          </ButtonIcon>
        </ButtonIconWrap>
      </a>
    </ButtonWrap>
  );
});

export default {
  title: 'components|Button',
};
