import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { CardUrlBoxWrap } from './style';

const CardUrlBox = memo(({ url, onUrlCopy }) => {
  return (
    <CardUrlBoxWrap>
      <div className="linkBox">
        <a className="url" href={url} target="_blank">
          {url}
        </a>
        <button type="button" onClick={onUrlCopy}>
          <FontAwesomeIcon className="icon" icon={faCopy} />
        </button>
      </div>
    </CardUrlBoxWrap>
  );
});

export default CardUrlBox;
