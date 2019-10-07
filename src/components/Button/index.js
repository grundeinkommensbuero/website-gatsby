import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export function LinkButton({ children, className, ...other }) {
  return (
    <a className={cN(s.button, className)} {...other}>
      {children}
    </a>
  );
}
