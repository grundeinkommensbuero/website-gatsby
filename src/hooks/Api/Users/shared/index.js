// Helper function to saveUser, either updates via patch or creates via post
export const saveUser = async (
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
