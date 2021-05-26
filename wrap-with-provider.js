import React from 'react';
import CONFIG from './aws-config';
import { AuthProvider } from './src/context/Authentication';
import { MunicipalityProvider } from './src/context/Municipality';
import SurveySaver from './src/components/SurveySaver';
import { OverlayProvider } from './src/context/Overlay';
import { OnboardingOverlayProvider } from './src/context/Overlay/OnboardingOverlay';
import { StickyBannerProvider } from './src/context/StickyBanner';
import { SnackbarMessageProvider } from './src/context/Snackbar/index.js';
import SnackbarProvider from 'react-simple-snackbar';

// This is used to wrap the page, so we can configure AWS Cognito in this wrapper,
// so it only gets configured once, not every time a page changes
export default (element, extractor) => {
  // APP_CLIENT_ID was in onCreateWebpackConfig callback in gatsby-node
  const clientId = APP_CLIENT_ID; // eslint-disable-line no-undef
  if (clientId) {
    if (typeof window !== `undefined`) {
      import(/* webpackChunkName: "Amplify" */ '@aws-amplify/auth').then(
        ({ default: Amplify }) => {
          Amplify.configure({
            region: CONFIG.COGNITO.REGION,
            userPoolId: CONFIG.COGNITO.USER_POOL_ID,
            userPoolWebClientId: clientId,
          });
        }
      );
    }
  } else {
    console.log('no userPoolWebClientId provided');
  }

  return (
    <AuthProvider>
      <MunicipalityProvider>
        <SurveySaver>
          <OverlayProvider>
            <OnboardingOverlayProvider>
              <StickyBannerProvider>
                <SnackbarProvider>
                  <SnackbarMessageProvider>
                    {extractor.collectChunks(element)}
                  </SnackbarMessageProvider>
                </SnackbarProvider>
              </StickyBannerProvider>
            </OnboardingOverlayProvider>
          </OverlayProvider>
        </SurveySaver>
      </MunicipalityProvider>
    </AuthProvider>
  );
};
