import React, { useContext } from 'react';
import { MunicipalityMap } from '../MunicipalityMap';
import { MunicipalitySearch } from '../MunicipalitySearch';
import { MunicipalityContext } from '../../../context/Municipality';
import { useUserMunicipalityContentfulState } from '../../../hooks/Municipality/UserMunicipalityContentfulState';

import s from './style.module.less';

export const MunicipalityMapAndSearch = () => {
  const { municipality } = useContext(MunicipalityContext);
  const { userContentfulState } = useUserMunicipalityContentfulState();

  return (
    <>
      <MunicipalityMap />
      {municipality &&
        userContentfulState === 'loggedInOtherMunicipalitySignup' && (
          <div className={s.searchWrapper}>
            <MunicipalitySearch />
          </div>
        )}
    </>
  );
};
