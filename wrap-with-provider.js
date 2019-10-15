import React from 'react';
import Amplify from '@aws-amplify/auth';
import { AuthProvider } from './src/context/Authentication';

// This is used to wrap the page, so we can configure AWS Cognito in this wrapper,
// so it only gets configured once, not every time a page changes
export default ({ element }, options) => {
  const clientId = process.env.COGNITO_APP_CLIENT_ID;
  /*const blub = {
    config.COGNITO.REGION,
  config.COGNITO.USER_POOL_ID,
  clientId}*/
  console.log('client id', clientId);
  if (clientId) {
    console.log('configuring amplify...');
    Amplify.configure({
      region: options.region,
      userPoolId: options.userPoolId,
      userPoolWebClientId: options.appClientId,
    });
  } else {
    console.log('no userPoolWebClientId provided');
  }

  return <AuthProvider>{element}</AuthProvider>;
};
