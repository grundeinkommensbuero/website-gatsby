import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

// Those are available button size options
export const SIZE_MEDIUM = Symbol('MEDIUM');
export const SIZE_SMALL = Symbol('SMALL');

// Maps available size options to corresponding CSS classes
const mapSize = (size) => {
  if (size === SIZE_SMALL) return s.small;
  if (size === SIZE_MEDIUM) return s.medium;
};

export function LinkButton({ children, className, size, ...other }) {
  return (
    <a
      className={cN(s.linkButton, className, mapSize(size))}
      {...other}
    >
      {children}
    </a>
  );
}

export function LinkButtonLocal({ children, className, size, ...other }) {
  return (
    <Link
      className={cN(s.linkButton, className, mapSize(size))}
      {...other}
    >
      {children}
    </Link>
  );
}

export function Button({ children, className, size, ...other }) {
  return (
    <button
      className={cN(s.button, className, mapSize(size))}
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
