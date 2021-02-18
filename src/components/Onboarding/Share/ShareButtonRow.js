import React from 'react';
import s from './style.module.less';

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

export const ShareButtonRow = () => {
  const iconInstagram = require('./icons/Instagram.svg');

  return (
    <>
      <section className={s.shareButtonRow}>
        <TwitterShareButton
          url={
            'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
          }
          className={s.shareItem}
        >
          <div className={s.shareButtonContainer}>
            <TwitterIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>Twitter</p>
          </div>
        </TwitterShareButton>

        <FacebookShareButton
          url={
            'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
          }
          className={s.shareItem}
        >
          <div className={s.shareButtonContainer}>
            <FacebookIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>Facebook</p>
          </div>
        </FacebookShareButton>

        <div className={s.shareItem}>
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

        <TelegramShareButton
          url={
            'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
          }
          className={s.shareItem}
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
        </TelegramShareButton>

        <WhatsappShareButton
          url={
            'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
          }
          className={s.shareItem}
        >
          <div className={s.shareButtonContainer}>
            <WhatsappIcon
              size={50}
              round={true}
              bgStyle={{ fillOpacity: 0 }}
              className={s.iconCorrection}
            />
            <p className={s.shareElementTitle}>Whats App</p>
          </div>
        </WhatsappShareButton>

        <EmailShareButton
          url={
            'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
          }
          className={s.shareItem}
        >
          <div className={s.shareButtonContainer}>
            <EmailIcon size={65} round={true} bgStyle={{ fillOpacity: 0 }} />
            <p className={s.shareElementTitle}>E-Mail</p>
          </div>
        </EmailShareButton>

        {/* <div className={s.shareButtonContainer}>
          <LinkedinShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <LinkedinIcon size={45} round={true} />
          </LinkedinShareButton>
          <p>LinkedIn</p>
        </div>

        <div className={s.shareButtonContainer}>
          <RedditShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <RedditIcon size={45} round={true} />
          </RedditShareButton>
          <p>Reddit</p>
        </div> */}
      </section>
    </>
  );
};
