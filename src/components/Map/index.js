import React from 'react';
import Loadable from '@loadable/component';

// const LoadableMap = Loadable(() => import('./Map'));
const LoadableMap = React.lazy(() => import('./Map'));

export default () => {
  const isSSR = typeof window === 'undefined';
  console.log('hu', isSSR);
  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <LoadableMap />
        </React.Suspense>
      )}
    </>
  );
};
