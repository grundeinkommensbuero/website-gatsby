import React from 'react';
import s from './style.module.less';
import { Manager, Reference, Popper } from 'react-popper';
import cN from 'classnames';

export const Tooltip = ({ children, style, className, content }) => {
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={ref} style={style} className={cN(className, s.content)}>
            {children}
          </div>
        )}
      </Reference>
      <Popper placement="top" modifiers={{ offset: { offset: '0, 10' } }}>
        {({ ref, style, placement, arrowProps }) => (
          <div
            ref={ref}
            style={style}
            data-placement={placement}
            className={s.popup}
          >
            {content}
            <div
              ref={arrowProps.ref}
              style={arrowProps.style}
              className={s.arrow}
            />
          </div>
        )}
      </Popper>
    </Manager>
  );
};
