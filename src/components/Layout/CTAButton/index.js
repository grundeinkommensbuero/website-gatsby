import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { LinkButton } from '../../Forms/Button';

export default ({ callToActionText, callToActionLink, className }) => (
  <div className={cN(s.callToActionContainer, className)}>
    <LinkButton
      target="_blank"
      className={s.callToActionLink}
      href={callToActionLink}
    >
      {callToActionText}
    </LinkButton>
  </div>
);
