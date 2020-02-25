import React from 'react';
import s from './style.module.less';
import { Manager, Reference, Popper } from 'react-popper';
import cN from 'classnames';

export const Tooltip = ({
  children,
  style,
  className,
  content,
  placement = 'top',
  popupClassName,
}) => {
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={ref} style={style} className={cN(className, s.content)}>
            {children}
          </div>
        )}
      </Reference>
      <Popper placement={placement} modifiers={{ offset: { offset: '0, 25' } }}>
        {({ ref, style, placement, arrowProps }) => (
          <div
            ref={ref}
            style={style}
            data-placement={placement}
            className={s.popup}
          >
            <div className={cN(popupClassName, s.tooltipContent)}>
              {content}
            </div>
            <div
              ref={arrowProps.ref}
              style={arrowProps.style}
              data-placement={placement}
              className={s.arrow}
            />
          </div>
        )}
      </Popper>
    </Manager>
  );
};
