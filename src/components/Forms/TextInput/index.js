import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';
import LabelInputErrorWrapper from '../LabelInputErrorWrapper';
import { ValidationError } from '../ValidationError';

export function TextInput({
  children,
  className,
  label,
  size,
  customRef,
  disabled,
  ...input
}) {
  return (
    <input
      onFocus={e => {
        if (e.target.autocomplete) {
          e.target.autocomplete = 'none';
        }
      }}
      aria-label={label}
      type={'search'}
      className={cN(
        s.textInput,
        { [s.textInputSmall]: size === 'SMALL' },
        { [s.disabled]: disabled },
        className,
        {
          [s.hideNumberArrows]:
            input.name === 'zipCode' || input.name === 'listId',
        }
      )}
      ref={customRef}
      {...input}
      disabled={disabled}
    />
  );
}

export function Textarea({
  children,
  className,
  label,
  customRef,
  disabled,
  ...input
}) {
  let charLeft;
  if (input.maxLength && input.value) {
    charLeft = input.maxLength - input.value.length;
  }
  const charCount = input.value ? input.value.length : 0;
  return (
    <div>
      <textarea
        aria-label={label}
        className={cN(s.textarea, className, { [s.disabled]: disabled })}
        {...input}
        ref={customRef}
        disabled={disabled}
      />
      {input.maxLength && charLeft < 100 && (
        <div className={s.charLeftDisplay}>
          {charCount} / {input.maxLength}
        </div>
      )}
    </div>
  );
}

export const TextInputWrapped = ({
  input,
  label,
  meta,
  placeholder,
  description,
  hide,
  theme,
  className,
  inputClassName,
  maxLength,
  min,
  max,
  hideLabel,
  explanation,
  inputMode,
  pattern,
  autoComplete,
  customRef,
  errorClassName,
  disabled,
}) => {
  if (hide) {
    return null;
  }
  const outputLabel = description ? `${label} (${description})` : label;
  return (
    <LabelInputErrorWrapper
      label={!hideLabel && outputLabel}
      meta={meta}
      className={className}
      errorClassName={errorClassName}
      explanation={explanation}
      theme={theme}
    >
      {input.type === 'textarea' ? (
        <Textarea
          {...input}
          placeholder={placeholder}
          className={inputClassName}
          maxLength={maxLength}
          label={outputLabel}
          autoComplete={autoComplete}
          customRef={customRef}
          disabled={disabled}
        />
      ) : (
        <TextInput
          {...input}
          placeholder={placeholder}
          className={inputClassName}
          maxLength={maxLength}
          min={min}
          max={max}
          label={outputLabel}
          pattern={pattern}
          inputMode={inputMode}
          autoComplete={autoComplete}
          customRef={customRef}
          disabled={disabled}
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
