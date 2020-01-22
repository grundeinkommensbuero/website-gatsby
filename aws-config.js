export default {
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID:
      process.env.NODE_ENV === 'development'
        ? 'eu-central-1_SYtDaO0qH'
        : 'eu-central-1_q5FHCX8iz',
  },
  API: {
    INVOKE_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://2j0bcp5tr9.execute-api.eu-central-1.amazonaws.com/dev'
        : 'https://f4trq1ydo7.execute-api.eu-central-1.amazonaws.com/test',
  },
};
