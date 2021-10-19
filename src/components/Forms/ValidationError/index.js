import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

export const ValidationError = ({ children, className, theme }) => {
  const isChristmasDonationTheme = theme === 'christmas';
  return (
    <div
      className={cN(s.error, className, {
        [s.christmas]: isChristmasDonationTheme,
      })}
    >
      {children}
    </div>
  );
};
