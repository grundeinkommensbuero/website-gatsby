import React from 'react';
import { Legend, MunicipalityMap } from '../MunicipalityMap';
import { MunicipalitySearch } from '../MunicipalitySearch';

import s from './style.module.less';

export const MunicipalityMapAndSearch = () => {
  return (
    <div className={s.mapSectionContainer}>
      <div className={s.map}>
        <MunicipalityMap />
      </div>
      <div className={s.mapControlContainer}>
        <div className={s.searchWrapper}>
          <p className={s.searchInfoText}>
            Finde deinen Ort und schaue, wie viele Menschen schon dabei sind:
        </p>
          <MunicipalitySearch />
        </div>
        <div className={s.topDesktopLegend}>
          <Legend />
        </div>
      </div>
      <div className={s.bottomMobileLegend}>
        <Legend />
      </div>
    </div>
  );
};
