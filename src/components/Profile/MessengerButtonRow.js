import React from 'react';
import SocialMediaButton from '../SocialMedia/Button';
import * as gS from './style.module.less';

export const MessengerButtonRow = ({ iconSize }) => {
  return (
    <div className={gS.socialButtonRow}>
      <SocialMediaButton
        icon="WhatsApp"
        link=""
        iconSize={iconSize}
        label=""
        className={gS.messengerIcon}
      />
      <SocialMediaButton
        icon="Telegram"
        link=""
        iconSize={iconSize}
        label=""
        className={gS.messengerIcon}
      />
      <SocialMediaButton
        icon="Facebook"
        link=""
        iconSize={iconSize}
        label=""
        className={gS.messengerIcon}
      />
    </div>
  )
}