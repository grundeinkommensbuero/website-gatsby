import React from 'react';
import * as s from './style.module.less';

const MunicipalitySearch = React.lazy(() => import('./index'));

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
        <React.Suspense fallback={<div>Lädt...</div>}>
          <MunicipalitySearch />
        </React.Suspense>
      )}
    </div>
  );
};
