import React from 'react';
import s from './style.module.less';

export const Checkbox = ({ input, label, meta }) => (
  <label className={s.container}>
    <input className={s.checkbox} {...input} />
    <div className={s.label}>
      {label}
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </div>
  </label>
);
