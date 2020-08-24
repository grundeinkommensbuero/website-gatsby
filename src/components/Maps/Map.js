import React from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';

const LoadableMap = React.lazy(() => import('./LazyMap'));

export default ({ mapConfig }) => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {isSSR ? (
        <Fallback />
      ) : (
        <React.Suspense fallback={<Fallback />}>
          <LoadableMap mapConfig={mapConfig} />
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
