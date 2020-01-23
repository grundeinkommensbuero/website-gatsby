import wrapWithProvider from './wrap-with-provider';
import { TrackJS } from 'trackjs';
export const wrapRootElement = wrapWithProvider;

window.commitHash = COMMITHASH;
window.version = VERSION;

if (location.host.indexOf('localhost') !== 0) {
  TrackJS.install({
    token: 'bdfde1e3d32848da99ec8f12f4136b59',
    application: 'expedition-grundeinkommen',
  });
}
