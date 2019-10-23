import React from 'react';
import s from './style.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default () => {
  const iconSize = 'lg';
  const facebookIcon = <FontAwesomeIcon icon={faFacebook} size={iconSize} />;
  const instagramIcon = <FontAwesomeIcon icon={faInstagram} size={iconSize} />;
  const twitterIcon = <FontAwesomeIcon icon={faTwitter} size={iconSize} />;

  return (
    <div className={s.container}>
      <a href="#">{facebookIcon}</a>
      <a href="#">{instagramIcon}</a>
      <a href="#">{twitterIcon}</a>
    </div>
  );
};
