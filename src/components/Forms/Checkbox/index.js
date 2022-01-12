import React from 'react';
import * as s from './style.module.less';
import { ValidationError } from '../ValidationError';
import cN from 'classnames';

export const Checkbox = ({
  input,
  label,
  meta,
  hide,
  theme,
  type,
  checked,
  onChange,
  className,
}) => {
  if (hide) {
    return null;
  }

  return (
    <label className={cN(s.container, className)}>
      <input
        className={s.checkbox}
        type={type}
        checked={checked}
        onChange={onChange}
        {...input}
      />
      <div className={s.label}>
        {label}
        {meta?.error && meta?.touched && (
          <>
            <br />
            <ValidationError theme={theme}>{meta.error}</ValidationError>
          </>
        )}
      </div>
    </label>
  );
};
