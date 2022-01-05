import React from 'react';
import * as s from './style.module.less';
import { ValidationError } from '../ValidationError';

export const Checkbox = ({
  input,
  label,
  meta,
  hide,
  theme,
  type,
  checked,
  onChange,
}) => {
  if (hide) {
    return null;
  }

  return (
    <label className={s.container}>
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
