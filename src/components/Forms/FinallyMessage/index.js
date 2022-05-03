import React, { useEffect, useRef } from 'react';
import * as s from './style.module.less';
import * as cS from '../../style/colorSchemes.module.less';
import { scrollIntoView } from '../../utils';
import cN from 'classnames';
// import { HurrayCrowd } from '../../HurrayCrowd';
const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

export const FinallyMessage = ({
  state,
  children,
  className,
  preventScrolling,
  color = IS_BERLIN_PROJECT ? 'rose' : 'violet',
}) => {
  useEffect(() => {
    if (!preventScrolling) {
      scrollIntoView(messageRef.current);
    }
  }, []);
  const messageRef = useRef(null);

  return (
    <div className={className}>
      {/* {state === 'success' && <HurrayCrowd />} */}
      <div
        className={cN(s.message, {
          [cS.colorSchemeViolet]: color === 'violet',
          [cS.colorSchemeWhite]: color === 'white',
          [cS.colorSchemeAqua]: color === 'aqua',
          [cS.colorSchemeRose]: color === 'rose',
          [cS.colorSchemeRoseOnWhite]: color === 'roseOnWhite',
        })}
        ref={messageRef}
      >
        <div className={cN(s.messageInner)}>
          {state === 'progress' && <div className={s.savingIndicator} />}
          <div className={s.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};
