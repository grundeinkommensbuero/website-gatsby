const useDevBackend =
  process.env.NODE_ENV === 'development' ||
  process.env.GATSBY_USE_DEV_BACKEND === 'override';

let API_INVOKE_URL = useDevBackend
  ? 'https://2j0bcp5tr9.execute-api.eu-central-1.amazonaws.com/dev'
  : 'https://ag5gu1z06h.execute-api.eu-central-1.amazonaws.com/prod';

let USER_POOL_ID = useDevBackend
  ? 'eu-central-1_SYtDaO0qH'
  : 'eu-central-1_xx4VmPPdF';

export default {
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID: USER_POOL_ID,
  },
  API: {
    INVOKE_URL: API_INVOKE_URL,
  },
  APP_API: {
    INVOKE_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:18080'
        : 'https://app-server.xbge.de',
  },
};
