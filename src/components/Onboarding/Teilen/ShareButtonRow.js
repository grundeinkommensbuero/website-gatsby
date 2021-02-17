import React from 'react';
import s from './style.module.less';

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

export const ShareButtonRow = () => {
  return (
    <section className={s.shareButtonRow}>
      <FacebookShareButton
        url={
          'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
        }
      >
        <FacebookIcon size={45} round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        url={
          'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
        }
      >
        <TwitterIcon size={45} round={true} />
      </TwitterShareButton>

      <LinkedinShareButton
        url={
          'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
        }
      >
        <LinkedinIcon size={45} round={true} />
      </LinkedinShareButton>

      <RedditShareButton
        url={
          'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
        }
      >
        <RedditIcon size={45} round={true} />
      </RedditShareButton>

      <TelegramShareButton
        url={
          'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
        }
      >
        <TelegramIcon size={45} round={true} />
      </TelegramShareButton>

      <WhatsappShareButton
        url={
          'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
        }
      >
        <WhatsappIcon size={45} round={true} />
      </WhatsappShareButton>

      <EmailShareButton
        url={
          'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'
        }
      >
        <EmailIcon size={45} round={true} />
      </EmailShareButton>
    </section>
  );
};
