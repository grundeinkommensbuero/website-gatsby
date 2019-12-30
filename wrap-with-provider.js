import React from 'react';
import Amplify from '@aws-amplify/auth';
import CONFIG from './aws-config';
import { AuthProvider } from './src/context/Authentication';

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

  return <AuthProvider>{element}</AuthProvider>;
};
