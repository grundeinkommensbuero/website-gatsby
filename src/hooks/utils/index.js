import CONFIG from '../../../aws-config';

/**
 * Util functions (or shared functionality which is needed
 * multiple timmes) to use within the hooks
 */

//Makes api call to update user in db, returns true if successful, false otherwise
export const updateUser = async ({ userId, email }, referral) => {
  //make api call to save newsletter consent and referral
  //we don't send newsletter consent, because we set it as true anyway
  const data = {};
  if (referral) {
    data.referral = referral;
  }

  if (email) {
    data.email = email;
  }

  const request = {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `${CONFIG.API.INVOKE_URL}/users/${userId}`,
    request
  );
  if (response.status !== 204) {
    throw new Error(`Api response was ${response.status}`);
  }
};

export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
