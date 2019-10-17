import React, { useEffect, useRef } from 'react';
import s from './style.module.less';
import { scrollIntoView } from '../../utils';
import cN from 'classnames';

export const FinallyMessage = ({ state, children }) => {
  useEffect(() => {
    scrollIntoView(messageRef.current);
  });
  const messageRef = useRef(null);
  console.log(state);

  return (
    <div className={s.container}>
      {state === 'saved' && <div />}
      <div className={s.message} ref={messageRef}>
        <div
          className={cN({
            [s.blinkShort]: state === 'saved' || state === 'error',
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
