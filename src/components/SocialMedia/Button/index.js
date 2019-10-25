import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from '../style.module.less';

export default props => {
  console.log('props', props);
  return (
    <a
      target="_blank"
      href={props.link}
      aria-label={props.label}
      className={s.link}
    >
      <FontAwesomeIcon icon={props.icon} size={props.iconSize} />
    </a>
  );
};
