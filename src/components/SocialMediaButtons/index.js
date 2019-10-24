import React from 'react';
import s from './style.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import cN from 'classnames';

export default ({ children, className }) => {
  return (
    <div className={cN(s.container, className)}>
      {children && <p>{children}</p>}
      <div className={s.iconContainer}>
        <LinkIcon
          link="https://www.facebook.com/expeditionbge/"
          icon={faFacebook}
          label="Teile auf Facebook"
        />
        <LinkIcon
          link="https://www.instagram.com/expedition.bge/"
          icon={faInstagram}
          label="Teile auf Instagram"
        />
        <LinkIcon
          link="https://twitter.com/expeditionbge"
          icon={faTwitter}
          label="Teile auf Twitter"
        />
      </div>
    </div>
  );
};

const LinkIcon = ({ link, icon, label }) => (
  <a target="_blank" href={link} aria-label={label} className={s.link}>
    <FontAwesomeIcon icon={icon} size="3x" />
  </a>
);
