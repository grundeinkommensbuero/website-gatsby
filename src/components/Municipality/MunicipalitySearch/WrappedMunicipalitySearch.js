import React from 'react';
import { MunicipalitySearch } from './index';
import * as s from './style.module.less';

export const WrappedMunicipalitySearch = ({ searchTitle }) => {
  return (
    <div className={s.searchWrapper}>
      <p className={s.searchInfoText}>
        Finde deinen Ort und schaue, wie viele Menschen schon dabei sind:
      </p>
      <MunicipalitySearch />
    </div>
  );
};
