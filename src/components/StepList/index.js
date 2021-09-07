import React from 'react';
import cN from 'classnames';
import * as s from './style.module.less';
import mailIcon from './mail.svg';
import stackIcon from './stack.svg';
import printIcon from './print.svg';
import sendIcon from './send.svg';
import downloadIcon from './download.svg';

const ICONS = {
  mail: mailIcon,
  stack: stackIcon,
  print: printIcon,
  send: sendIcon,
  download: downloadIcon,
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
