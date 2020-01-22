import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import LabelInputErrorWrapper from '../LabelInputErrorWrapper';
import { ValidationError } from '../ValidationError';

export function TextInput({ children, className, ...input }) {
  return (
    <input
      className={cN(s.textInput, className, {
        [s.hideNumberArrows]: input.name === 'zipCode',
      })}
      {...input}
    />
  );
}

export function Textarea({ children, className, ...input }) {
  return <textarea className={cN(s.textarea, className)} {...input} />;
}

export const TextInputWrapped = ({
  input,
  label,
  meta,
  placeholder,
  description,
  hide,
  className,
  inputClassName,
}) => {
  if (hide) {
    return null;
  }
  return (
    <LabelInputErrorWrapper
      label={description ? `${label} (${description})` : label}
      meta={meta}
      className={className}
    >
      {input.type === 'textarea' ? (
        <Textarea
          {...input}
          placeholder={placeholder}
          className={inputClassName}
        />
      ) : (
        <TextInput
          {...input}
          placeholder={placeholder}
          className={inputClassName}
        />
      )}
    </LabelInputErrorWrapper>
  );
};

export function TextInputInline({ children, className, ...other }) {
  return <input className={cN(s.textInputInline, className)} {...other} />;
}

export const TextInputOneLine = ({ input, label, meta, placeholder }) => (
  <label style={{ display: 'block' }}>
    <span>{label}</span>
    <TextInputInline {...input} placeholder={placeholder} />
    {meta.error && meta.touched && (
      <ValidationError>{meta.error}</ValidationError>
    )}
  </label>
);
