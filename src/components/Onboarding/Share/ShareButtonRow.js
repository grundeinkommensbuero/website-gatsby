import React from 'react';
import s from './style.module.less';

import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

export const ShareButtonRow = ({ setShareChannel, setSharePreviewActive }) => {
  const iconInstagram = require('./icons/Instagram.svg');

  const activatePreview = channel => {
    setShareChannel(channel);
    setSharePreviewActive(true);
  };

  return (
    <>
      <section className={s.shareButtonRow}>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('Twitter')}
        >
          <div className={s.shareButtonContainer}>
            <TwitterIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>Twitter</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('Facebook')}
        >
          <div className={s.shareButtonContainer}>
            <FacebookIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>Facebook</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('Instagram')}
        >
          <div className={s.shareButtonContainer}>
            <img
              aria-hidden="true"
              alt="Instagram Logo"
              src={iconInstagram}
              className={(s.icon)}
            />
            <p className={s.shareElementTitle}>Instagram</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('Telegram')}
        >
          <div className={s.shareButtonContainer}>
            <TelegramIcon size={50} round={true} bgStyle={{ fillOpacity: 0 }} className={s.iconCorrection} />
            <p className={s.shareElementTitle}>Telegram</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('What\'s App')}
        >
          <div className={s.shareButtonContainer}>
            <WhatsappIcon size={50} round={true} bgStyle={{ fillOpacity: 0 }} className={s.iconCorrection} />
            <p className={s.shareElementTitle}>What's App</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('E-Mail')}
        >
          <div className={s.shareButtonContainer}>
            <EmailIcon size={65} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>E-Mail</p>
          </div>
        </div>
      </section>

    </>
  )
}
