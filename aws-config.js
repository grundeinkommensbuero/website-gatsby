export default {
  COGNITO: {
    REGION: 'eu-central-1',
    USER_POOL_ID:
      process.env.NODE_ENV === 'development'
        ? 'eu-central-1_SYtDaO0qH'
        : 'eu-central-1_xx4VmPPdF',
  },
};
