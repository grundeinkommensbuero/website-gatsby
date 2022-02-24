import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import successIcon from './success.svg';

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

export function Button({
  children,
  className,
  disabled,
  size,
  customRef,
  loading,
  success,
  ...other
}) {
  return (
    <>
      <button
        className={cN(
          s.button,
          className,
          { [s.medium]: size === 'MEDIUM' },
          // Only use small buttons as exception!
          { [s.small]: size === 'SMALL' },
          { [s.disabled]: disabled },
          { [s.loading]: loading },
          { [s.success]: success }
        )}
        ref={customRef}
        disabled={disabled}
        {...other}
      >
        <div className={s.buttonText}>{children}</div>
        <div className={s.progressBar}></div>

        <div className={s.successIcon}>
          <img alt="Illustration des Erfolgs" src={successIcon} />
        </div>
      </button>
    </>
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

export function DropdownButton({
  children,
  isActive,
  isOpen,
  onClick,
  className,
  ...other
}) {
  return (
    <span
      tabIndex="0"
      role="button"
      className={cN(s.dropdownButton, className, { [s.active]: isActive })}
      onKeyDown={e => {
        // Emulate click when enter or space are pressed
        if (e.key === 'Enter' || e.key === ' ') onClick(e);
      }}
      onClick={onClick}
      {...other}
    >
      {children}
      <div
        className={cN(s.triangle, {
          [s.animateTriangle]: isOpen,
        })}
      ></div>
    </span>
  );
}
