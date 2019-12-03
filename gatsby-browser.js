import wrapWithProvider from './wrap-with-provider';
export const wrapRootElement = wrapWithProvider;

console.log('in da browser');

if (window._paq) {
  console.log('there is some paq');
  _paq.push(['alwaysUseSendBeacon']);
}

window.commitHash = COMMITHASH;
window.version = VERSION;
