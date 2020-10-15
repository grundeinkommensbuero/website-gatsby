import React, { useEffect, useRef } from 'react';
import s from './style.module.less';
import { scrollIntoView } from '../../utils';
import cN from 'classnames';
import { HurrayCrowd } from '../../HurrayCrowd';

export const FinallyMessage = ({
  state,
  children,
  className,
  preventScrolling,
}) => {
  useEffect(() => {
    if (!preventScrolling) {
      scrollIntoView(messageRef.current);
    }
  }, []);
  const messageRef = useRef(null);

  return (
    <div className={cN(s.container, className)}>
      {state === 'success' && <HurrayCrowd />}
      <div className={s.message} ref={messageRef}>
        <div className={cN(s.messageInner)}>
          {state === 'progress' && <div className={s.savingIndicator} />}
          <div className={s.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};
