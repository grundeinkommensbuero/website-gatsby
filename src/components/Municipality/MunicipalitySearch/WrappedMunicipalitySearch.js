import loadable from '@loadable/component';
import React from 'react';
import * as s from './style.module.less';

const MunicipalitySearch = loadable(() => import('./index'));

export const WrappedMunicipalitySearch = ({ searchTitle }) => {
  return (
    <div className={s.searchWrapper}>
      <p className={s.searchInfoText}>
        Finde deinen Ort und schaue, wie viele Menschen schon dabei sind:
      </p>
      <MunicipalitySearch fallback={<div>Lädt...</div>} />
    </div>
  );
};
