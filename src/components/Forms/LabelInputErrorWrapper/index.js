import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { ValidationError } from '../ValidationError';
import { Tooltip } from '../../Tooltip';

export default function LabelInputErrorWrapper({
  children,
  className,
  label,
  meta,
  explanation,
}) {
  return (
    <label className={cN(s.container, className)}>
      <div className={s.label}>
        {label}
        {explanation && (
          <>
            {' '}
            <Tooltip content={explanation} popupClassName={s.tooltip}>
              (i)
            </Tooltip>
          </>
        )}
      </div>
      <div className={s.inputContainer}>{children}</div>
      {meta.error && meta.touched && (
        <ValidationError className={s.error}>{meta.error}</ValidationError>
      )}
    </label>
  );
}
