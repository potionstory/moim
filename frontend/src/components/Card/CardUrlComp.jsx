import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowRestore, faLink } from '@fortawesome/free-solid-svg-icons';
import { CardUrl } from './style';

const CardUrlComp = ({ url }) => {
  return (
    <CardUrl className="urlBox">
      <a href={url} className="url">
        {url}
      </a>
      <a href={url} target="_blank" className="btnIcon">
        <FontAwesomeIcon icon={faWindowRestore} />
      </a>
      <button type="button" className="btnIcon">
        <FontAwesomeIcon icon={faLink} />
      </button>
    </CardUrl>
  );
};

export default CardUrlComp;
