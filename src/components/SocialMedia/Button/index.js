import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  console.log('props', props);
  return (
    <a target="_blank" href={props.link}>
      <FontAwesomeIcon icon={props.icon} size={props.iconSize} />
    </a>
  );
};
