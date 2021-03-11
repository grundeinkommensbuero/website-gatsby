import React from 'react';
import s from './style.module.less';
import ShareButtons from './ShareButtons.json';
import cN from 'classnames';
import { navigate } from 'gatsby';

import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

export const ShareButtonRow = ({
  setShareChannel,
  setSharePreviewActive,
  isInOnboarding,
  executeScroll
}) => {
  const iconInstagram = require('./icons/Instagram.svg');

  const activatePreview = channel => {
    const i = ShareButtons.findIndex(el => el.channelIdentifier === channel);
    // console.log(ShareButtons[i]);
    setShareChannel(ShareButtons[i]);
    setSharePreviewActive(true);
    executeScroll();
  };

  return (
    <>
      <section
        className={cN(
          { [s.shareButtonRow]: isInOnboarding },
          { [s.municipalityShare]: !isInOnboarding }
        )}
      >
        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('twitter')}
        >
          <div className={s.shareButtonContainer}>
            <TwitterIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>Twitter</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('facebook')}
        >
          <div className={s.shareButtonContainer}>
            <FacebookIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>Facebook</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('instagram')}
        >
          <div className={s.shareButtonContainer}>
            <img
              aria-hidden="true"
              alt="Instagram Logo"
              src={iconInstagram}
              className={s.icon}
            />
            <p className={s.shareElementTitle}>Instagram</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('telegram')}
        >
          <div className={s.shareButtonContainer}>
            <TelegramIcon
              size={50}
              round={true}
              bgStyle={{ fillOpacity: 0 }}
              className={s.iconCorrection}
            />
            <p className={s.shareElementTitle}>Telegram</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('whatsapp')}
        >
          <div className={s.shareButtonContainer}>
            <WhatsappIcon
              size={50}
              round={true}
              bgStyle={{ fillOpacity: 0 }}
              className={s.iconCorrection}
            />
            <p className={s.shareElementTitle}>WhatsApp</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('email')}
        >
          <div className={s.shareButtonContainer}>
            <EmailIcon size={65} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>E-Mail</p>
          </div>
        </div>
      </section>
    </>
  );
};
