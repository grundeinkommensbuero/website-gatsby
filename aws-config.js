console.log('USE_DEV_BACKEND, mode: ', process.env.USE_DEV_BACKEND);

let API_INVOKE_URL =
  process.env.NODE_ENV === 'development' ||
  process.env.USE_DEV_BACKEND === 'override'
    ? 'https://2j0bcp5tr9.execute-api.eu-central-1.amazonaws.com/dev'
    : 'https://ag5gu1z06h.execute-api.eu-central-1.amazonaws.com/prod';

export default {
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID:
      process.env.NODE_ENV === 'development'
        ? 'eu-central-1_SYtDaO0qH'
        : 'eu-central-1_xx4VmPPdF',
  },
  API: {
    INVOKE_URL: API_INVOKE_URL,
  },
};
