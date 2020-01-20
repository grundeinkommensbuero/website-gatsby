import wrapWithProvider from './wrap-with-provider';
import { TrackJS } from 'trackjs';
export const wrapRootElement = wrapWithProvider;

window.commitHash = COMMITHASH;
window.version = VERSION;

TrackJS.install({ token: 'bdfde1e3d32848da99ec8f12f4136b59' });
TrackJS.track('Testing TrackJS!');
