import CONFIG from '../../../../../aws-config';
import { saveUser } from '../shared';

//Makes api call to update user in db, throws error if unsuccessful
export const createUser = async (
  userId,
  email,
  newsletterConsent,
  referral
) => {
  const url = `${CONFIG.API.INVOKE_URL}/users`;

  const response = await saveUser({
    userId,
    email,
    newsletterConsent,
    referral,
    method: 'POST',
    url,
  });

  if (response.status !== 201) {
    throw new Error(`Api response was ${response.status}`);
  }
};
