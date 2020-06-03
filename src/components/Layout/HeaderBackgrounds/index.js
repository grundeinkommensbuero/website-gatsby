import React from 'react';
import s from './style.module.less';

const BACKGROUNDS = [
  require('./backgrounds/01.svg'),
  require('./backgrounds/02.svg'),
  require('./backgrounds/03.svg'),
  require('./backgrounds/04.svg'),
];

export default () => {
  return (
    <img
      alt=""
      className={s.background}
      src={BACKGROUNDS[Math.round((BACKGROUNDS.length - 1) * Math.random())]}
    />
  );
};
