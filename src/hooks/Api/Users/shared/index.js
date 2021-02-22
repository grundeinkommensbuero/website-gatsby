import { getSocialMediaReferral } from '../../../utils';

// Helper function to saveUser, either updates via patch or creates via post
export const saveUser = async ({ token, url, method, ...data }) => {
  // If someone is signing up for municipality we want to check
  // if they came from a social media post from another user
  if (data.ags) {
    const referredByUser = getSocialMediaReferral();
    if (referredByUser) {
      data.store = { referredByUser };
    }
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
