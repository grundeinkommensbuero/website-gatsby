import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export default ({ children, className, id }) => (
  <div className={cN(s.form, className)}>
    <div className={s.jumpToAnchor} id={id} />
    {children}
  </div>
);
