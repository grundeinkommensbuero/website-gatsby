import React from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';

const LoadableMap = React.lazy(() => import('./LazyMap'));

const Map = ({ config }) => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {isSSR ? (
        <Fallback />
      ) : (
        <React.Suspense fallback={<Fallback />}>
          <LoadableMap mapConfig={config} />
        </React.Suspense>
      )}
    </>
  );
};

const Fallback = () => (
  <SectionInner wide={true}>
    <div className={s.container}>Lade...</div>
  </SectionInner>
);

const Maps = ({ config }) => {
  return (
    <>
      {config.map(map => {
        return <Map config={map} />;
      })}
    </>
  );
};

export default Map;
export { Maps };
