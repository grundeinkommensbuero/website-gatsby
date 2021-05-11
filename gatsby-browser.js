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

// Workaroud for hashes not working (https://github.com/gatsbyjs/gatsby/issues/386#issuecomment-249463446)
export const onRouteUpdate = ({ location }) => {
  jumpToHash(location.hash);
};

// We check every x ms if the element of the hash exists and then scroll to it.
// This is useful for slow internet.
const jumpToHash = hash => {
  if (hash) {
    waitForElementToDisplay(
      hash,
      element => {
        element.scrollIntoView();
      },
      800,
      15000
    );
  }
};

// Function to wait for the display of an element
const waitForElementToDisplay = (
  selector,
  callback,
  checkFrequencyInMs,
  timeoutInMs
) => {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    const element = document.querySelector(selector);
    console.log('element', element);
    if (element !== null) {
      callback(element);
      return;
    } else {
      setTimeout(function() {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
};
