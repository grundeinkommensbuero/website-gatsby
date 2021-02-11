const useDevBackend =
  process.env.NODE_ENV === 'development' ||
  process.env.GATSBY_USE_DEV_BACKEND === 'override';

let API_INVOKE_URL = useDevBackend
  ? 'https://2j0bcp5tr9.execute-api.eu-central-1.amazonaws.com/dev'
  : 'https://ag5gu1z06h.execute-api.eu-central-1.amazonaws.com/prod';

// Log to improve debugging in netlify deploy logs
console.log(
  `Important: API_INVOKE_URL is set to: '${API_INVOKE_URL}' in aws-config.js. ` +
    `useDevBackend is ${useDevBackend}, because NODE_ENV is '${process.env.NODE_ENV}' ` +
    `and GATSBY_USE_DEV_BACKEND is '${process.env.GATSBY_USE_DEV_BACKEND}'`
);

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
};
