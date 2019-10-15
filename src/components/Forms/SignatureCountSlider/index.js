import React from 'react';
import s from './style.module.less';

export const SignatureCountSlider = ({ input, label, min, max }) => (
  <div>
    <label htmlFor={`slider_${input.name}`}>{label}</label>
    <br />
    <input
      className={s.input}
      id={`slider_${input.name}`}
      min={min}
      max={max}
      {...input}
    />
    <br />
    {input.value}
  </div>
);
