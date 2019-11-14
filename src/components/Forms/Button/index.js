import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

export function LinkButton({ children, className, ...other }) {
  return (
    <a className={cN(s.linkButton, className)} {...other}>
      {children}
    </a>
  );
}

export function LinkButtonLocal({ children, className, ...other }) {
  return (
    <Link className={cN(s.linkButton, className)} {...other}>
      {children}
    </Link>
  );
}

export function Button({ children, className, ...other }) {
  return (
    <button className={cN(s.button, className)} {...other}>
      {children}
    </button>
  );
}
