import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export default function FormSection({ children, className, heading }) {
  return (
    <div className={cN(className, s.container)}>
      {heading && <h4 className={s.heading}>{heading}</h4>}
      <div className={s.fieldContainer}>{children}</div>
    </div>
  );
}
