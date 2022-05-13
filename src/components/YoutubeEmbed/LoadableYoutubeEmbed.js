import React from 'react';
import loadable from '@loadable/component';

const LoadableYoutubeEmbed = props => {
  const Component = loadable(() => import('./index'));

  return <Component {...props} />;
};

export default LoadableYoutubeEmbed;
