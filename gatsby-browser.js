import React from 'react';
import Amplify from '@aws-amplify/core';
import { config } from './aws-config';
import { AuthProvider } from './src/context/Authentication';

// This is used to wrap the page, so we can configure AWS Cognito in this wrapper,
// so it only gets configured once, not every time a page changes
export const wrapRootElement = ({ element }) => {
  const clientId = process.env.COGNITO_APP_CLIENT_ID;
  console.log('client id', clientId);
  if (clientId) {
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

window.commitHash = COMMITHASH;
window.version = VERSION;
