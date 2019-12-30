export default {
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID:
      process.env.NODE_ENV === 'development'
        ? 'eu-central-1_L8GSIeZz3'
        : 'eu-central-1_ficPCl5Rl',
  },
  API: {
    INVOKE_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://o6nxpo1o34.execute-api.eu-central-1.amazonaws.com/dev'
        : ' https://o6nxpo1o34.execute-api.eu-central-1.amazonaws.com/prod',
  },
};
