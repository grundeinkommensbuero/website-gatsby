import React from 'react';
import CONFIG from './backend-config';
import { AuthProvider } from './src/context/Authentication';
import { MunicipalityProvider } from './src/context/Municipality';
import SurveySaver from './src/components/SurveySaver';
import { OverlayProvider } from './src/context/Overlay';
import { OnboardingModalProvider } from './src/context/OnboardingModal/';
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

  const app = (
    <AuthProvider>
      <MunicipalityProvider>
        <SurveySaver>
          <OverlayProvider>
            <OnboardingModalProvider>
              <StickyBannerProvider>
                <SnackbarProvider>
                  <SnackbarMessageProvider>{element}</SnackbarMessageProvider>
                </SnackbarProvider>
              </StickyBannerProvider>
            </OnboardingModalProvider>
          </OverlayProvider>
        </SurveySaver>
      </MunicipalityProvider>
    </AuthProvider>
  );

  return extractor ? extractor.collectChunks(app) : app;
};
