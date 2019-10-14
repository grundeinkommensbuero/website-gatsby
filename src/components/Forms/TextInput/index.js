import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export function TextInput({ children, className, ...other }) {
  return <input className={cN(s.textInput, className)} {...other} />;
}
