import React from 'react';
import Amplify from 'aws-amplify';
import { cognitoConfig } from './cognito-config';
import { AuthProvider } from './src/context/Authentication';

// This is used to wrap the page, so we can configure AWS Cognito in this wrapper,
// so it only gets configured once, not every time a page changes
export const wrapRootElement = ({ element }) => {
  Amplify.configure({
    region: cognitoConfig.REGION,
    userPoolId: cognitoConfig.USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID,
  });

  return <AuthProvider>{element}</AuthProvider>;
};
