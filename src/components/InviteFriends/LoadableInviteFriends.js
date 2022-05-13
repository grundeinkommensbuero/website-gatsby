import React from 'react';
import loadable from '@loadable/component';

const LoadableInviteFriends = props => {
  const Component = loadable(() => import('./index'));

  return <Component {...props} />;
};

export default LoadableInviteFriends;
