import React from 'react';
import { FallbackMap } from '../MunicipalityMap';
import { WrappedMunicipalitySearch } from '../MunicipalitySearch/WrappedMunicipalitySearch';
import { Leaderboard } from '../Leaderboard';
import * as s from './style.module.less';
import loadable from '@loadable/component';

const MunicipalityMap = loadable(() => import('../MunicipalityMap'));

export const MunicipalityMapAndSearch = () => {
  return (
    <>
      <div className={s.mapSectionContainer}>
        <div className={s.map}>
          <div className={s.hideOnDesktop}>
            <WrappedMunicipalitySearch />
          </div>
          <MunicipalityMap fallback={<FallbackMap />} />
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
