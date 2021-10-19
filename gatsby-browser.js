import wrapWithProvider from './wrap-with-provider';
import { TrackJS } from 'trackjs';
import { loadableReady } from '@loadable/component';
import { hydrate, render } from 'react-dom';

export const wrapRootElement = ({ element }) => wrapWithProvider(element, null);

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
    // console.log('element', element);
    if (element !== null) {
      callback(element);
      return;
    } else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
};

// Needed for loadable to work with ssr
// https://loadable-components.com/docs/server-side-rendering/
// See also: https://github.com/graysonhicks/gatsby-plugin-loadable-components-ssr
// I did not use the plugin though due to path issues
export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      // Using ReactDOM.hydrate on develop will throw an error in console
      // Comment from Vali: I didn't actually check, but I just copied it from gatsby-plugin-loadable-components-ssr
      const renderFn = process.env.GATSBY_BUILD_STAGE.includes('develop')
        ? render
        : hydrate;

      renderFn(wrapWithProvider(element, null), container, callback);
    });
  };
};
