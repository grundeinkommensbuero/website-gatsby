import React from 'react';
import * as s from './style.module.less';
import ShareButtons from './ShareButtons.json';
import cN from 'classnames';

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
  executeScroll,
}) => {
  const iconInstagram = require('!svg-inline-loader!./icons/Instagram.svg');

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
            <p>Twitter</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('facebook')}
        >
          <div className={s.shareButtonContainer}>
            <FacebookIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p>Facebook</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('instagram')}
        >
          <div className={s.shareButtonContainer}>
            <div
              aria-hidden="true"
              className={s.iconInstagram}
              dangerouslySetInnerHTML={{ __html: iconInstagram }}
            ></div>
            <p>Instagram</p>
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
            <p>Telegram</p>
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
            <p>WhatsApp</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={s.shareItem}
          onClick={() => activatePreview('email')}
        >
          <div className={s.shareButtonContainer}>
            <EmailIcon size={65} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p>E-Mail</p>
          </div>
        </div>
      </section>
    </>
  );
};
