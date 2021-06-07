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
        <ValidationError className={s.error} theme={theme}>{meta.error}</ValidationError>
      )}
    </label>
  );
}
