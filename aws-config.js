console.log(
  'GATSBY_USE_DEV_BACKEND, mode: ',
  process.env.GATSBY_USE_DEV_BACKEND
);

const useDevBackend =
  process.env.NODE_ENV === 'development' ||
  process.env.GATSBY_USE_DEV_BACKEND === 'override';

let API_INVOKE_URL = useDevBackend
  ? 'https://2j0bcp5tr9.execute-api.eu-central-1.amazonaws.com/dev'
  : 'https://ag5gu1z06h.execute-api.eu-central-1.amazonaws.com/prod';

console.log('API_INVOKE_URL: ', API_INVOKE_URL);

let COGNITO_APP_CLIENT_ID = useDevBackend
  ? 'eu-central-1_SYtDaO0qH'
  : 'eu-central-1_xx4VmPPdF';

export default {
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID: COGNITO_APP_CLIENT_ID,
  },
  API: {
    INVOKE_URL: API_INVOKE_URL,
  },
};
