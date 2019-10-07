import React from 'react';
import s from './style.module.less';

export default ({ children }) => (
  <div className={s.body}>
    <div className={s.bodyInner}>{children}</div>
  </div>
);
