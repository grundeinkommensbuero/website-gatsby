import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { LinkButton, Button } from '../../Forms/Button';
import POINT_LEFT from './figure_point_left.svg';
import POINT_LEFT_MOBILE from './figure_point_left_mobile.svg';

export default ({
  children,
  href,
  className,
  illustration,
  onClick,
  ...other
}) => {
  return (
    <div
      className={cN(s.container, className, {
        [s.hasIllustration]: illustration,
      })}
    >
      <div className={s.inner}>
        {href && (
          <LinkButton
            target={href.startsWith('#') ? '' : '_blank'}
            className={s.button}
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
        )}
        {!href && (
          <Button className={s.button} onClick={onClick} {...other}>
            {children}
          </Button>
        )}
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
};

function dispatchEvent(id) {
  window.dispatchEvent(new Event(id));
}
