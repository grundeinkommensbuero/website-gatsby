import React, { useState } from 'react';
import s from './style.module.less';
import cN from 'classnames';

const avatarPlaceholders = [require('./avatar1.svg'), require('./avatar2.svg')];

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
    <img
      className={cN(s.image, className)}
      src={srcOverwrite || src || placeHolderImage}
      srcset={srcOverwrite ? null : srcset}
      alt={user && user.name && `Avatarbild von ${user.name}`}
      sizes={sizes}
    />
  );
};

const generateSrcset = images => {
  return Object.entries(images)
    .map(([width, file]) => {
      return `${file} ${width}w`;
    })
    .join(', ');
};
