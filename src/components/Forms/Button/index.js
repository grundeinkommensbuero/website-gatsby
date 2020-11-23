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

export function InlineButton({ children, onClick, className, ...other }) {
  return (
    <span
      tabIndex="0"
      role="button"
      aria-pressed="false"
      className={cN(s.inlineButton, className)}
      onKeyDown={e => {
        e.preventDefault();
        // Emulate click when enter or space are pressed
        if (e.key === 'Enter' || e.keyCode === 32) onClick();
      }}
      onClick={onClick}
      {...other}
    >
      {children}
    </span>
  );
}
