import React, { useContext } from 'react';
import { Legend, MunicipalityMap } from '../MunicipalityMap';
import { MunicipalitySearch } from '../MunicipalitySearch';
import { MunicipalityContext } from '../../../context/Municipality';
import { useUserMunicipalityContentfulState } from '../../../hooks/Municipality/UserMunicipalityContentfulState';

import s from './style.module.less';

export const MunicipalityMapAndSearch = () => {
  const { municipality } = useContext(MunicipalityContext);
  const { userContentfulState } = useUserMunicipalityContentfulState();
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
