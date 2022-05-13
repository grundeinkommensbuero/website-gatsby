import React from 'react';
import loadable from '@loadable/component';

const LoadableTickerToSignup = props => {
  const Component = loadable(() => import('./index'));

  return <Component {...props} />;
};

export default LoadableTickerToSignup;
