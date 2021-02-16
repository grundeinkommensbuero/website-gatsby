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
    <>
      <section className={s.shareButtonRow}>
        <div className={s.shareButtonContainer}>
          <TwitterShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <TwitterIcon size={45} round={true} />
          </TwitterShareButton>
          <p>Twitter</p>
        </div>

        <div className={s.shareButtonContainer}>
          <FacebookShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <FacebookIcon size={45} round={true} />
          </FacebookShareButton>
          <p>Facebook</p>
        </div>

        <div className={s.shareButtonContainer}>
          <LinkedinShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <LinkedinIcon size={45} round={true} />
          </LinkedinShareButton>
          <p>Facebook</p>
        </div>

        <div className={s.shareButtonContainer}>
          <TelegramShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <TelegramIcon size={45} round={true} />
          </TelegramShareButton>
          <p>Facebook</p>
        </div>

        <div className={s.shareButtonContainer}>
          <WhatsappShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <WhatsappIcon size={45} round={true} />
          </WhatsappShareButton>
          <p>Facebook</p>
        </div>

        <div className={s.shareButtonContainer}>
          <EmailShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
            <EmailIcon size={45} round={true} />
          </EmailShareButton>
          <p>Facebook</p>
        </div>


      </section>



      <RedditShareButton url={'https://xbge-municipalities-images.s3.eu-central-1.amazonaws.com/01061001.png'}>
        <RedditIcon size={45} round={true} />
      </RedditShareButton>






    </>
  )
}