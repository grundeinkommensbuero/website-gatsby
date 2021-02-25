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
      <div className={s.searchWrapper}>
        <MunicipalitySearch />
      </div>
      <div className={s.legend}>
        <Legend />
      </div>
    </div>
  );
};
