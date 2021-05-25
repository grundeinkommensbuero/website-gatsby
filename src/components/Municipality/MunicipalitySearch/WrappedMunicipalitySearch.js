import loadable from '@loadable/component';
import React from 'react';
import * as s from './style.module.less';

const MunicipalitySearch = loadable(() => import('./index'));

export const WrappedMunicipalitySearch = ({ searchTitle }) => {
  const isSSR = typeof window === 'undefined';

  return (
    <div className={s.searchWrapper}>
      <p className={s.searchInfoText}>
        Finde deinen Ort und schaue, wie viele Menschen schon dabei sind:
      </p>
      {isSSR ? (
        <div>Lädt...</div>
      ) : (
        <MunicipalitySearch fallback={<div>Lädt...</div>} />
      )}
    </div>
  );
};
