import React from 'react';

const LoadableMap = React.lazy(() => import('./LazyMap'));

export default () => {
  const isSSR = typeof window === 'undefined';
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
