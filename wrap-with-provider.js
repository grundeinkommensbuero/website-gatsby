import React from 'react';
import Amplify from '@aws-amplify/auth';
import { config } from './aws-config';
import { AuthProvider } from './src/context/Authentication';

// This is used to wrap the page, so we can configure AWS Cognito in this wrapper,
// so it only gets configured once, not every time a page changes
export default ({ element }) => {
  // APP_CLIENT_ID was in onCreateWebpackConfig callback in gatsby-node
  const clientId = APP_CLIENT_ID;
  console.log('client id', clientId);
  if (clientId) {
    console.log('configuring amplify...');
    Amplify.configure({
      region: config.COGNITO.REGION,
      userPoolId: config.COGNITO.USER_POOL_ID,
      userPoolWebClientId: clientId,
    });
  } else {
    console.log('no userPoolWebClientId provided');
  }

  return <AuthProvider>{element}</AuthProvider>;
};
