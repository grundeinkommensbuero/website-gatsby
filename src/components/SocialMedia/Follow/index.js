import React from 'react';
import s from './style.module.less';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import cN from 'classnames';
import SocialMediaButton from '../Button';

export default ({ className }) => {
  const iconSize = 'lg';

  return (
    <div className={cN(s.followButtons, className)}>
      <SocialMediaButton
        icon={faFacebook}
        link="https://www.facebook.com/expeditionbge/"
        iconSize={iconSize}
        label="Folge auf Facebook"
        className={s.button}
      />
      <SocialMediaButton
        icon={faTwitter}
        link="https://twitter.com/expeditionbge"
        iconSize={iconSize}
        label="Folge auf Twitter"
        className={s.button}
      />
      <SocialMediaButton
        icon={faInstagram}
        link="https://www.instagram.com/expedition.bge/"
        iconSize={iconSize}
        label="Folge auf Instagram"
        className={s.button}
      />
    </div>
  );
};
