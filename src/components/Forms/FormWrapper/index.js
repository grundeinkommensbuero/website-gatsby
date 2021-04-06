import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

export default ({ children, className }) => (
  <div className={cN(s.form, className)}>{children}</div>
);
