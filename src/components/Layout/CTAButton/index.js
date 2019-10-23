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
}) => (
  <div
    className={cN(s.container, className, {
      [s.hasIllustration]: illustration,
    })}
  >
    <div className={s.inner}>
      {href && (
        <LinkButton target="_blank" className={s.button} href={href} {...other}>
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
          <img src={POINT_LEFT} className={s.illustrationPointLeft} />
          <img
            src={POINT_LEFT_MOBILE}
            className={s.illustrationPointLeftMobile}
          />
        </>
      )}
    </div>
  </div>
);
