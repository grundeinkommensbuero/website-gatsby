import React from 'react';
import * as s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import loadable from '@loadable/component';

// Only load the component on the client (somehow had issues not finding chunk)
const LoadableMap = loadable(() => import('./LazyMap'), { ssr: false });

export default ({ mapConfig, locations, withSearch, onLocationChosen }) => {
  return (
    <LoadableMap
      mapConfig={mapConfig}
      locations={locations}
      withSearch={withSearch}
      onLocationChosen={onLocationChosen}
      fallback={<Fallback />}
    />
  );
};

const Fallback = () => (
  <SectionInner wide={true}>
    <div className={s.container}>Lade...</div>
  </SectionInner>
);
