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
        ? 'https://ftwey058f0.execute-api.eu-central-1.amazonaws.com/dev'
        : 'https://9jvbvaehkd.execute-api.eu-central-1.amazonaws.com/prod',
  },
};
