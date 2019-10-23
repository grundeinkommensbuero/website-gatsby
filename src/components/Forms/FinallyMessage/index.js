import React, { useEffect, useRef } from 'react';
import s from './style.module.less';
import { scrollIntoView } from '../../utils';
import cN from 'classnames';
import Flowers from './flowers.svg';
import Hat from './hat.svg';
import Crowd1 from './crowd1.svg';
import Crowd2 from './crowd2.svg';

export const FinallyMessage = ({ state, children, className }) => {
  useEffect(() => {
    scrollIntoView(messageRef.current);
  });
  const messageRef = useRef(null);

  return (
    <div className={cN(s.container, className)}>
      {state === 'success' && (
        <div className={s.savedStage}>
          <img src={Flowers} className={s.savedStageFlowers} />
          <img src={Hat} className={s.savedStageHat} />
          <img src={Crowd1} className={s.savedStageCrowd1} />
          <img src={Crowd2} className={s.savedStageCrowd2} />
        </div>
      )}
      <div className={s.message} ref={messageRef}>
        <div
          className={cN(s.messageInner, {
            [s.blinkShort]: state === 'success' || state === 'error',
          })}
        >
          {state === 'progress' && <div className={s.savingIndicator} />}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
