import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { LinkButton, Button, LinkButtonLocal } from '../../Forms/Button';
import POINT_LEFT from './figure_point_left.svg';
import POINT_LEFT_MOBILE from './figure_point_left_mobile.svg';

export function CTAButtonContainer({ children, className, illustration }) {
  return (
    <div
      className={cN(s.container, className, {
        [s.hasIllustration]: illustration,
      })}
    >
      <div className={s.inner}>
        {children}
        {illustration === 'POINT_LEFT' && (
          <>
            <img
              src={POINT_LEFT}
              className={s.illustrationPointLeft}
              aria-hidden="true"
            />
            <img
              src={POINT_LEFT_MOBILE}
              className={s.illustrationPointLeftMobile}
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </div>
  );
}

export function CTAButton({ children, className, ...other }) {
  return (
    <Button className={cN(s.button, className)} {...other}>
      {children}
    </Button>
  );
}

export function CTALink({ children, className, ...other }) {
  return (
    <LinkButtonLocal className={cN(s.button, className)} {...other}>
      {children}
    </LinkButtonLocal>
  );
}

export function CTALinkExternal({
  children,
  href,
  className,
  onClick,
  ...other
}) {
  return (
    <LinkButton
      target={href.startsWith('#') ? '' : '_blank'}
      className={cN(className, s.button)}
      href={href}
      onClick={() => {
        if (href.startsWith('#')) {
          dispatchEvent(href);
        }
      }}
      {...other}
    >
      {children}
    </LinkButton>
  );
}

function dispatchEvent(id) {
  window.dispatchEvent(new Event(id));
}
