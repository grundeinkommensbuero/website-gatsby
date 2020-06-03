import React from 'react';
import Flowers from './flowers.svg';
import Hat from './hat.svg';
import Crowd1 from './crowd1.svg';
import Crowd2 from './crowd2.svg';
import Crowd1Red from './crowd1_red.svg';
import Crowd2Red from './crowd2_red.svg';
import s from './style.module.less';

export const HurrayCrowd = ({ color }) => (
  <div className={s.savedStage}>
    <img src={Flowers} className={s.savedStageFlowers} alt="" />
    <img src={Hat} className={s.savedStageHat} alt="" />
    {color === 'RED' ? (
      <>
        <img src={Crowd1Red} className={s.savedStageCrowd1} alt="" />
        <img src={Crowd2Red} className={s.savedStageCrowd2} alt="" />
      </>
    ) : (
      <>
        <img src={Crowd1} className={s.savedStageCrowd1} alt="" />
        <img src={Crowd2} className={s.savedStageCrowd2} alt="" />
      </>
    )}
  </div>
);
