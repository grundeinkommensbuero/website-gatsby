import Amplify from 'aws-amplify';
import cognitoConfig from './congito-config';


// This is used to wrap the page, so we can configure AWS Cognito in this wrapper,
// so it only gets configured once, not every time a page changes
export const wrapPageElement = ({ element }) => {
  
  Amplify.configure({
    region: cognitoConfig.REGION,
    userPoolId: cognitoConfig.USER_POOL_ID,
    userPoolWebClientId: cognitoConfig.APP_CLIENT_ID,
  });

  return element;
}