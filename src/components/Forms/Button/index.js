import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export function LinkButton({ children, className, ...other }) {
  return (
    <a className={cN(s.linkButton, className)} {...other}>
      {children}
    </a>
  );
}

export function Button({ children, className, ...other }) {
  return (
    <button className={cN(s.button, className)} {...other}>
      {children}
    </button>
  );
}
