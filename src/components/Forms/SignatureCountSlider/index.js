import React from 'react';
import s from './style.module.less';
import { TextInputInline } from '../TextInput';

export const SignatureCountSlider = ({ input, label, min, max }) => (
  <>
    {/* <label htmlFor={`slider_${input.name}`}>{label}</label> */}
    <div className={s.inputContainer}>
      <div className={s.sliderContainer}>
        <input
          className={s.input}
          id={`slider_${input.name}`}
          min={min}
          max={max}
          aria-label={label}
          {...input}
        />
      </div>
      <TextInputInline
        type="number"
        min={min}
        max={max}
        name={input.name}
        value={input.value}
        onBlur={input.onBlur}
        onChange={input.onChange}
        className={s.textInput}
        aria-label={label}
      />
    </div>
  </>
);
