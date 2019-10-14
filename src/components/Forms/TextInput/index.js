import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import LabelInputErrorWrapper from '../LabelInputErrorWrapper';

export function TextInput({ children, className, ...other }) {
  return <input className={cN(s.textInput, className)} {...other} />;
}

export const TextInputWrapped = ({ input, label, meta }) => (
  <LabelInputErrorWrapper label={label} meta={meta}>
    <TextInput {...input} />
  </LabelInputErrorWrapper>
);

export function TextInputInline({ children, className, ...other }) {
  return <input className={cN(s.textInputInline, className)} {...other} />;
}
