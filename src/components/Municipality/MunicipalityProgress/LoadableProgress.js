import React from 'react';
import loadable from '@loadable/component';

const LoadableProgress = props => {
  const Component = loadable(() => import('./index'));

  return <Component {...props} />;
};

export default LoadableProgress;
