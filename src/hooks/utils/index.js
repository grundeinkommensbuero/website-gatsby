import CONFIG from '../../../aws-config';

/**
 * Util functions (or shared functionality which is needed
 * multiple timmes) to use within the hooks
 */

//Makes api call to update user in db, throws error if unsuccessful
export const updateUser = async (
  userId,
  newsletterConsent,
  referral,
  token
) => {
  const url = `${CONFIG.API.INVOKE_URL}/users/${userId}`;

  const response = await saveUser(
    userId,
    newsletterConsent,
    referral,
    'PATCH',
    url,
    token
  );

  if (response.status !== 204) {
    throw new Error(`Api response was ${response.status}`);
  }
};

//Makes api call to update user in db, throws error if unsuccessful
export const createUser = async (userId, newsletterConsent, referral) => {
  const url = `${CONFIG.API.INVOKE_URL}/users`;

  const response = await saveUser(
    userId,
    newsletterConsent,
    referral,
    'POST',
    url
  );

  if (response.status !== 201) {
    throw new Error(`Api response was ${response.status}`);
  }
};

// Helper function to saveUser, either updates via patch or creates via post
const saveUser = async (
  userId,
  newsletterConsent,
  referral,
  method,
  url,
  token = null
) => {
  //make api call to save newsletter consent and referral
  const data = { newsletterConsent, userId };

  if (referral) {
    data.referral = referral;
  }

  const request = {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  // If there was an auth token passed add it to the headers
  if (token) {
    request.headers.Authorization = token;
  }

  return fetch(url, request);
};

export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
