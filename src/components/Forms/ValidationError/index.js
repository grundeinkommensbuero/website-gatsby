import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export const ValidationError = ({ children, className, theme }) => {
  const isChristmasTheme = theme === 'christmas';
  return (
    <div className={cN(s.error, className, {[s.christmas]: isChristmasTheme})}>{children}</div>
  );
}

