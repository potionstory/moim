import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner';
import {
  LinkButtonWrap,
  ButtonIconWrap,
  ButtonIcon,
  ButtonText,
} from './style';

export const LinkButton = () => {
  return (
    <LinkButtonWrap>
      <a href="/">
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon icon={faCoffee} />
          </ButtonIcon>
        </ButtonIconWrap>
        <ButtonText>사용자 정의 버튼</ButtonText>
      </a>
    </LinkButtonWrap>
  );
};

export default {
  title: 'components|LinkButton',
};
