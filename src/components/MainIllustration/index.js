import loadable from '@loadable/component';

const LoadableMainIllustration = loadable(() => import('./MainIllustration'), {
  ssr: false,
});
export default LoadableMainIllustration;
