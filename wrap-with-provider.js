import React from 'react';
import Amplify from '@aws-amplify/auth';
import CONFIG from './aws-config';
import { AuthProvider } from './src/context/Authentication';
import { OverlayProvider } from './src/context/Overlay';
import querystring from 'query-string';
import { saveSurveyAnswer } from './src/hooks/Api/Surveys';

// This is used to wrap the page, so we can configure AWS Cognito in this wrapper,
// so it only gets configured once, not every time a page changes
export default ({ element }) => {
  // APP_CLIENT_ID was in onCreateWebpackConfig callback in gatsby-node
  const clientId = APP_CLIENT_ID;
  if (clientId) {
    Amplify.configure({
      region: CONFIG.COGNITO.REGION,
      userPoolId: CONFIG.COGNITO.USER_POOL_ID,
      userPoolWebClientId: clientId,
    });
  } else {
    console.log('no userPoolWebClientId provided');
  }

  // Check if there are url params from a survey
  const urlParams = querystring.parse(window.location.search);

  if (urlParams.surveyCode) {
    saveSurveyAnswer(urlParams);
  }

  return (
    <AuthProvider>
      <OverlayProvider>{element}</OverlayProvider>
    </AuthProvider>
  );
};
