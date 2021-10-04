import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

const icons = {
  Facebook: require('!svg-inline-loader!./icons/facebook-brands.svg'),
  FacebookSquare: require('!svg-inline-loader!./icons/facebook-square-brands.svg'),
  Instagram: require('!svg-inline-loader!./icons/instagram-brands.svg'),
  Twitter: require('!svg-inline-loader!./icons/twitter-brands.svg'),
  WhatsApp: require('!svg-inline-loader!./icons/whatsapp-brands.svg'),
  WhatsAppSquare: require('!svg-inline-loader!./icons/whatsapp-square-brands.svg'),
  Telegram: require('!svg-inline-loader!./icons/telegram-plane-brands.svg'),
  TelegramRound: require('!svg-inline-loader!./icons/telegram-brands.svg'),
  Youtube: require('!svg-inline-loader!./icons/youtube.svg'),
};

export default ({ link, label, className, icon, iconSize }) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={link}
    aria-label={label}
    className={cN(s.button, className, s['button' + iconSize])}
    dangerouslySetInnerHTML={{ __html: icons[icon] }}
  />
);
