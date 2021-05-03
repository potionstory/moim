import React from 'react';
import DropButton from '../DropButton';
import { linkIcon } from '../../lib/const';
import { CardUrlBoxWrap } from './style';

const CardUrlBox = ({ url, onNewTab, onUrlCopy }) => {
  return (
    <CardUrlBoxWrap>
      <div className="linkBox">
        <a className="url" href={url} target="_blank">
          {url}
        </a>
        <DropButton menu={linkIcon} onHandle={[onNewTab, onUrlCopy]} />
      </div>
    </CardUrlBoxWrap>
  );
};

export default CardUrlBox;
