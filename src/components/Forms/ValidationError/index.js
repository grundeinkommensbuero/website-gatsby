import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export const ValidationError = ({ children, className }) => (
  <div className={cN(s.error, className)}>{children}</div>
);
