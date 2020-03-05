import React from 'react';

const LoadableMap = React.lazy(() => import('./LazyMap'));

export default ({ state }) => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <LoadableMap state={state} />
        </React.Suspense>
      )}
    </>
  );
};
