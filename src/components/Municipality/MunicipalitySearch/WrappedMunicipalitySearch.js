import loadable from '@loadable/component';
import React from 'react';
import * as s from './style.module.less';

const MunicipalitySearch = loadable(() => import('./index'));

export const WrappedMunicipalitySearch = ({ searchTitle }) => {
  return (
    <div className={s.searchWrapper}>
      <p className={s.searchInfoText}>
        Suche nach einem beliebigen Ort in Deutschland und sieh dir an, wie die
        Kampagne dort voran geht!
      </p>
      <MunicipalitySearch fallback={<div>Lädt...</div>} />
    </div>
  );
};
