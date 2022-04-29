import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

export default function FormSection({
  children,
  className,
  heading,
  fieldContainerClassName,
  smallMargin,
}) {
  return (
    <div
      className={cN(className, s.container, { [s.smallMargin]: smallMargin })}
    >
      {heading && <h4 className={s.heading}>{heading}</h4>}
      <div className={cN(s.fieldContainer, fieldContainerClassName)}>
        {children}
      </div>
    </div>
  );
}
