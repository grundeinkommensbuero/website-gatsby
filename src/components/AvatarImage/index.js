import React, { useState } from 'react';
import * as s from './style.module.less';
import cN from 'classnames';
import { StaticImage } from 'gatsby-plugin-image';

const avatarPlaceholders = [require('!svg-inline-loader!./avatar1.svg'), require('!svg-inline-loader!./avatar2.svg')];

export default ({ user, className, srcOverwrite, sizes }) => {
  const [placeHolderImage] = useState(() => {
    return avatarPlaceholders[
      Math.round(Math.random() * (avatarPlaceholders.length - 1))
    ];
  });

  const srcset =
    user && user.profilePictures && generateSrcset(user.profilePictures);
  const src =
    user && user.profilePictures && Object.entries(user.profilePictures)[0][1];

  return (
    <>
      {srcset || src ?
        <img
          className={cN(s.image, className)}
          src={
            srcOverwrite || (user && user.srcOverwrite) || src
          }
          srcSet={srcOverwrite || (user && user.srcOverwrite) ? null : srcset}
          alt={user && user.name && `Avatarbild von ${user.name}`}
          sizes={sizes}
        /> :
        <div className={cN(s.image, className)} dangerouslySetInnerHTML={{ __html: placeHolderImage }}></div>}
    </>
  );
};


const generateSrcset = images => {
  return Object.entries(images)
    .filter(([width]) => {
      return !isNaN(parseInt(width));
    })
    .map(([width, file]) => {
      return `${file} ${width}w`;
    })
    .join(', ');
};
