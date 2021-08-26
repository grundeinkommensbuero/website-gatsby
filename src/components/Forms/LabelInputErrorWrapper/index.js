import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';
import { ValidationError } from '../ValidationError';
import { Tooltip } from '../../Tooltip';

export default function LabelInputErrorWrapper({
  children,
  className,
  label,
  meta,
  theme,
  explanation,
  errorClassName,
}) {
  return (
    <label className={cN(s.container, className)}>
      <div>
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
      <div>{children}</div>
      {meta.error && meta.touched && (
        <ValidationError className={cN(s.error, errorClassName)} theme={theme}>
          {meta.error}
        </ValidationError>
      )}
    </label>
  );
}
