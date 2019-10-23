import React from 'react';
import Flowers from './flowers.svg';
import Hat from './hat.svg';
import Crowd1 from './crowd1.svg';
import Crowd2 from './crowd2.svg';
import s from './style.module.less';

export const HurrayCrowd = ({}) => (
  <div className={s.savedStage}>
    <img src={Flowers} className={s.savedStageFlowers} />
    <img src={Hat} className={s.savedStageHat} />
    <img src={Crowd1} className={s.savedStageCrowd1} />
    <img src={Crowd2} className={s.savedStageCrowd2} />
  </div>
);
