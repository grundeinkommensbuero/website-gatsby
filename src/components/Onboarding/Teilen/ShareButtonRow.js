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
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

export const ShareButtonRow = () => {
  return (
    <section className={s.shareButtonRow}>
      <FacebookShareButton url={'https://expedition-grundeinkommen.de/'}>
        <FacebookIcon size={45} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={'https://expedition-grundeinkommen.de/'}>
        <TwitterIcon size={45} round={true} />
      </TwitterShareButton>

      <LinkedinShareButton url={'https://expedition-grundeinkommen.de/'}>
        <LinkedinIcon size={45} round={true} />
      </LinkedinShareButton>

      <RedditShareButton url={'https://expedition-grundeinkommen.de/'}>
        <RedditIcon size={45} round={true} />
      </RedditShareButton>

      <TelegramShareButton url={'https://expedition-grundeinkommen.de/'}>
        <TelegramIcon size={45} round={true} />
      </TelegramShareButton>

      <WhatsappShareButton url={'https://expedition-grundeinkommen.de/'}>
        <WhatsappIcon size={45} round={true} />
      </WhatsappShareButton>

      <EmailShareButton url={'https://expedition-grundeinkommen.de/'}>
        <EmailIcon size={45} round={true} />
      </EmailShareButton>
    </section>
  )
}