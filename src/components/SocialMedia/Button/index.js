import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './style.module.less';
import cN from 'classnames';

export default props => {
  return (
    <a
      target="_blank"
      href={props.link}
      aria-label={props.label}
      className={cN(s.button, props.className)}
    >
      <FontAwesomeIcon icon={props.icon} size={props.iconSize} />
    </a>
  );
};
