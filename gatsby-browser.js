import wrapWithProvider from './wrap-with-provider';
import { TrackJS } from 'trackjs';
export const wrapRootElement = wrapWithProvider;

window.commitHash = COMMITHASH; // eslint-disable-line no-undef
window.version = VERSION; // eslint-disable-line no-undef

// eslint-disable-next-line no-restricted-globals
if (location.host.indexOf('localhost') !== 0) {
  TrackJS.install({
    token: 'bdfde1e3d32848da99ec8f12f4136b59',
    application: 'expedition-grundeinkommen',
  });
}
