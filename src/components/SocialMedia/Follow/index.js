import React from 'react';
import SocialMediaButton from '../Button';

export default ({ className }) => (
  <div className={className}>
    <SocialMediaButton
      icon="Facebook"
      link="https://www.facebook.com/expedition.grundeinkommen"
      label="Folge auf Facebook"
    />
    <SocialMediaButton
      icon="Twitter"
      link="https://twitter.com/expeditionbge"
      label="Folge auf Twitter"
    />
    <SocialMediaButton
      icon="Instagram"
      link="https://www.instagram.com/expedition.grundeinkommen/"
      label="Folge auf Instagram"
    />
  </div>
);
