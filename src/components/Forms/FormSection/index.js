import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

export default function FormSection({ children, className, heading }) {
  return (
    <div className={cN(className, s.container)}>
      {heading && <h4>{heading}</h4>}
      {children}
    </div>
  );
}
