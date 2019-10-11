import React from 'react';
// import Amplify from 'aws-amplify';
// import { config } from './aws-config';
import { AuthProvider } from './src/context/Authentication';

// This is used to wrap the page, so we can configure AWS Cognito in this wrapper,
// so it only gets configured once, not every time a page changes
export const wrapRootElement = ({ element }) => {
  /*Amplify.configure({
    region: config.COGNITO.REGION,
    userPoolId: config.COGNITO.USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID,
  });
  */
  return <AuthProvider>{element}</AuthProvider>;
};

window.commitHash = COMMITHASH;
window.version = VERSION;
