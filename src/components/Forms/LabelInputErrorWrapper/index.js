import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export default function LabelInputErrorWrapper({
  children,
  className,
  label,
  meta,
}) {
  return (
    <label className={cN(s.container, className)}>
      <div className={s.label}>{label}</div>
      <div className={s.inputContainer}>{children}</div>
      {meta.error && meta.touched && (
        <div className={s.error}>{meta.error}</div>
      )}
    </label>
  );
}
