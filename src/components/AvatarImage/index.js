import React, { useState } from 'react';
import s from './style.module.less';
import cN from 'classnames';

const avatarPlaceholders = [require('./avatar1.svg'), require('./avatar2.svg')];

export default ({ user, className, src }) => {
  const [placeHolderImage] = useState(() => {
    return avatarPlaceholders[
      Math.round(Math.random() * (avatarPlaceholders.length - 1))
    ];
  });
  return (
    <img
      className={cN(s.image, className)}
      src={src || placeHolderImage}
      alt={user && user.name && `Avatarbild von ${user.name}`}
    />
  );
};
