import React from 'react';
import { MunicipalityMap } from '../MunicipalityMap';
import { WrappedMunicipalitySearch } from '../MunicipalitySearch/WrappedMunicipalitySearch';
import { Leaderboard } from '../Leaderboard';

import s from './style.module.less';

export const MunicipalityMapAndSearch = () => {
  return (
    <>
      <div className={s.mapSectionContainer}>
        <div className={s.map}>
          <div className={s.hideOnDesktop}>
            <WrappedMunicipalitySearch />
          </div>
          <MunicipalityMap />
        </div>
        <div className={s.mapControlContainer}>
          <div className={s.hideOnMobile}>
            <WrappedMunicipalitySearch />
          </div>
          <div className={s.leaderboard}>
            <br className={s.hideOnDesktop} />
            <Leaderboard />
          </div>
        </div>
      </div>
    </>
  );
};
