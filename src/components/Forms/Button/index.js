import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

export function LinkButton({ children, className, size, ...other }) {
  return (
    <a
      className={cN(s.linkButton, className, { [s.medium]: size === 'MEDIUM' })}
      {...other}
    >
      {children}
    </a>
  );
}

export function LinkButtonLocal({ children, className, size, ...other }) {
  return (
    <Link
      className={cN(s.linkButton, className, { [s.medium]: size === 'MEDIUM' })}
      {...other}
    >
      {children}
    </Link>
  );
}

export function Button({ children, className, size, ...other }) {
  return (
    <button
      className={cN(s.button, className, { [s.medium]: size === 'MEDIUM' })}
      {...other}
    >
      {children}
    </button>
  );
}

export function InlineButton({ children, className, ...other }) {
  return (
    <span
      tabindex="0"
      role="button"
      aria-pressed="false"
      className={cN(s.InlineButton, className)}
      {...other}
    >
      {children}
    </span>
  );
}
