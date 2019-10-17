import React, { useEffect, useRef } from 'react';
import s from './style.module.less';
import { scrollIntoView } from '../../utils';

export const FinallyMessage = ({ state, children }) => {
  useEffect(() => {
    scrollIntoView(messageRef.current);
  });
  const messageRef = useRef(null);

  return (
    <div className={s.container}>
      {state === 'saved' && <div />}
      <div ref={messageRef}>{children}</div>
    </div>
  );
};
