import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';
import SocialMediaButton from '../Button';

export default ({ className }) => (
  <div className={cN(s.followButtons, className)}>
    <SocialMediaButton
      icon="Facebook"
      link="https://www.facebook.com/expedition.grundeinkommen"
      label="Folge auf Facebook"
      className={s.button}
    />
    <SocialMediaButton
      icon="Twitter"
      link="https://twitter.com/expeditionbge"
      label="Folge auf Twitter"
      className={s.button}
    />
    <SocialMediaButton
      icon="Instagram"
      link="https://www.instagram.com/expedition.grundeinkommen/"
      label="Folge auf Instagram"
      className={s.button}
    />
  </div>
);
