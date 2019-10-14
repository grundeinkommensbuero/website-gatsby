import React from 'react';
import s from 'style.module.less';

export default Checkbox = ({ input, label, meta }) => (
  <label style={{ display: 'block' }}>
    <input {...input} />
    <span>{label}</span>
    {meta.error && meta.touched && <div>{meta.error}</div>}
  </label>
);
