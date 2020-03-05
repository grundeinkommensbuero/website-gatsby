import React from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';

const LoadableMap = React.lazy(() => import('./LazyMap'));

export default ({ state }) => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {isSSR ? (
        <Fallback />
      ) : (
        <React.Suspense fallback={<Fallback />}>
          <LoadableMap state={state} />
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
