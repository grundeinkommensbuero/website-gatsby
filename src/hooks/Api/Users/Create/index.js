import CONFIG from '../../../../../aws-config';
import { saveUser } from '../shared';

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
