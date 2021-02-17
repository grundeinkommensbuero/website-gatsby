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
        <div className={s.shareButtonContainer}>
          <TwitterShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <TwitterIcon size={70} round={true} bgStyle={{ fillOpacity: 0 }} />
          </TwitterShareButton>
          <p>Twitter</p>
        </div>

        <div className={s.shareButtonContainer}>
          <FacebookShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <FacebookIcon size={70} round={true} bgStyle={{ fillOpacity: 0 }} />
          </FacebookShareButton>
          <p>Facebook</p>
        </div>

        <div className={s.shareButtonContainer}>
          <img
            aria-hidden="true"
            alt="Instagram Logo"
            src={iconInstagram}
            className={s.icon}
          />
          <p>Instagram</p>
        </div>

        <div className={s.shareButtonContainer}>
          <TelegramShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <TelegramIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
          </TelegramShareButton>
          <p>Telegram</p>
        </div>

        <div className={s.shareButtonContainer}>
          <WhatsappShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <WhatsappIcon size={60} round={true} bgStyle={{ fillOpacity: 0 }} />
          </WhatsappShareButton>
          <p>Whats App</p>
        </div>

        <div className={s.shareButtonContainer}>
          <EmailShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <EmailIcon size={70} round={true} bgStyle={{ fillOpacity: 0 }} />
          </EmailShareButton>
          <p>E-Mail</p>
        </div>

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
  )
}
