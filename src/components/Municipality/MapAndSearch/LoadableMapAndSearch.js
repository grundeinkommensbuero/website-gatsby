import React from 'react';
import loadable from '@loadable/component';

const LoadableMapAndSearch = props => {
  const Component = loadable(() => import('./index'));

  return <Component {...props} />;
};

export default LoadableMapAndSearch;
