import React from 'react';
import s from './style.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default props => {
  const iconSize = 'lg';
  const facebookIcon = <FontAwesomeIcon icon={faFacebook} size={iconSize} />;
  const instagramIcon = <FontAwesomeIcon icon={faInstagram} size={iconSize} />;
  const twitterIcon = <FontAwesomeIcon icon={faTwitter} size={iconSize} />;
  console.log('props', props);
  return (
    <div className={s.container}>
      {props.message !== '' && <p>{props.message}</p>}
      <div className={s.iconContainer}>
        <a target="_blank" href="https://www.facebook.com/expeditionbge/">
          {facebookIcon}
        </a>
        <a target="_blank" href="https://www.instagram.com/expedition.bge/">
          {instagramIcon}
        </a>
        <a target="_blank" href="https://twitter.com/expeditionbge">
          {twitterIcon}
        </a>
      </div>
    </div>
  );
};
