import CONFIG from '../../../../../aws-config';
import { useState } from 'react';
import { saveUser } from '../shared';

export const useUpdateUser = () => {
  [state, setState] = useState();

  return [
    state,
    async ({ userId, newsletterConsent, token }) => {
      try {
        setState('loading');
        await updateUser(userId, newsletterConsent, token);

        setState('success');
      } catch (error) {
        setState('error');
        console.log('Error', error);
      }
    },
  ];
};

//Makes api call to update user in db, throws error if unsuccessful
export const updateUser = async (userId, newsletterConsent, token) => {
  const url = `${CONFIG.API.INVOKE_URL}/users/${userId}`;

  const response = await saveUser(
    userId,
    newsletterConsent,
    null,
    'PATCH',
    url,
    token
  );

  if (response.status !== 204) {
    throw new Error(`Api response was ${response.status}`);
  }
};
