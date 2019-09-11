import React from 'react';
import s from './style.module.less';
import Figure1 from './figure-1.svg';
import Figure2 from './figure-2.svg';
import cN from 'classnames';

export default function() {
  return (
    <div className={s.container} aria-hidden="true">
      <div className={s.stage}>
        <img className={cN(s.figure, s.figure1)} src={Figure1} />
        <img className={cN(s.figure, s.figure2)} src={Figure2} />
      </div>
    </div>
  );
}
