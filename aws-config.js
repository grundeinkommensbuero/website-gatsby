export const config = {
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID: 'eu-central-1_74vNy5Iw0',
  },
  API: {
    INVOKE_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://vmhbaao23c.execute-api.eu-central-1.amazonaws.com/dev'
        : 'https://vmhbaao23c.execute-api.eu-central-1.amazonaws.com/prod',
  },
};
