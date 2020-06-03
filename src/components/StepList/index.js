import React from 'react';
import cN from 'classnames';
import s from './style.module.less';

const ICONS = {
  mail: require('./mail.svg'),
  stack: require('./stack.svg'),
  print: require('./print.svg'),
  send: require('./send.svg'),
  download: require('./download.svg'),
};

export function StepList({ children, className }) {
  return <ul className={cN(s.list, className)}>{children}</ul>;
}

export function StepListItem({ icon, children, className }) {
  const iconSrc = ICONS[icon];

  return (
    <li className={cN(className, s.item)}>
      <div className={s.iconContainer}>
        {iconSrc && (
          <img aria-hidden="true" alt="" className={s.icon} src={iconSrc} />
        )}
      </div>
      <div>{children}</div>
    </li>
  );
}
