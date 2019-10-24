import React from 'react';
import s from '../style.module.less';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import cN from 'classnames';
import SocialMediaButton from '../Button';

export default ({ children, className }) => {
  const iconSize = 'lg';

  return (
    <div className={cN(s.container, className)}>
      {children && <p>{children}</p>}
      <div className={s.iconContainer}>
        <SocialMediaButton
          icon={faFacebook}
          link="https://www.facebook.com/expeditionbge/"
          iconSize={iconSize}
        />
        <SocialMediaButton
          icon={faTwitter}
          link="https://twitter.com/expeditionbge"
          iconSize={iconSize}
        />
        <SocialMediaButton
          icon={faInstagram}
          link="https://www.instagram.com/expedition.bge/"
          iconSize={iconSize}
        />
      </div>
    </div>
  );
};
