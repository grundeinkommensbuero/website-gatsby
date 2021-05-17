import React from 'react';
import * as s from './style.module.less';
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
      className={cN(
        s.button,
        className,
        { [s.medium]: size === 'MEDIUM' },
        { [s.small]: size === 'SMALL' }
      )}
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
      className={cN(s.inlineButton, className)}
      onKeyDown={e => {
        // Emulate click when enter or space are pressed
        if (e.key === 'Enter' || e.key === ' ') onClick(e);
      }}
      onClick={onClick}
      {...other}
    >
      {children}
    </span>
  );
}

export function InlineLinkButton({ children, className, ...other }) {
  return (
    <a
      tabIndex="0"
      role="button"
      className={cN(s.inlineButton, className)}
      {...other}
    >
      {children}
    </a>
  );
}

export function PrimarySecondaryButtonContainer({
  children,
  className,
  size,
  ...other
}) {
  return (
    <div className={cN(s.primarySecondaryButtonContainer, className)}>
      {children}
    </div>
  );
}
