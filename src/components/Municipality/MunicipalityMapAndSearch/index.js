import React from 'react';
import { FallbackMap } from '../MunicipalityMap';
import { WrappedMunicipalitySearch } from '../MunicipalitySearch/WrappedMunicipalitySearch';
import { Leaderboard } from '../Leaderboard';
import * as s from './style.module.less';

const MunicipalityMap = React.lazy(() => import('../MunicipalityMap'));

export const MunicipalityMapAndSearch = () => {
  const isSSR = typeof window === 'undefined';

  return (
    <>
      <div className={s.mapSectionContainer}>
        <div className={s.map}>
          <div className={s.hideOnDesktop}>
            <WrappedMunicipalitySearch />
          </div>
          {isSSR ? (
            <FallbackMap />
          ) : (
            <React.Suspense fallback={<FallbackMap />}>
              <MunicipalityMap />
            </React.Suspense>
          )}
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
